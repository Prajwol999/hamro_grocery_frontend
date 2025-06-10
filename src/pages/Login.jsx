import React from 'react';

const Login = () => {
    
    const [isLogin, setIsLogin] = React.useState(true);

    
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: ""
    });

   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handles the form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission (page reload)
        if (isLogin) {
            console.log("Logging in with:", { email: formData.email, password: formData.password });
            // Add your login API call here
        } else {
            console.log("Signing up with:", formData);
            // Add your sign-up API call here
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        // Reset form data when toggling
        setFormData({ name: "", email: "", password: "" });
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50">
            <div className="flex w-full max-w-5xl overflow-hidden rounded-xl shadow-2xl">
                {/* Left Side Image (visible on md screens and up) */}
                <div className="hidden w-full md:block md:w-1/2">
                    <img className="h-full w-full object-cover" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png" alt="Decorative" />
                </div>

                {/* Right Side Form */}
                <div className="flex w-full flex-col items-center justify-center bg-white p-8 md:w-1/2">
                    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col items-center justify-center md:max-w-md">
                        <h2 className="mb-2 text-4xl font-bold text-gray-900">
                            {isLogin ? "Sign In" : "Create Account"}
                        </h2>
                        <p className="mt-2 text-sm text-gray-500/90">
                            {isLogin ? "Welcome back! Please sign in to continue." : "Let's get you started!"}
                        </p>

                        {/* Name Input (only for Sign Up) */}
                        {!isLogin && (
                            <div className="mt-8 flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-gray-300/60 bg-transparent pl-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person text-gray-400" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                </svg>
                                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="h-full w-full bg-transparent text-sm text-gray-600 outline-none placeholder:text-gray-500/80" required />
                            </div>
                        )}

                        {/* Email Input */}
                        <div className="mt-6 flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-gray-300/60 bg-transparent pl-6">
                            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280" />
                            </svg>
                            <input type="email" name="email" placeholder="Email ID" value={formData.email} onChange={handleChange} className="h-full w-full bg-transparent text-sm text-gray-600 outline-none placeholder:text-gray-500/80" required />
                        </div>

                        {/* Password Input */}
                        <div className="mt-6 flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-gray-300/60 bg-transparent pl-6">
                            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280" />
                            </svg>
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="h-full w-full bg-transparent text-sm text-gray-600 outline-none placeholder:text-gray-500/80" required />
                        </div>

                        {isLogin && (
                            <div className="mt-8 flex w-full items-center justify-between text-gray-500/80">
                                <div className="flex items-center gap-2">
                                    <input className="h-4 w-4 rounded" type="checkbox" id="checkbox" />
                                    <label className="text-sm" htmlFor="checkbox">Remember me</label>
                                </div>
                                <a className="cursor-pointer text-sm underline hover:text-indigo-500">Forgot password?</a>
                            </div>
                        )}

                        <button type="submit" className="mt-8 h-12 w-full rounded-full bg-indigo-500 font-semibold text-white transition-all duration-300 hover:bg-indigo-600">
                            {isLogin ? "Login" : "Create Account"}
                        </button>

                        {/* Divider */}
                        <div className="my-5 flex w-full items-center gap-4">
                            <div className="h-px w-full bg-gray-300/90"></div>
                            <p className="flex-shrink-0 text-nowrap text-sm text-gray-500/90">or</p>
                            <div className="h-px w-full bg-gray-300/90"></div>
                        </div>

                        {/* Google Button - MOVED TO BOTTOM */}
                        <button type="button" className="flex h-12 w-full items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200">
                            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="Google logo" className="mr-3 h-6 w-6" />
                            <span className="font-semibold text-gray-700">
                                {isLogin ? "Sign in with Google" : "Sign up with Google"}
                            </span>
                        </button>

                        <p className="mt-6 text-sm text-gray-500/90">
                            {isLogin ? "Don’t have an account?" : "Already have an account?"}
                            <span onClick={toggleForm} className="ml-2 cursor-pointer font-medium text-indigo-500 hover:underline">
                                {isLogin ? "Sign up" : "Sign in"}
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;