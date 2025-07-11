import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import LoginForm from "../components/acount/FormLogin";
import background from "../assets/background.jpg";
import { Toaster } from 'react-hot-toast';

const LoginPage = () => {
    return (
        <div>
        <Navbar />
        <section
            className="bg-gray-50 dark:bg-gray-900 bg-cover bg-center"
            style={{
            backgroundImage: `url(${background})`,
            }}
        >
            <LoginForm />
        </section>
        <Footer />
        <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default LoginPage;
