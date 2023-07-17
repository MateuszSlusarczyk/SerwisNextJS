import Link from "next/link"
import Image from 'next/image'
import Gwiazdka from 'Star.webp'


export default function Navbar() {
    return (
        <nav className="text-center justify-center">
            <ul className="flex justify-evenly ">
                <li className="flex text-center justify-center"><Image
                    src={Gwiazdka}
                    width={50}
                    height={50}
                    alt="Gwiazdka"
                    /><p className="font-extrabold text-lg mt-3"> <Link href="/">Tasker</Link></p></li>
                <li className="mt-4 font-semibold hover:text-secondary"><Link href="/api/auth/signin">Zaloguj sie</Link></li>
                <li className="mt-4 font-semibold hover:text-secondary"><Link href="/Pracownicy">Pracownicy</Link></li>
                <li className="mt-4 font-semibold hover:text-secondary"><Link href="/Klienci">Klienci</Link></li>
                <li className="mt-4 font-semibold hover:text-secondary"><Link href="/Projekty">Projekty</Link></li>
                <li className="mt-4 font-semibold hover:text-secondary"><Link href="/Zadania">Zadania</Link></li>
                <li className="mt-4 font-semibold hover:text-secondary"><Link href="/Faktury">Faktury</Link></li>
                <li className="mt-4 font-semibold hover:text-secondary"><Link href="/Firma">Firma</Link></li>
                <li className="mt-4 font-semibold hover:text-secondary"><Link href="/api/auth/signout">Wyloguj sie</Link></li>
            </ul>
            <hr className="mt-4"></hr>
        </nav>
    )
}
