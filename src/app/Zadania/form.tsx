"use client"
import { ChangeEvent, FormEvent, useState } from 'react';

export const ZadaniaAdd = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    Nazwa_zadania: '',
    id_projektu: '',
    OdpowiedzialnaOsoba: '',
    Grafika: null as File | null,
    Opis_zadania: '',
  });
  const [error, setError] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFormValues({ Nazwa_zadania: '', id_projektu: '', OdpowiedzialnaOsoba: '', Grafika: null, Opis_zadania: '' });
    try {
      const GrafikaFile = formValues.Grafika;
      const GrafikaData = GrafikaFile ? await toBase64(GrafikaFile) : null; // Convert the Logo file to base64
  
      const requestBody = {
        ...formValues,
        Grafika: GrafikaData, // Assign the base64-encoded string to the Logo property
      };
      
      const res = await fetch('/api/ZadaniaAdd', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
  
      setLoading(false);
      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }
      // Handle success response
      setFormValues({ Nazwa_zadania: '', id_projektu: '', OdpowiedzialnaOsoba: '', Grafika: null, Opis_zadania: '' });
    } catch (error: any) {
      setLoading(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;

    if (name === 'Grafika') {
      if (files && files[0]) {
        setFormValues((prevValues) => ({
          ...prevValues,
          Grafika: files[0],
        }));
      } else {
        setFormValues((prevValues) => ({
          ...prevValues,
          Grafika: null,
        }));
      }
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const inputStyle =
    'w-full px-4 py-3 rounded-lg bg-black text-white border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 ring-blue-200 ring-opacity-50';

  return (
    <form onSubmit={onSubmit}>
      {error && <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>}
      <div className="mb-2">
        <input
          required
          type="text"
          name="Nazwa_zadania"
          value={formValues.Nazwa_zadania}
          onChange={handleChange}
          placeholder="Nazwa Zadania"
          className={inputStyle}
        />
      </div>
      <div className="mb-2">
        <input
          required
          type="number"
          name="id_projektu"
          value={formValues.id_projektu}
          onChange={handleChange}
          placeholder="Id Projektu"
          className={inputStyle}
        />
      </div>
      <div className="mb-2">
        <input
          required
          type="text"
          name="OdpowiedzialnaOsoba"
          value={formValues.OdpowiedzialnaOsoba}
          onChange={handleChange}
          placeholder="Osoba odpowiedzialna za zadanie"
          className={inputStyle}
        />
      </div>
      <div className="mb-2">
        <input
          required
          type="file"
          name="Grafika"
          accept="image/*"
          onChange={handleChange}
          className={inputStyle}
        />
      </div>
      <div className="mb-2">
        <input
          required
          type="text"
          name="Opis_zadania"
          value={formValues.Opis_zadania}
          onChange={handleChange}
          placeholder="Opis Zadania"
          className={inputStyle}
        />
      </div>
      <button
        type="submit"
        style={{ backgroundColor: `${loading ? '#ccc' : '#3446eb'}` }}
        className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        disabled={loading}
      >
        {loading ? 'Dodawanie...' : 'Dodaj Zadanie'}
      </button>
    </form>
  );
};
const toBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};