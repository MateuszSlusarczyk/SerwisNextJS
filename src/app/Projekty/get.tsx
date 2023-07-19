import { useEffect, useState } from "react";

export const GetProjekty = () => {
  const [projectData, setProjectData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/ProjektyData");
        if (!res.ok) {
          throw new Error("Failed to fetch employee data");
        }
        const data = await res.json();
        setProjectData(data);
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
    </div>
  );
};