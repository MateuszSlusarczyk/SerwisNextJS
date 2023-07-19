"use client"
import { ZadaniaAdd } from "../Zadania/form";
import { ZadaniaUpdate } from "../Zadania/update";
import { ZadaniaDelete } from "../Zadania/delete";
import { GetZadania } from "../Zadania/getAdmin";
import Dodaj from 'plus.png'
import Aktualizuj from 'changes.png'
import Usun from 'x-mark.png'
import Image from 'next/image'
import { useState } from "react";
export default function RegisterPage() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showUpdateComponent, setShowUpdateComponent] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);

  const handleToggleForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  const handleToggleUpdateComponent = () => {
    setShowUpdateComponent(!showUpdateComponent);
  };

  const handleToggleDeleteComponent = () => {
    setShowDeleteComponent(!showDeleteComponent);
  };

  return (
    <>
    <section className="flex p-3 w-screen justify-center">
      <div className="w-full h-1/2">
        <div className="mb-4 md:flex md:justify-between">
          <button onClick={handleToggleForm} className="mb-4 md:mb-0 bg-tertiary  h-16 rounded-lg font-bold justify-center items-center flex flex-row w-1/3 mr-2" >
          <Image
                    src={Dodaj}
                    width={30}
                    height={30}
                    alt="Dodaj"
                    className='inline-block'
                    />
            <p className="ml-2 text-lg">Dodaj Zadanie</p>
            </button>
          <button onClick={handleToggleUpdateComponent} className="mb-4 md:mb-0 bg-quaternary  h-16 rounded-lg font-bold justify-center items-center flex flex-row w-1/3 mr-2">
          <Image
                    src={Aktualizuj}
                    width={30}
                    height={30}
                    alt="Aktualizuj"
                    className='inline-block'
                    />
            <p className="ml-2 text-lg">Aktualizuj Zadanie</p>
            
            </button>
          <button onClick={handleToggleDeleteComponent} className="mb-4 md:mb-0 bg-quinary  h-16 rounded-lg font-bold justify-center items-center flex flex-row w-1/3">
          <Image
                    src={Usun}
                    width={30}
                    height={30}
                    alt="Usun"
                    className='inline-block'
                    />
            <p className="ml-2 text-lg">Usuń Zadanie</p></button>
        </div>
        <div className="flex flex-row flex-wrap w-full justify-between">
          <div className="w-full md:w-1/3">
            {showRegisterForm && <ZadaniaAdd />}
          </div>
          <div className="w-full md:w-1/3">
            {showUpdateComponent && <ZadaniaUpdate />}
          </div>
          <div className="w-full md:w-1/3">
            {showDeleteComponent && <ZadaniaDelete />}
          </div>
        </div>
        < GetZadania/>
      </div>
    </section>
    </>
  );
}