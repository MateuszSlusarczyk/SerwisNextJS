import { MongoClient, MongoClientOptions } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
  useUnifiedTopology: true,
} as MongoClientOptions);

export async function POST(req: NextRequest) {
  try {
    const { Nazwa} = (await req.json()) as {
      Nazwa: string;
    };

    await mongoClient.connect();
    const db = mongoClient.db('ProjektNext');
    const collection = db.collection('Firma');
    const checkExisting = await collection.findOne({ Nazwa });

    // Send error response if duplicate user is found
    if (!checkExisting) {
      throw new Error('Podana firma nie istnieje w bazie danych');
    }

    await collection.deleteOne(
        { "Nazwa": Nazwa }
        );

    mongoClient.close();

    return new NextResponse(
      JSON.stringify({
        status: 'success',
        message: 'Data deleted successfully.',
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
