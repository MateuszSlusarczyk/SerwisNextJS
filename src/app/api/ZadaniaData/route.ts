import { MongoClient, MongoClientOptions } from 'mongodb';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
  useUnifiedTopology: true,
} as MongoClientOptions);

export async function GET() {
  try {
    await mongoClient.connect();
    const db = mongoClient.db('ProjektNext');
    const collection = db.collection('Zadania');

    const data = await collection.find().toArray();

    mongoClient.close();

    const convertedData = await Promise.all(data.map(async (item) => {

      // Save the file in the file system with a unique filename


      return {
        ...item,
      };
    }));

    return NextResponse.json(convertedData);
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
