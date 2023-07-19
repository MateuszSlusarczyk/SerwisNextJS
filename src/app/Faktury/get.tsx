import { useEffect, useState } from "react";

export const FakturyGet = () => {
  const [fakturyData, setFakturyData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/FakturyData");
        if (!res.ok) {
          throw new Error("Failed to fetch Klienci data");
        }
        const data = await res.json();
        setFakturyData(data);
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
  );
};