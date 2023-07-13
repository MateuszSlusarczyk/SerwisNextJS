import { MongoClient, MongoClientOptions } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
  useUnifiedTopology: true,
} as MongoClientOptions);

export async function POST(req: NextRequest) {
  try {
    const {Nazwa_zadania, Nowa_nazwa_zadania, id_projektu, OdpowiedzialnaOsoba, Grafika, Opis_zadania } = (await req.json()) as {
      Nazwa_zadania: string,
      Nowa_nazwa_zadania: string,
      id_projektu: string,
      OdpowiedzialnaOsoba: string,
      Grafika:string,
      Opis_zadania: string,
    };

    const GrafikaBuffer = Buffer.from(Grafika, 'base64'); // Convert base64 string to buffer

    await mongoClient.connect();
    const db = mongoClient.db('ProjektNext');
    const collection = db.collection('Zadania');
    const ProjektyCollection = db.collection('Projekty');
    const checkExistingProjekt = await ProjektyCollection.findOne({ id_projektu });
    const checkExisting = await collection.findOne({ Nazwa_zadania });

    // Send error response if duplicate user is found
    if (!checkExisting) {
      throw new Error('Zadanie nie istnieje');
    }
    if(!checkExistingProjekt){
      mongoClient.close();
      throw new Error('Wybrany projekt nie istnieje')
      }

    await collection.updateOne(
        { "Nazwa_zadania": Nazwa_zadania },
        {$set: {
            "Nazwa_zadania": Nowa_nazwa_zadania,
            "id_projektu": id_projektu,
            "OdpowiedzialnaOsoba": OdpowiedzialnaOsoba,
            "Opis_zadania": Opis_zadania,
            "Grafika": GrafikaBuffer,
            }
        }
        );

        mongoClient.close();

        return new NextResponse(
          JSON.stringify({
            status: 'success',
            message: 'Data uploaded successfully.',
          }),
          { status: 200 }
        );
      } catch (error: any) {
        mongoClient.close();
        return new NextResponse(
          JSON.stringify({
            status: 'error',
            message: error.message,
          }),
          { status: 500 }
        );
      }
    }
    