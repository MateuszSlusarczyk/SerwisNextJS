import { NextAuthOptions, Session } from 'next-auth'
import { MongoClient, MongoClientOptions } from 'mongodb'
import bcrypt from 'bcrypt'
import CredentialsProvider from "next-auth/providers/credentials";

const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
  useUnifiedTopology: true,
} as MongoClientOptions)

export const options: NextAuthOptions = {
  providers: [
    {
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "john@example.com" },
        password: { label: "hasło", type: "password" },
      },
      async authorize(credentials = {}) {
        // Connect to the MongoDB database
        await mongoClient.connect()
        const db = mongoClient.db('ProjektNext')
        const collection = db.collection('Użytkownicy')

        // Find the user with the provided email
        const user = await collection.findOne({ email: credentials.email })
        if (!user) {
          mongoClient.close()
          throw new Error('No user found with this email')
        }

        // Hash the provided password
        const hashedPassword = credentials.password;
        const Password = (user.haslo)
        // Compare the hashed password with the hashed password from the database
        const isPasswordValid = await bcrypt.compare(hashedPassword, Password)
        if (!isPasswordValid) {
          mongoClient.close()
          throw new Error('Password does not match')
        }

        // Return the user object (customize as needed)
        return { id: user._id.toString(), email: user.email }
      },
    },
  ],
  callbacks: {
    async jwt(params) {
      // Store user id in JWT token
      if (params.user) {
        params.token.id = params.user.id
      }
      return params.token
    },
    async session(params) {
      // Add user id to session object if user exists
      if (params.user) {
        (params.session as Session).user = {
          name: params.user.name || null,
          email: params.user.email,
          // Add any additional user properties you need
        }
      }
      return params.session
    },
  },
}