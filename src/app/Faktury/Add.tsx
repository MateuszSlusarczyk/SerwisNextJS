"use client";
import { ChangeEvent, useState } from "react";

export const FakturyAdd = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
   nazwa: "",
   id_projektu: "",
   wartość_netto: "",
  });
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormValues({  nazwa: "", id_projektu: "", wartość_netto: ""});

    try {
      const res = await fetch("/api/FakturyAdd", {
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
          type="text"
          name="nazwa"
          value={formValues.nazwa}
          onChange={handleChange}
          placeholder="Nazwa Faktury"
          className={`${inputStyle}`}
        />
      </div>
      <div className="mb-3">
        <input
          required
          type="number"
          name="id_projektu"
          value={formValues.id_projektu}
          onChange={handleChange}
          placeholder="Identyfikator projektu"
          className={`${inputStyle}`}
        />
      </div>
      <div className="mb-3">
        <input
          required
          type="number"
          name="wartość_netto"
          value={formValues.wartość_netto}
          onChange={handleChange}
          placeholder="Wartość netto"
          className={`${inputStyle}`}
        />
      </div>
      <button
        type="submit"
        style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
        className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        disabled={loading}
      >
        {loading ? "Dodawanie w toku..." : "Dodaj Klienta"}
      </button>
    </form>
  );
};
