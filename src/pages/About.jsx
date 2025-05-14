import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AboutUs from "../components/About/AboutComponent";
import FormContact from "../components/About/FormContact"
const About = () =>{
    return (
        <div>
            <Navbar />
                <AboutUs />
                <FormContact />
            <Footer />
        </div>
    );
};

export default About;