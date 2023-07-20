import { MongoClient, MongoClientOptions, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
  useUnifiedTopology: true,
} as MongoClientOptions);

export async function POST(req: any) {
  try {
    await mongoClient.connect();
    const db = mongoClient.db('ProjektNext');
    const collection = db.collection('Zadania');

    const data = await req.json();
    const { zadanieId, newStanZadania } = data;
    console.log(data);

    if (!zadanieId || !newStanZadania) {
      mongoClient.close();
      return new NextResponse(
        JSON.stringify({ error: 'Bad Request: Missing required data.' }),
        { status: 400 }
      );
    }

    // Convert zadanieId to ObjectId
    const objectIdZadanieId = new ObjectId(zadanieId);

    // Update the Zadanie document in the database with the new Stan_Zadania value
    const result = await collection.updateOne(
      { _id: objectIdZadanieId },
      {
        $set: {
          Stan_Zadania: newStanZadania,
        },
      }
    );
    console.log(result);
    mongoClient.close();

    return new NextResponse(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        error: 'Server Error',
      }),
      { status: 500 }
    );
  }
}
