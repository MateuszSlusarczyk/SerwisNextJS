import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
const ZadaniaPage: NextPage = () => {
  const [zadania, setZadania] = useState<any[]>([]);
  const [pracownicy, setPracownicy] = useState<any[]>([]);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchData = async () => {
      const [zadaniaResponse, uzytkownicyResponse] = await Promise.all([
        fetch('/api/ZadaniaData'),
        fetch('/api/PracownicyData'),
      ]);

      const zadaniaData = await zadaniaResponse.json();
      const pracownicyData = await uzytkownicyResponse.json();

      setZadania(zadaniaData);
      setPracownicy(pracownicyData);
    };

    fetchData();
  }, []);

  const filteredZadania = zadania.filter((zadanie: any) =>
    pracownicy.some(
      (pracownik: any) =>
      session?.user?.name === zadanie.OdpowiedzialnaOsoba && pracownik.rola === 'Pracownik'
    )
  );

  return (
      <div>
        {filteredZadania.map((zadanie: any) => (
            
          <div key={zadanie.Nazwa_zadania} className="flex flex-col bg-nonary rounded-md mb-2">
            <div className='w-full bg-secondary h-2 float-right rounded-tr-md rounded-tl-md '></div>
            <div className='p-2'>
            <p className='font-semibold'>{zadanie.Nazwa_zadania}</p>
            <p>Identyfikator Projektu: {zadanie.id_projektu}</p>
            <p>Odpowiedzialna Osoba: {zadanie.OdpowiedzialnaOsoba}</p>
            <p>{zadanie.Opis_zadania}</p>
            </div>
          </div>
        ))}
      </div>
  );
};

export default ZadaniaPage;
