import About from "./../../components/About/About";
import "./Home.css";
import Footer from "../../components/Footer/Footer";
import ContactUsModal from "../contactus/contactus";
import footer_props from "../../components/shared/footer_props";

export default function Home() {
  return (
    <div className="home">
      <ContactUsModal />
      <div className="container">
        <About />
      </div>
      <Footer {...footer_props} />
    </div>
  );
}
