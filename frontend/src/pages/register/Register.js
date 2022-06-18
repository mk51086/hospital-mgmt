import RegisterLayout from "../../components/Forms/Signup/RegisterLayout";
import Footer from "../../components/Footer/Footer";
import footer_props from "../../components/shared/footer_props";
export default function Register() {

  return (
    <>
        <RegisterLayout/>
        <Footer {...footer_props} />
    </>
  );

}
