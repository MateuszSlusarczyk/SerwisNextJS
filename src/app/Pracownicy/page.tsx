import { RegisterForm } from "../Pracownicy/form";
import { PracownicyUpdate } from "../Pracownicy/update";
import { PracownicyDelete } from "../Pracownicy/delete";

import Navbar from "../components/Navbar";

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <section>
        <div>
          <div>
            <RegisterForm />
            <PracownicyUpdate />
            <PracownicyDelete />
          </div>
        </div>
      </section>
    </>
  );
}
