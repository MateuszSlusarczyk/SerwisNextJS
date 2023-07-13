import { MongoClient, MongoClientOptions } from 'mongodb'
import { NextResponse } from "next/server";

const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
    useUnifiedTopology: true,
  } as MongoClientOptions)
  
export async function POST(req: Request) {
  try {
    const { nazwa, nowa_nazwa, id_projektu, wartość_netto } = (await req.json()) as {
      nazwa: string;
      nowa_nazwa: string;
      id_projektu: string;
      wartość_netto: string;
    };

    await mongoClient.connect()
        const db = mongoClient.db('ProjektNext')
        const collection = db.collection('Faktury')
        const ProjektyCollection = db.collection('Projekty')
        const checkExisting = await 
        // Find the user with the provided email
        collection.findOne({ nazwa });
        //Send error response if duplicate user is found
        if (!checkExisting) {
            mongoClient.close();
            throw new Error('Faktura nie istnieje')
        }
        const checkExistingProjekt = await ProjektyCollection.findOne({ id_projektu });
        if(!checkExistingProjekt){
            mongoClient.close();
            throw new Error('Projekt nie istnieje')
        }
        await collection.updateOne(
            { "nazwa": nazwa },
            { $set: { "nazwa": nowa_nazwa, "wartość_netto": wartość_netto, "wartość_brutto": (parseFloat(wartość_netto) * 1.23).toString(), "id_projektu":id_projektu } }
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
