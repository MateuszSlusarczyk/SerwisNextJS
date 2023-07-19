"use client"
import { useEffect, useState } from 'react';
import ZadaniaPage from '../Zadania/get';
import Link from 'next/link';
export default function DashboardAdministrator() {
  
  const [employeeData, setEmployeeData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/ZadaniaData");
        if (!res.ok) {
          throw new Error("Failed to fetch employee data");
        }
        const data = await res.json();
        setEmployeeData(data);
      } catch (error:any) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <section className="flex flex-col p-10 w-screen justify-center h-screen">
     <div className="w-full flex p-2 justify-evenly h-full">
      <div className="flex w-1/4 h-1/5 bg-quinary rounded-md border-2">
        <Link href="../Faktury" className="text-3xl w-full h-full flex justify-center items-center flex-1 hover:bg-quaternary duration-500"><p>Faktury</p></Link>
      </div>
      <div className="flex w-1/4 h-1/5 bg-quinary rounded-md border-2">
      <Link href="../Firma" className="text-3xl w-full h-full flex justify-center items-center flex-1 hover:bg-quaternary duration-500"><p>Firmy</p></Link>
      </div>
      <div className="flex w-1/4 h-1/5 bg-quinary rounded-md border-2">
      <Link href="../Klienci" className="text-3xl w-full h-full flex justify-center items-center flex-1 hover:bg-quaternary duration-500"><p>Klienci</p></Link>
      </div>
    </div>
    <div className="w-full flex p-2 justify-evenly h-full">
      <div className="flex w-1/4 h-1/5 bg-quinary rounded-md border-2">
      <Link href="../Pracownicy" className="text-3xl w-full h-full flex justify-center items-center flex-1 hover:bg-quaternary duration-500"><p>Pracownicy</p></Link>
      </div>
      <div className="flex w-1/4 h-1/5 bg-quinary rounded-md border-2">
      <Link href="../Projekty" className="text-3xl w-full h-full flex justify-center items-center flex-1 hover:bg-quaternary duration-500"><p>Projekty</p></Link>
      </div>
      <div className="flex w-1/4 h-1/5 bg-quinary rounded-md border-2">
      <Link href="../Zadania" className="text-3xl w-full h-full flex justify-center items-center flex-1 hover:bg-quaternary duration-500"><p>Zadania</p></Link>
      </div>
     </div>
    </section>
    </>
  );
}