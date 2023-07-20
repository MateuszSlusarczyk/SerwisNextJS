import { useEffect, useState } from 'react';

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
        const res2 = await fetch("/api/FakturyData");
        if (!res2.ok) {
          throw new Error("Failed to fetch invoice data");
        }
        const res3 = await fetch("/api/KlienciData");
        if (!res3.ok) {
          throw new Error("Failed to fetch client data");
        }
        const data = await res.json();
        const dataFaktury = await res2.json();
        const dataKlienci = await res3.json();
        setProjectData(data);
        setFakturyData(dataFaktury);
        setKlienciData(dataKlienci);
      } catch (error:any) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleConvertToPdf = async (faktura:any) => {
    try {
      const res = await fetch("/api/ConvertFakturaToPdf", {
        method: "POST",
        body: JSON.stringify(faktura),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);

      if (!res.ok) {
        setError((await res.json()).message);
        return;
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
    <>
      <section className="flex p-3 w-screen justify-center h-screen">
        <div className="w-3/4 ">
          <p className="text-3xl font-semibold">Twoje Projekty</p>
          <table className="w-full">
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
          <table className="w-full">
            <thead>
              <tr className="flex-row justify-evenly border-2 w-full">
                <th className="text-center w-1/5">Nazwa</th>
                <th className="text-center w-1/5">Wartość brutto</th>
                <th className="text-center w-1/5">Wartość netto</th>
                <th className="text-center w-1/5">Podatek VAT</th>
                <th className="text-center w-1/5">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {fakturyData.map((faktura:any) => (
                <tr key={faktura._id} className="flex-row justify-evenly border-2 w-full">
                  <td className="px-6 py-4 whitespace-nowrap text-center w-1/4">
                    {faktura.nazwa}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center w-1/4">
                    {faktura.wartosc_brutto}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center w-1/4">
                    {faktura.wartosc_netto}
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
      </section>
    </>
  );
}
