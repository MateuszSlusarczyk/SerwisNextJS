import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="bg-blue-800 p-4">
            <ul className="flex justify-evenly text-2xl font-bold">
                <li><Link href="/api/auth/signin">Zaloguj sie</Link></li>
                <li><Link href="/api/auth/signout">Wyloguj sie</Link></li>
                <li><Link href="/Pracownicy">Pracownicy</Link></li>
                <li><Link href="/Klienci">Klienci</Link></li>
                <li><Link href="/Projekty">Projekty</Link></li>
                <li><Link href="/Zadania">Zadania</Link></li>
                <li><Link href="/Faktury">Faktury</Link></li>
                <li><Link href="/Firma">Firma</Link></li>
            </ul>
        </nav>
    )
}
