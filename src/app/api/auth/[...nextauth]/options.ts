import { NextAuthOptions, Session } from 'next-auth'
import { MongoClient, MongoClientOptions } from 'mongodb'
import bcrypt from 'bcrypt'

const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
  useUnifiedTopology: true,
} as MongoClientOptions)

export const options: NextAuthOptions = {
  providers: [
    {
      id: 'credentials',
      name: 'Email',
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
        return { id: user._id.toString(), email: user.email, name: user.imię, role: user.rola }
      },
    },
    {
      id: 'credentialsNip',
      name: 'Nip',
      type: 'credentials',
      credentials: {
        Nip: { label: "Nip", type: "number", placeholder: "Numer Nip" },
        password: { label: "hasło", type: "password" },
      },
      async authorize(credentialsNip = {}) {
        // Connect to the MongoDB database
        await mongoClient.connect()
        const db = mongoClient.db('ProjektNext')
        const collection = db.collection('Klienci')

        const user = await collection.findOne({ nip_firmy: credentialsNip.Nip })
        if (!user) {
          mongoClient.close()
          throw new Error('No user found with this Nip')
        }

        // Hash the provided password
        const hashedPassword = credentialsNip.password;
        const Password = (user.haslo)
        console.log(Password, hashedPassword);
        // Compare the hashed password with the hashed password from the database
        const isPasswordValid = await bcrypt.compare(hashedPassword, Password)
        if (!isPasswordValid) {
          mongoClient.close()
          throw new Error('Password does not match')
        }

        // Return the user object (customize as needed)
        return { id: user._id.toString(), name: user.imię, nip: user.nip,  role: user.rola }
    }
  }
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Store user id in JWT token
      if(user){
        token.name= user.name
        token.id = user.id
        token.nip = user.nip
        token.role = user.role
      }
      return token;
    },
    async session({ session, token }) {
      if(session.user){
      session.user.name = token.name
      session.user.id = token.id
      session.user.nip = token.nip
      session.user.role = token.role
      console.log(session.user);
      }
      return session
    }
  },
}
