import { MongoClient, MongoClientOptions } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
  useUnifiedTopology: true,
} as MongoClientOptions);

export async function POST(req: NextRequest) {
  try {
    const { imię, nazwisko, email, nowy_email, nr_telefonu} = (await req.json()) as {
        imię: string;
        nazwisko: string;
        email: string;
        nowy_email: string;
        nr_telefonu: string;
      };

    await mongoClient.connect();
    const db = mongoClient.db('ProjektNext');
    const collection = db.collection('Klienci');
    const checkExisting = await collection.findOne({ email });
    // Send error response if duplicate user is found
    if (!checkExisting) {
      throw new Error('Podany pracownik nie istnieje w bazie danych');
    }

    await collection.updateOne(
        { "email": email },
        {$set: {
            "imię": imię,
            "nazwisko": nazwisko,
            "email": nowy_email,
            "nr_telefonu": nr_telefonu,
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
