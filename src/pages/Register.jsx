import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RegisterForm from "../components/acount/FormRegister";
import { Toaster } from "react-hot-toast";
import background from "../assets/background.jpg";

const Register = () => {
    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
            <Navbar />
            <section
                className="bg-gray-50 dark:bg-gray-900 bg-cover bg-center"
                style={{
                        backgroundImage: `url(${background})`,
                    }}
            >
                <RegisterForm />
            </section>
            <Footer />
        </div>
    );
};

export default Register;