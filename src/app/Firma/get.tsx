import { useEffect, useState } from "react";

export const GetFirma = () => {
  const [firmaData, setFirmaData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/FirmaData");
        if (!res.ok) {
          throw new Error("Failed to fetch Klienci data");
        }
        const data = await res.json();
        setFirmaData(data);
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
       <table className='w-full'>
        <thead>
        <tr className=" flex-row justify-evenly border-2 w-full"> 
          <th className="text-center w-1/4">Nazwa</th>
          <th className="text-center w-1/4">Nip</th>
          <th className="text-center w-1/4">Regon</th>
          <th className="text-center w-1/4">Członkowie zarządu</th>
        </tr>
        </thead>
        <tbody>
          {firmaData.map((firma:any) => (
            <tr key={firma._id} className="flex-row justify-evenly border-2 w-full">
               <td className="px-6 py-4 whitespace-nowrap text-center w-1/4">
                {firma.Nazwa}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center w-1/4">
                {firma.Nip}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center w-1/4">
                {firma.Regon}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center w-1/4">
                {firma.Czlonkowie_zarz}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};