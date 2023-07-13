"use client"
import { ChangeEvent, FormEvent, useState } from 'react';

export const FirmaUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    Nazwa: '',
    NowaNazwa: '',
    Nip: '',
    Regon: '',
    Logo: null as File | null,
    Czlonkowie_zarz: '',
  });
  const [error, setError] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFormValues({ Nazwa: '',NowaNazwa:'', Nip: '', Regon: '', Logo: null, Czlonkowie_zarz: '' });
  
    try {
      const logoFile = formValues.Logo;
      const logoData = logoFile ? await toBase64(logoFile) : null; // Convert the Logo file to base64
  
      const requestBody = {
        ...formValues,
        Logo: logoData, // Assign the base64-encoded string to the Logo property
      };
  
      const res = await fetch('/api/FirmaUpdate', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
  
      setLoading(false);
      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }
      // Handle success response
      setFormValues({ Nazwa: '',NowaNazwa:'', Nip: '', Regon: '', Logo: null, Czlonkowie_zarz: '' });
    } catch (error: any) {
      setLoading(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;

    if (name === 'Logo') {
      if (files && files[0]) {
        setFormValues((prevValues) => ({
          ...prevValues,
          Logo: files[0],
        }));
      } else {
        setFormValues((prevValues) => ({
          ...prevValues,
          Logo: null,
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
          name="Nazwa"
          value={formValues.Nazwa}
          onChange={handleChange}
          placeholder="Nazwa firmy do zmiany"
          className={inputStyle}
        />
      </div>
      <div className="mb-2">
        <input
          required
          type="text"
          name="NowaNazwa"
          value={formValues.NowaNazwa}
          onChange={handleChange}
          placeholder="Nowa nazwa firmy"
          className={inputStyle}
        />
      </div>
      <div className="mb-2">
        <input
          required
          type="number"
          name="Nip"
          value={formValues.Nip}
          onChange={handleChange}
          placeholder="Nip"
          maxLength={9}
          className={inputStyle}
        />
      </div>
      <div className="mb-2">
        <input
          required
          type="number"
          name="Regon"
          value={formValues.Regon}
          onChange={handleChange}
          placeholder="Regon"
          maxLength={9}
          className={inputStyle}
        />
      </div>
      <div className="mb-2">
        <input
          required
          type="file"
          name="Logo"
          accept="image/*"
          onChange={handleChange}
          className={inputStyle}
        />
      </div>
      <div className="mb-2">
        <input
          required
          type="text"
          name="Czlonkowie_zarz"
          value={formValues.Czlonkowie_zarz}
          onChange={handleChange}
          placeholder="Członkowie Zarządu"
          className={inputStyle}
        />
      </div>
      <button
        type="submit"
        style={{ backgroundColor: `${loading ? '#ccc' : '#3446eb'}` }}
        className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        disabled={loading}
      >
        {loading ? 'Zmienianie...' : 'Zmień informacje'}
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