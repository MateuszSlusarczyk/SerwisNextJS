import { MongoClient, MongoClientOptions } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
  useUnifiedTopology: true,
} as MongoClientOptions);

export async function POST(req: NextRequest) {
  try {
    const { id_klienta, nazwa_projektu, nowa_nazwa_projektu, data_rozpoczecia, planowana_data_zakoczenia } = (await req.json()) as {
      id_klienta: string;
      nazwa_projektu: string;
      nowa_nazwa_projektu: string;
      data_rozpoczecia: string;
      planowana_data_zakoczenia: string;
    };

    await mongoClient.connect()
    const db = mongoClient.db('ProjektNext')
    const collection = db.collection('Projekty')
    const klientCollection = db.collection('Klienci')
    const checkExisting = await 
    // Find the user with the provided email
    collection.findOne({ nazwa_projektu });
    //Send error response if duplicate user is found
    if (!checkExisting) {
        mongoClient.close();
        throw new Error('Podany projekt nie istnieje')
    }
    //covert id_klienta to integer

    await collection.updateOne(
      { "nazwa_projektu": nazwa_projektu },
      {$set: {
          "id_klienta": id_klienta,
          "nazwa_projektu": nowa_nazwa_projektu,
          "data_rozpoczecia": data_rozpoczecia,
          "planowana_data_zakoczenia": planowana_data_zakoczenia,
          }
      }
      );
    mongoClient.close();
return NextResponse.json({
  status: "ok",
  message: "Projekt został edytowany",
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
