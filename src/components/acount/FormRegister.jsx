import React from "react";

const RegisterForm = () => {
    return (
            <div className="flex flex-col items-center justify-center lg:py-0 backdrop-blur-sm ">
                <div className="w-full my-10 rounded-lg shadow sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6">
                        <div>
                            <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                            Full Name
                            </label>
                            <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="John Doe"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                            htmlFor="phone"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                            Phone Number
                            </label>
                            <input
                            type="tel"
                            name="phone"
                            id="phone"
                            placeholder="08xxxxxxxxxx"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
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
                            placeholder="name@company.com"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                            Password
                            </label>
                            <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                            htmlFor="confirm-password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                            Confirm password
                            </label>
                            <input
                            type="password"
                            name="confirm-password"
                            id="confirm-password"
                            placeholder="••••••••"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                            <input
                                id="terms"
                                type="checkbox"
                                required
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600"
                            />
                            </div>
                            <div className="ml-3 text-sm">
                            <label
                                htmlFor="terms"
                                className="font-light text-blue-500 dark:text-gray-300"
                            >
                                I accept the{" "}
                                <a
                                className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                                href="#"
                                >
                                Terms and Conditions
                                </a>
                            </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 transition"
                            >
                            Register Akun
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account?{" "}
                            <a
                            href="#"
                            className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                            >
                            Login here
                            </a>
                        </p>
                        </form>
                    </div>
                    </div>
                </div>
    );
};

export default RegisterForm;
