import { RegisterForm } from "./form";
import Navbar from "../components/Navbar";

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <section>
        <div>
          <div>
            <RegisterForm />
          </div>
        </div>
      </section>
    </>
  );
}
