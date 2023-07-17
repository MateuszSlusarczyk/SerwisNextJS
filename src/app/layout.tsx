import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import AuthProvider from '../context/AuthProvider'
import { Hanken_Grotesk } from "next/font/google"
const inter = Inter({ subsets: ['latin'] })

const Hanken = Hanken_Grotesk({ subsets: ['latin'] })
export const metadata = {
  title: 'NextAuth Tutorial',
  description: 'Learn NextAuth.js by Dave Gray',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={Hanken.className}>
      <body className="{inter.className} bg-primary">
        <AuthProvider>
          <Navbar />
          <main className="flex flex-row items-start p-2 min-h-screen bg-slate-500 m-0 ">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}