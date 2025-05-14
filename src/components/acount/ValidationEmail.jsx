import React from 'react';

const ForgotPasswordForm = () => {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Forgot your password?
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                Enter your email and we'll send you a link to reset your password.
                </p>
                <form className="space-y-4 md:space-y-6" action="#">
                <div>
                    <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Your email
                    </label>
                    <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    Send Reset Link
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Remember your password?{' '}
                    <a
                    href="/login"
                    className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                    >
                    Sign in
                    </a>
                </p>
                </form>
            </div>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
