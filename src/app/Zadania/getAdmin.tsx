import { useEffect, useState } from "react";

export const GetZadania= () => {
  const [zadaniaData, setZadaniaData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/ZadaniaData");
        if (!res.ok) {
          throw new Error("Failed to fetch employee data");
        }
        const data = await res.json();
        setZadaniaData(data);
      } catch (error:any) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-senary rounded-md border-2">
      <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr className="flex-row justify-evenly border-2 w-full"> 
          <th className="text-center w-1/5">Nazwa Zadania</th>
          <th className="text-center w-1/5">Identyfikator Projektu</th>
          <th className="text-center w-1/5">Odpowiedzialna osoba</th>
          <th className="text-center w-1/5">Opis zadania</th>
          <th className="text-center w-1/5">Stan Zadania</th>
        </tr>
        </thead>
        <tbody>
          {zadaniaData.map((zadanie:any) => (
            <tr key={zadanie._id} className="flex-row justify-evenly border-2 w-full">
               <td className="px-6 py-4 whitespace-nowrap text-center w-1/4">
                {zadanie.Nazwa_zadania}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center w-1/4">
                {zadanie.id_projektu}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center w-1/4">
                {zadanie.OdpowiedzialnaOsoba}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center w-1/4">
                {zadanie.Opis_zadania}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center w-1/4">
                {zadanie.Stan_Zadania}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};