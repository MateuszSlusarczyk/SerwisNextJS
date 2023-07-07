import { MongoClient, MongoClientOptions } from 'mongodb'
import { createHash} from 'crypto'
import { NextResponse } from "next/server";

const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
    useUnifiedTopology: true,
  } as MongoClientOptions)
  
export async function POST(req: Request) {
  try {
    const { name, email, password } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
    };
    const hashed_password = await hashStringToSHA256(password);

    await mongoClient.connect()
        const db = mongoClient.db('ProjektNext')
        const collection = db.collection('Użytkownicy')
        const checkExisting = await 
        // Find the user with the provided email
        collection.findOne({ email });
        //Send error response if duplicate user is found
        if (checkExisting) {
            throw new Error('User with this email already exists')
            mongoClient.close();
            return;
        }
        //Hash password
        const status = await collection.insertOne({
            name,
            email,
            Password: await hashStringToSHA256(password),
        });
    return NextResponse.json({
      user: {
        name: name,
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

function hashStringToSHA256(input: string): string {
    const hash = createHash('sha256')
    hash.update(input)
    return hash.digest('hex')
  }