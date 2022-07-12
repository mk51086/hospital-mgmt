// import { useState } from "react";
// import Auth from "../../components/Forms/Auth/Auth";
import LoginLayout from "../../components/Forms/Auth/LoginLayout";
import Footer from "../../components/Footer/Footer";
import footer_props from "../../components/shared/footer_props";

export default function Login() {
/*  const [isPatient, setIsPatient] = useState(true);

  const handleSwitch = () => {
    setIsPatient(!isPatient);
  };
*/
  return (
    <>
        <LoginLayout/>
        <Footer {...footer_props} />
    </>
  );
}
