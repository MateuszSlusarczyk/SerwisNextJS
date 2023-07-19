import { MongoClient, MongoClientOptions } from 'mongodb'
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
    useUnifiedTopology: true,
  } as MongoClientOptions)
  
export async function POST(req: Request) {
  try {
    const { imię, nazwisko, email, nr_telefonu, nip_firmy, haslo } = (await req.json()) as {
      imię: string;
      nazwisko: string;
      email: string;
      nr_telefonu: string;
      nip_firmy:string
      haslo:string
    };

    await mongoClient.connect()
        const db = mongoClient.db('ProjektNext')
        const collection = db.collection('Klienci')
        const collectionFirmy  = db.collection('Firma')
        const count = await collection.countDocuments();
        const checkExisting = await collection.findOne({ email });
        // Find the user with the provided email
        const Firma = await collectionFirmy.findOne({});
        console.log(Firma?.Czlonkowie_zarz);
        console.log(imię+ ' ' + nazwisko)
        const hashed_password = await bcrypt.hash(haslo,10);
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
            nip_firmy: Firma?.Nip,
            haslo: hashed_password,
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
