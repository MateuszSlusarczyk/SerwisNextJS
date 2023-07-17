import { FirmaAdd } from "../Firma/form";
import { FirmaUpdate } from "../Firma/update";
import { FirmaDelete } from "../Firma/delete";
import Navbar from "../components/Navbar";

export default function RegisterPage() {
  return (
    <>
      <section>
        <div>
          <div className="bg-red-500">
            <FirmaAdd />
            <FirmaUpdate />
            <FirmaDelete />
          </div>
        </div>
      </section>
    </>
  );
}
