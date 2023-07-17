import { FakturyAdd } from "./Add";
import { FakturyDelete } from "../Faktury/delete";
import { FakturyUpdate } from "../Faktury/update";
import Navbar from "../components/Navbar";

export default function RegisterPage() {
  return (
    <>
      <section>
        <div>
          <div>
            <FakturyAdd/>
            <FakturyUpdate/>
            <FakturyDelete/>
          </div>
        </div>
      </section>
    </>
  );
}
