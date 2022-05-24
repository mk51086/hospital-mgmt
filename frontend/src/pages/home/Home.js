import About from "./../../components/About/About";
import Copyright from "../../components/Copyright/Copyright";
import "./Home.css";
export default function Home() {
  return (
    <div className="home">
      <div className="container">
        <About />
      </div>
      <div className="copyright"><Copyright sx={{ mt: 5 }} text={"Hospital Management System"} /></div>
    </div>
  );
}
