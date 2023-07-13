import { ProjektyAdd } from "../Projekty/Add";
import { ProjektyDelete } from "../Projekty/delete";
import { ProjektyUpdate } from "../Projekty/update";
import Navbar from "../components/Navbar";

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <section>
        <div>
          <div>
            <ProjektyAdd/>
            <ProjektyUpdate/>
            <ProjektyDelete/>
          </div>
        </div>
      </section>
    </>
  );
}
