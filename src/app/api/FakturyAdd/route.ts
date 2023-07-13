import { MongoClient, MongoClientOptions } from 'mongodb'
import { NextResponse } from "next/server";

const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
    useUnifiedTopology: true,
  } as MongoClientOptions)
  
export async function POST(req: Request) {
  try {
    const { nazwa, id_projektu, wartość_netto } = (await req.json()) as {
      nazwa: string;
      id_projektu: string;
      wartość_netto: string;
    };

    await mongoClient.connect()
        const db = mongoClient.db('ProjektNext')
        const collection = db.collection('Faktury')
        const ProjektyCollection = db.collection('Projekty')
        const count = await collection.countDocuments();
        const checkExisting = await 
        // Find the user with the provided email
        collection.findOne({ nazwa });
        //Send error response if duplicate user is found
        if (checkExisting) {
            mongoClient.close();
            throw new Error('Faktura już istnieje')
        }
        const checkExistingProjekt = await ProjektyCollection.findOne({ id_projektu });
        if(!checkExistingProjekt){
            mongoClient.close();
            throw new Error('Projekt nie istnieje')
        }
        //Hash password
        const status = await collection.insertOne({
            id_projektu:id_projektu,
            nazwa,
            wartość_netto,
            wartość_brutto: (parseFloat(wartość_netto) * 1.23).toString(),
            vat: '23%',
        });
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
