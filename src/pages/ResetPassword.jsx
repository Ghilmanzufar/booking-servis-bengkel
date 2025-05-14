import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ResetPasswordForm from "../components/acount/ResetPassword";
const ResetPasswordPage = () =>{
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
                    <ResetPasswordForm />
            </section>
            <Footer />
        </div>
    );
};

export default ResetPasswordPage;