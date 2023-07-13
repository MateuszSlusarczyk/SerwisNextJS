import { MongoClient, MongoClientOptions } from 'mongodb'
import { NextResponse } from "next/server";

const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
    useUnifiedTopology: true,
  } as MongoClientOptions)
  
export async function POST(req: Request) {
  try {
    const { id_klienta, nazwa_projektu, data_rozpoczecia, planowana_data_zakoczenia } = (await req.json()) as {
      id_klienta: string;
      nazwa_projektu: string;
      data_rozpoczecia: string;
      planowana_data_zakoczenia: string;
    };

    await mongoClient.connect()
        const db = mongoClient.db('ProjektNext')
        const collection = db.collection('Projekty')
        const klientCollection = db.collection('Klienci')
        const count = await collection.countDocuments();
        const id_projektu = count + 1;
        const checkExisting = await 
        // Find the user with the provided email
        collection.findOne({ nazwa_projektu });
        //Send error response if duplicate user is found
        if (checkExisting) {
            mongoClient.close();
            throw new Error('Podany projekt już istnieje')
        }
        //covert id_klienta to integer
        const id_klienta_int = parseInt(id_klienta);
        const checkExistingKlient = await klientCollection.findOne({id_klienta_int})
        if(!checkExistingKlient){
            mongoClient.close();
            throw new Error('Wybrany klient nie istnieje')
        }
        const status = await collection.insertOne({
            id_projektu,
            id_klienta,
            nazwa_projektu,
            data_rozpoczecia,
            planowana_data_zakoczenia,
        });
        mongoClient.close();
    return NextResponse.json({
      status: "ok",
      message: "Projekt został dodany",
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
