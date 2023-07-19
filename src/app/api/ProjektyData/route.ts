import { MongoClient, MongoClientOptions } from 'mongodb';
import { NextResponse } from 'next/server';

const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
  useUnifiedTopology: true,
} as MongoClientOptions);

export async function GET() {
  try {
    await mongoClient.connect();
    const db = mongoClient.db('ProjektNext');
    const collection = db.collection('Projekty');

    const data = await collection.find().toArray();
    mongoClient.close();

    return NextResponse.json(data);
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
