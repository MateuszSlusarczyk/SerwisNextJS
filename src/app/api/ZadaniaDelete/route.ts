import { MongoClient, MongoClientOptions } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
  useUnifiedTopology: true,
} as MongoClientOptions);

export async function POST(req: NextRequest) {
  try {
    const {Nazwa_zadania} = (await req.json()) as {
      Nazwa_zadania: string
    };


    await mongoClient.connect();
    const db = mongoClient.db('ProjektNext');
    const collection = db.collection('Zadania');

    const checkExisting = await collection.findOne({ Nazwa_zadania });
    // Send error response if duplicate user is found
    if (!checkExisting) {
      throw new Error('Zadanie nie istnieje');
    }

    await collection.deleteOne(
      { "Nazwa_zadania": Nazwa_zadania }
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
    