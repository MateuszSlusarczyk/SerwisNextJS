import { FirmaAdd } from "../Firma/form";
import { FirmaUpdate } from "../Firma/update";
import { FirmaDelete } from "../Firma/delete";
import Navbar from "../components/Navbar";

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <section>
        <div>
          <div>
            <FirmaAdd />
            <FirmaUpdate />
            <FirmaDelete />
          </div>
        </div>
      </section>
    </>
  );
}
