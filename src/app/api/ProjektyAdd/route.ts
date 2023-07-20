import { Admin, MongoClient, MongoClientOptions } from 'mongodb';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
  useUnifiedTopology: true,
} as MongoClientOptions);

// Configure your email service provider
const emailTransporter = nodemailer.createTransport({
  service: 'Yahoo',
  auth: {
    user: process.env.EMAIL_LOG,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const {
      id_klienta,
      nazwa_projektu,
      data_rozpoczecia,
      planowana_data_zakoczenia,
    } = (await req.json()) as {
      id_klienta: string;
      nazwa_projektu: string;
      data_rozpoczecia: string;
      planowana_data_zakoczenia: string;
    };

    await mongoClient.connect();
    const db = mongoClient.db('ProjektNext');
    const collection = db.collection('Projekty');
    const klientCollection = db.collection('Klienci');
    const AdminCollection = db.collection('Użytkownicy');
    const count = await collection.countDocuments();
    const id_projektu = count + 1;
    const checkExisting = await collection.findOne({ nazwa_projektu });
    const Admin = await AdminCollection.findOne({rola: 'Administrator'});
    console.log(Admin);
    // Send error response if duplicate project is found
    if (checkExisting) {
      mongoClient.close();
      throw new Error('Podany projekt już istnieje');
    }

    // Convert id_klienta to integer
    const id_klienta_int = parseInt(id_klienta);
    const checkExistingKlient = await klientCollection.findOne({ id_klienta: id_klienta_int });

    // Send error response if the selected client doesn't exist
    if (!checkExistingKlient) {
      mongoClient.close();
      throw new Error('Wybrany klient nie istnieje');
    }

    await collection.insertOne({
      id_projektu,
      id_klienta,
      nazwa_projektu,
      data_rozpoczecia,
      planowana_data_zakoczenia,
    });

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_LOG,
      to: Admin?.email,
      subject: 'Dodano nowy projekt',
      text: 'Dodano projekt o nazwie: ' + nazwa_projektu,
    };

    await emailTransporter.sendMail(mailOptions);

    mongoClient.close();

    return NextResponse.json({
      status: 'ok',
      message: 'Projekt został dodany',
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
