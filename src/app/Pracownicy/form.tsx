"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    imię: "",
    nazwisko: "",
    email: "",
    nr_telefonu: "",
    data_końca_umowy: "",
    haslo: "",
  });
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormValues({  imię: "", nazwisko: "", email: "", nr_telefonu: "", data_końca_umowy: "", haslo: ""});

    try {
      const res = await fetch("/api/PracownikAdd", {
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

      signIn(undefined, { callbackUrl: "/" });
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
      <div className="mb-2">
        <input
          required
          type="text"
          name="imię"
          value={formValues.imię}
          onChange={handleChange}
          placeholder="Imię"
          className={`${inputStyle}`}
        />
      </div>
      <div className="mb-2">
        <input
          required
          type="text"
          name="nazwisko"
          value={formValues.nazwisko}
          onChange={handleChange}
          placeholder="Nazwisko"
          className={`${inputStyle}`}
        />
      </div>
      <div className="mb-2">
        <input
          required
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Adres e-mail"
          className={`${inputStyle}`}
        />
      </div>
      <div className="mb-2">
        <input
          required
          type="tel"
          name="nr_telefonu"
          value={formValues.nr_telefonu}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
          onChange={handleChange}
          placeholder="Numer Telefonu"
          className={`${inputStyle}`}
        />
      </div>
      <div className="mb-2">
        <input
          required
          type="date"
          name="data_końca_umowy"
          value={formValues.data_końca_umowy}
          onChange={handleChange}
          placeholder="Data końca umowy"
          className={`${inputStyle}`}
        />
      </div>
      <div className="mb-2">
        <input
          required
          type="password"
          name="haslo"
          value={formValues.haslo}
          onChange={handleChange}
          placeholder="Hasło"
          className={`${inputStyle}`}
        />
      </div>
      <button
        type="submit"
        style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
        className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        disabled={loading}
      >
        {loading ? "Rejestracja w toku..." : "Zarejestruj się"}
      </button>
    </form>
  );
};
