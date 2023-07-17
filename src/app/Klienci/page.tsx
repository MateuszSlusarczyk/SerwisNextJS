import { KlienciAdd } from "./Add";
import { KlienciDelete } from "../Klienci/delete";
import { KlienciUpdate } from "../Klienci/update";
import Navbar from "../components/Navbar";

export default function RegisterPage() {
  return (
    <>

      <section>
        <div>
          <div>
            <KlienciAdd/>
            <KlienciUpdate/>
            <KlienciDelete/>
          </div>
        </div>
      </section>
    </>
  );
}
