import About from "./../../components/About/About";
import Copyright from "../../components/Copyright/Copyright";
import "./Home.css";
import ContactUsModal from "../contactus/contactus";

export default function Home() {
  return (
    <div className="home">
      <ContactUsModal />
      <div className="container">
        <About />
      </div>
      <div className="copyright"><Copyright sx={{ mt: 5 }} text={"Hospital Management System"} /></div>
    </div>
  );
}
