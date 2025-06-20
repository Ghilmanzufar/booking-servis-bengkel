import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import LoginForm from "../components/acount/FormLogin";
import { Toaster } from 'react-hot-toast';

const LoginPage = () =>{
    return (
        <div>
            <Navbar />
            <section
                className="bg-gray-50 dark:bg-gray-900 bg-cover bg-center"
                style={{
                    backgroundImage:
                    "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1950&q=80')",
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