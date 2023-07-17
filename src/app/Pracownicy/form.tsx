"use client";
import { useRouter } from 'next/router';
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
      const res = await fetch("/api/PracownicyAdd", {
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
      window.location.reload();

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
    <form onSubmit={onSubmit} className="">
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
        className="w-full h-12 rounded-lg bg-tertiary font-bold "
        disabled={loading}
      >
        {loading ? "Dodawanie w toku..." : "Dodaj pracownika"}
      </button>
    </form>
  );
};
