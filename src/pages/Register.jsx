import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RegisterForm from "../components/acount/FormRegister";
import { Toaster } from "react-hot-toast";

const Register = () => {
    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
            <Navbar />
            <section
                className="bg-gray-50 dark:bg-gray-900 bg-cover bg-center"
                style={{
                    backgroundImage:
                    "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1950&q=80')",
                }}
            >
                <RegisterForm />
            </section>
            <Footer />
        </div>
    );
};

export default Register;