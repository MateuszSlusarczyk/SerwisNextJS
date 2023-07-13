import { MongoClient, MongoClientOptions } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
  useUnifiedTopology: true,
} as MongoClientOptions);

export async function POST(req: NextRequest) {
  try {
    const { Nazwa, NowaNazwa, Nip, Regon, Logo, Czlonkowie_zarz } = (await req.json()) as {
      Nazwa: string;
      NowaNazwa: string;
      Nip: string;
      Regon: string;
      Logo: string; // Changed the type to string to store base64-encoded image
      Czlonkowie_zarz: string;
    };

    const logoBuffer = Buffer.from(Logo, 'base64'); // Convert base64 string to buffer

    await mongoClient.connect();
    const db = mongoClient.db('ProjektNext');
    const collection = db.collection('Firma');
    const checkExisting = await collection.findOne({ Nazwa });

    if (Nip.length !== 10) {
      throw new Error('Nip musi mieć 10 cyfr');
    }
    if (Regon.length !== 9) {
      throw new Error('Regon musi mieć 9 cyfr');
    }

    // Send error response if duplicate user is found
    if (!checkExisting) {
      throw new Error('Podana firma nie istnieje w bazie danych');
    }

    await collection.updateOne(
        { "Nazwa": Nazwa },
        {$set: {
            "Nazwa": NowaNazwa,
            "Nip": Nip,
            "Regon": Regon,
            "Logo": logoBuffer,
            "Czlonkowie_zarz": Czlonkowie_zarz
            }
        }
        );

    mongoClient.close();

    return new NextResponse(
      JSON.stringify({
        status: 'success',
        message: 'Data changed successfully.',
      }),
      { status: 200 }
    );
  } catch (error: any) {
    mongoClient.close();
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
