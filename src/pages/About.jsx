import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AboutUs from "../components/About/AboutComponent";
import FormContact from "../components/About/FormContact"
import { Toaster } from "react-hot-toast";

const About = () =>{
    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
            <Navbar />
                <AboutUs />
                <FormContact />
            <Footer />
        </div>
    );
};

export default About;