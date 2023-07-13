import { MongoClient, MongoClientOptions } from 'mongodb'
import { NextResponse } from "next/server";

const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
    useUnifiedTopology: true,
  } as MongoClientOptions)
  
export async function POST(req: Request) {
  try {
    const { nazwa} = (await req.json()) as {
      nazwa: string;
    };

    await mongoClient.connect()
        const db = mongoClient.db('ProjektNext')
        const collection = db.collection('Faktury')
        const checkExisting = await 
        // Find the user with the provided email
        collection.findOne({ nazwa });
        //Send error response if duplicate user is found
        if (!checkExisting) {
            mongoClient.close();
            throw new Error('Faktura nie istnieje')
        }
        await collection.deleteOne(
            { "nazwa": nazwa }
            );
    
        mongoClient.close();
    return NextResponse.json({
      status: "success",
      message: "Data uploaded successfully.",
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
