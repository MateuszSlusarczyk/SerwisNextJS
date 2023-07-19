"use client"
import { useEffect, useState } from 'react';
import ZadaniaPage from '../Zadania/get';

export default function DashboardPracownicy() {
  
  const [projectData, setProjectData] = useState([]);
  const [fakturyData, setFakturyData] = useState([]);
  const [klienciData, setKlienciData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/ProjektyData");
        if (!res.ok) {
          throw new Error("Failed to fetch project data");
        }
        const res2 = await fetch("api/FakturyData");
        if (!res2.ok) {
          throw new Error("Failed to fetch invoice data");
        }
        const res3 = await fetch("api/KlienciData");
        if (!res3.ok) {
          throw new Error("Failed to fetch client data");
        }
        const data = await res.json();

        const dataFaktury = await res2.json();
        const dataKlienci = await res3.json();
        setProjectData(data);
        setFakturyData(dataFaktury);
        setKlienciData(dataKlienci)
      } catch (error:any) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);
  const filteredProjekty = projectData.filter((projekt: any) =>
  klienciData.some(
    (klient: any) =>
    projekt?.id_klienta === klient.id_klienta
  )
);
const filteredFaktury = fakturyData.filter((projekt: any) =>
  klienciData.some(
    (klient: any) =>
    projekt?.id_projektu === klient.id_projektu
  )
);
  return (
    <>
    <section className="flex p-3 w-screen justify-center h-screen">
     <div className="w-3/4 ">
     
      <p className="text-3xl font-semibold">Twoje Projekty</p>
      <table className='w-full'>
        <thead>
        <tr className="flex-row justify-evenly border-2 w-full"> 
          <th className="text-center w-1/4">Identyfikator projektu</th>
          <th className="text-center w-1/4">Nazwa projektu</th>
          <th className="text-center w-1/4">Data rozpoczęcia</th>
          <th className="text-center w-1/4">Planowana data zakończenia</th>
        </tr>
        </thead>
        <tbody>
          {projectData.map((project:any) => (
            <tr key={project._id} className="flex-row justify-evenly border-2 w-full">
               <td className="px-6 py-4 whitespace-nowrap text-center w-1/4">
                {project.id_projektu}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center w-1/4">
                {project.nazwa_projektu}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center w-1/4">
                {project.data_rozpoczecia}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center w-1/4">
                {project.planowana_data_zakoczenia}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-3xl font-semibold">Twoje Faktury</p>
      <table className='w-full'>
        <thead>
        <tr className=" flex-row justify-evenly border-2 w-full"> 
          <th className="text-center w-1/4">Nazwa</th>
          <th className="text-center w-1/4">Wartość brutto</th>
          <th className="text-center w-1/4">Wartość netto</th>
          <th className="text-center w-1/4">Podatek VAT</th>
        </tr>
        </thead>
        <tbody>
          {fakturyData.map((faktura:any) => (
            <tr key={faktura._id} className="flex-row justify-evenly border-2 w-full">
               <td className="px-6 py-4 whitespace-nowrap text-center w-1/4">
                {faktura.nazwa}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center w-1/4">
                {faktura.wartość_brutto}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center w-1/4">
                {faktura.wartość_netto}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center w-1/4">
                {faktura.vat}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
    </section>
    </>
  );
}