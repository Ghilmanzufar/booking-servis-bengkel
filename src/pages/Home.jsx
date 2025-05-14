import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HomePage/HeroSection';
import FeatureSection from '../components/HomePage/Feature';
import Services from '../components/HomePage/Service';
import BookingStepsSection from '../components/HomePage/StepByStep';
const Homepage = () => {
    return (
        <div>
            <NavbarComponent/>
            <HeroSection />
            <FeatureSection />
            <Services />
            <BookingStepsSection/>
            <Footer />
        </div>
    );
};

export default Homepage;