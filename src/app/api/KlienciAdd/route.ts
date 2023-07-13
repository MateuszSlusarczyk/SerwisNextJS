import { MongoClient, MongoClientOptions } from 'mongodb'
import { NextResponse } from "next/server";

const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
    useUnifiedTopology: true,
  } as MongoClientOptions)
  
export async function POST(req: Request) {
  try {
    const { imię, nazwisko, email, nr_telefonu } = (await req.json()) as {
      imię: string;
      nazwisko: string;
      email: string;
      nr_telefonu: string;
    };

    await mongoClient.connect()
        const db = mongoClient.db('ProjektNext')
        const collection = db.collection('Klienci')
        const count = await collection.countDocuments();
        const checkExisting = await 
        // Find the user with the provided email
        collection.findOne({ email });
        //Send error response if duplicate user is found
        if (checkExisting) {
            mongoClient.close();
            throw new Error('User with this email already exists')
        }
        //Hash password
        const status = await collection.insertOne({
            id_klienta: count + 1,
            imię, 
            nazwisko,
            email,
            nr_telefonu,
        });
        mongoClient.close();
    return NextResponse.json({
      user: {
        Imie: imię,
        Nazwisko: nazwisko,
        email: email,
      },
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
