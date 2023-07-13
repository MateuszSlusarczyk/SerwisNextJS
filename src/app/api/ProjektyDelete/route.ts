import { MongoClient, MongoClientOptions } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
  useUnifiedTopology: true,
} as MongoClientOptions);

export async function POST(req: NextRequest) {
  try {
    const {nazwa_projektu } = (await req.json()) as {
      nazwa_projektu: string;
    };

    await mongoClient.connect()
    const db = mongoClient.db('ProjektNext')
    const collection = db.collection('Projekty')
    const checkExisting = await 
    // Find the user with the provided email
    collection.findOne({ nazwa_projektu });
    //Send error response if duplicate user is found
    if (!checkExisting) {
        mongoClient.close();
        throw new Error('Podany projekt nie istnieje')
    }

    await collection.deleteOne(
      { "nazwa_projektu": nazwa_projektu }
      );
    mongoClient.close();
return NextResponse.json({
  status: "ok",
  message: "Projekt został usunięty",
});
} catch (error: any) {
return new NextResponse(
  JSON.stringify({
    status: "error",
    message: error.message,
  }),
  { status: 500 }
);
}
}
