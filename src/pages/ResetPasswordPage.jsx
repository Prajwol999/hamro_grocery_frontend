import React, { useState } from 'react';
import logo from '../assets/hamro2.png';
import axios from 'axios';



const Link = ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>;

const useParams = () => ({ token: 'mock-jwt-token-from-url' });

const useNavigate = () => (path) => {
    console.log(`Navigating to: ${path}`);
    alert(`Navigating to: ${path}`);
};


const EyeIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);


const EyeSlashIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228" />
    </svg>
);


const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const backgroundStyle = {
        backgroundImage: `url('https://placehold.co/1920x1080/1A202C/FFFFFF?text=Background')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            
            const response = await axios.post(`/api/auth/reset-password/${token}`, { password });
            setSuccess(response.data.message);
            
            setTimeout(() => {
                navigate('/auth');
            }, 3000);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "An unexpected error occurred. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative font-sans" style={backgroundStyle}>
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 relative">
                <div className="w-full max-w-lg space-y-8">
                    <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl px-8 pt-10 pb-8">
                        <div className="flex justify-center mb-6">
                            <img src={logo} alt="Logo" className="h-24 w-auto" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/200x96/CCCCCC/FFFFFF?text=Logo'; }}/>
                        </div>

                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">Create New Password</h2>
                            <p className="mt-2 text-sm text-gray-600">Your new password must be different from previous ones.</p>
                        </div>

                        {success ? (
                            <div className="text-center space-y-4">
                                <h3 className="text-xl font-semibold text-green-600">{success}</h3>
                                <p className="text-gray-600">Redirecting to sign in page...</p>
                                <Link to="/auth" className="inline-block bg-gray-800 hover:bg-black text-white font-medium py-2 px-6 rounded-lg">
                                    Sign In Now
                                </Link>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={passwordVisible ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="block w-full rounded-lg border border-gray-300 py-2.5 pl-4 pr-10 text-sm shadow-sm focus:ring-2 focus:ring-gray-500"
                                            placeholder="Enter your new password"
                                        />
                                        <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">
                                            {passwordVisible ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="confirm-password"className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                    <div className="relative">
                                        <input
                                            id="confirm-password"
                                            type={confirmPasswordVisible ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            className="block w-full rounded-lg border border-gray-300 py-2.5 pl-4 pr-10 text-sm shadow-sm focus:ring-2 focus:ring-gray-500"
                                            placeholder="Confirm your new password"
                                        />
                                        <button type="button" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">
                                            {confirmPasswordVisible ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>
                                
                                {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                                <div>
                                    <button type="submit" disabled={loading} className="w-full bg-green-800 hover:bg-black text-white text-sm font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50">
                                        {loading ? 'Resetting...' : 'Reset Password'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
