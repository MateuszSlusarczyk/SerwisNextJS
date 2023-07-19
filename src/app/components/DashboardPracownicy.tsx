"use client"
import { useEffect, useState } from 'react';
import ZadaniaPage from '../Zadania/get';

export default function DashboardPracownicy() {
  
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
    <section className="flex p-3 w-screen justify-center h-screen">
     <div className="w-3/4 ">
     
      <p className="text-3xl font-semibold">Panel Zadań</p>
      <p className="text-octonary">Zarządzaj swoimi zadaniami</p>
      <table className='w-full'>
        <thead>
        <tr className="flex flex-row justify-evenly border-2 "> 
          <th className="text-center w-1/3">Do wykonania</th>
          <th className="text-center w-1/3">W trakcie</th>
          <th className="text-center w-1/3">Wykonane</th>
        </tr>
        </thead>
        <tbody>
        <tr className="flex flex-row justify-evenly  bg-septenary ">
          <td className="w-1/3 h-screen border-x-2  ">
          <ZadaniaPage />
          </td>
          <td className="w-1/3 h-screen ">
          </td>
          <td className="w-1/3 h-screen border-x-2">
          </td>
          </tr>
        </tbody>
      </table>
     </div>
    </section>
    </>
  );
}