"use client"
import { ChangeEvent, FormEvent, useState } from 'react';

export const ZadaniaDelete = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    Nazwa_zadania: '',
  });
  const [error, setError] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFormValues({ Nazwa_zadania: ''});
  
    try {
      const res = await fetch('/api/ZadaniaDelete', {
        body: JSON.stringify(formValues),
        method: 'POST',
      });
  
      setLoading(false);
      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }
      // Handle success response
      setFormValues({ Nazwa_zadania: ''});
    } catch (error: any) {
      setLoading(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value} = event.target;

      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
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
          placeholder="Nazwa firmy do usunięcia"
          className={inputStyle}
        />
      </div>
      <button
        type="submit"
        style={{ backgroundColor: `${loading ? '#ccc' : '#3446eb'}` }}
        className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        disabled={loading}
      >
        {loading ? 'Usuwanie...' : 'Usuń'}
      </button>
    </form>
  );
};