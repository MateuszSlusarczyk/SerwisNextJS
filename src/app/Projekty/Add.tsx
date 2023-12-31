"use client";
import { ChangeEvent, useState } from "react";

export const ProjektyAdd = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    id_klienta: "",
    nazwa_projektu: "",
    data_rozpoczecia: "",
    planowana_data_zakonczenia: "",
  });
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormValues({  id_klienta: "", nazwa_projektu: "", data_rozpoczecia: "", planowana_data_zakonczenia: ""});

    try {
      const res = await fetch("/api/ProjektyAdd", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }

    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const inputStyle =
   //set font to white and background to black
    "w-full px-4 py-3 rounded-lg bg-black text-white border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 ring-blue-200 ring-opacity-50";

  return (
    <form onSubmit={onSubmit}>
      {error && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
      )}
       <div className="mb-3">
        <input
          required
          type="number"
          name="id_klienta"
          value={formValues.id_klienta}
          onChange={handleChange}
          placeholder="Identyfikator klienta"
          className={`${inputStyle}`}
        />
      </div>
      <div className="mb-3">
        <input
          required
          type="text"
          name="nazwa_projektu"
          value={formValues.nazwa_projektu}
          onChange={handleChange}
          placeholder="Nazwa projektu"
          className={`${inputStyle}`}
        />
      </div>
      <div className="mb-3">
        <input
          required
          type="date"
          name="data_rozpoczecia"
          value={formValues.data_rozpoczecia}
          onChange={handleChange}
          placeholder="Data_rozpoczęcia"
          className={`${inputStyle}`}
        />
      </div>
      <div className="mb-3">
        <input
          required
          type="date"
          name="planowana_data_zakonczenia"
          value={formValues.planowana_data_zakonczenia}
          onChange={handleChange}
          placeholder="Planowana data zakończenia"
          className={`${inputStyle}`}
        />
      </div>
      <button
        type="submit"
        style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
        className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        disabled={loading}
      >
        {loading ? "Dodawanie w toku..." : "Dodaj Projekt"}
      </button>
    </form>
  );
};
