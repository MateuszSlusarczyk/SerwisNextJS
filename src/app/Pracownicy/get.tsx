import { useEffect, useState } from "react";

export const GetPracownicy = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/PracownicyData");
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

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-senary rounded-md border-2">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Imię
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nazwisko
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Numer Telefonu
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data końca umowy
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employeeData.map((employee:any) => (
            <tr key={employee._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {employee.imię}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {employee.nazwisko}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {employee.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {employee.nr_telefonu}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {employee.data_końca_umowy}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
