import { useEffect, useState } from "react";

export const FakturyGet = () => {
  const [fakturyData, setFakturyData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/FakturyData");
        if (!res.ok) {
          throw new Error("Failed to fetch Faktury data");
        }
        const data = await res.json();
        setFakturyData(data);
      } catch (error:any) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleConvertToPdf = async (faktura:any) => {
    try {
      const res = await fetch("/api/ConvertToFakturaPdf", {
        method: "POST",
        body: JSON.stringify(faktura),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to convert Faktura to PDF");
      }

      const blob = await res.blob();
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "faktura.pdf";
      downloadLink.click();
    } catch (error:any) {
      setError(error.message);
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-senary rounded-md border-2">
      <table className="w-full">
        <thead>
          <tr className="flex-row justify-evenly border-2 w-full">
            <th className="text-center w-1/4">Nazwa</th>
            <th className="text-center w-1/4">Wartość brutto</th>
            <th className="text-center w-1/4">Wartość netto</th>
            <th className="text-center w-1/4">Podatek VAT</th>
            <th className="text-center w-1/4">Akcje</th> {/* Add a new column for the actions */}
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
              <td className="px-6 py-4 whitespace-nowrap text-center w-1/4">
                <button
                  onClick={() => handleConvertToPdf(faktura)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Convert to PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
