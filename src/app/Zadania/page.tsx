import { ZadaniaAdd } from "../Zadania/form";
import { ZadaniaUpdate } from "../Zadania/update";
import { ZadaniaDelete } from "../Zadania/delete";
import Navbar from "../components/Navbar";

export default function RegisterPage() {
  return (
    <>
      <section>
        <div>
          <div>
            <ZadaniaAdd />
            <ZadaniaUpdate />
            <ZadaniaDelete />
          </div>
        </div>
      </section>
    </>
  );
}
