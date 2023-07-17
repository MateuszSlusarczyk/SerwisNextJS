"use client"
import { ChangeEvent, FormEvent, useState } from 'react';

export const PracownicyDelete = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
  });
  const [error, setError] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFormValues({ email: ''});
  
    try {
      const res = await fetch('/api/PracownicyDelete', {
        body: JSON.stringify(formValues),
        method: 'POST',
      });
  
      setLoading(false);
      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }
      // Handle success response
      setFormValues({ email: ''});
      window.location.reload();
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
    <form onSubmit={onSubmit} className="">
      {error && <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>}
      <div className="mb-2">
        <input
          required
          type="text"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Adres email pracownika do usunięcia"
          className={inputStyle}
        />
      </div>
      <button
        type="submit"
    
        className="w-full h-12 rounded-lg bg-quinary font-bold"
        disabled={loading}
      >
        {loading ? 'Usuwanie...' : 'Usuń'}
      </button>
    </form>
  );
};