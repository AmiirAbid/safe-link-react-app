import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import AnimatedBackground from "@/components/AnimatedBackground.jsx";
import { authService } from "@/services/authService.js";

// Input Field Component
const InputField = ({ icon: Icon, type, placeholder, value, onChange, name, error }) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
        <div className="space-y-2">
            <div className="relative">
                <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type={inputType}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`w-full pl-12 pr-12 py-3 bg-slate-900/50 border ${error ? 'border-red-500/50' : 'border-cyan-500/20'
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#6abaca] focus:ring-2 focus:ring-[#6abaca]/20 transition-all`}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6abaca] transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                )}
            </div>
            {error && (
                <div className="flex items-center space-x-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

// Login Form Component
const LoginForm = ({ onSwitchToSignup }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        return newErrors;
    };

    const handleSubmit = async () => {
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setSuccessMessage('');

        try {
            const response = await authService.login(formData.email, formData.password);
            setSuccessMessage('Login successful! Redirecting...');
            console.log('Login successful:', response);
            window.location.href = "/dashboard"
        } catch (error) {
            setErrors({ submit: error.message || 'Login failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <InputField
                icon={Mail}
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />

            <InputField
                icon={Lock}
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
            />

            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-400 cursor-pointer hover:text-gray-300">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="mr-2 rounded border-cyan-500/20 bg-slate-900/50 text-[#6abaca] focus:ring-[#6abaca]"
                    />
                    Remember me
                </label>
                <button
                    type="button"
                    onClick={() => console.log('Forgot password')}
                    className="text-[#6abaca] hover:text-cyan-400 transition-colors"
                >
                    Forgot password?
                </button>
            </div>

            {errors.submit && (
                <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                    <AlertCircle className="w-5 h-5" />
                    <span>{errors.submit}</span>
                </div>
            )}

            {successMessage && (
                <div className="flex items-center space-x-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
                    <CheckCircle className="w-5 h-5" />
                    <span>{successMessage}</span>
                </div>
            )}

            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full py-3 bg-[#6abaca] text-slate-950 rounded-lg font-semibold hover:bg-cyan-400 transition-all hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Signing in...</span>
                    </>
                ) : (
                    <span>Sign In</span>
                )}
            </button>

            <div className="text-center text-gray-400 text-sm">
                Don't have an account?{' '}
                <button
                    type="button"
                    onClick={onSwitchToSignup}
                    className="text-[#6abaca] hover:text-cyan-400 transition-colors font-semibold"
                >
                    Sign up
                </button>
            </div>
        </div>
    );
};

// Signup Form Component
const SignupForm = ({ onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain uppercase, lowercase, and number';
        }

        if (!agreedToTerms) {
            newErrors.terms = 'You must agree to the terms';
        }

        return newErrors;
    };

    const handleSubmit = async () => {
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setSuccessMessage('');

        try {
            const response = await authService.signup(formData.name, formData.email, formData.password);
            setSuccessMessage('Account created successfully! Redirecting...');
            console.log('Signup successful:', response);
        } catch (error) {
            setErrors({ submit: error.message || 'Signup failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <InputField
                icon={User}
                type="text"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
            />

            <InputField
                icon={Mail}
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />

            <InputField
                icon={Lock}
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
            />

            <div className="text-xs text-gray-400 space-y-1">
                <p>Password must contain:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                    <li className={formData.password.length >= 8 ? 'text-green-400' : ''}>At least 8 characters</li>
                    <li className={/[A-Z]/.test(formData.password) ? 'text-green-400' : ''}>One uppercase letter</li>
                    <li className={/[a-z]/.test(formData.password) ? 'text-green-400' : ''}>One lowercase letter</li>
                    <li className={/\d/.test(formData.password) ? 'text-green-400' : ''}>One number</li>
                </ul>
            </div>

            <div>
                <label className="flex items-start text-gray-400 text-sm cursor-pointer hover:text-gray-300">
                    <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mr-2 mt-1 rounded border-cyan-500/20 bg-slate-900/50 text-[#6abaca] focus:ring-[#6abaca]"
                    />
                    <span>I agree to the <button type="button" onClick={() => console.log('Terms')} className="text-[#6abaca] hover:text-cyan-400">Terms of Service</button> and <button type="button" onClick={() => console.log('Privacy')} className="text-[#6abaca] hover:text-cyan-400">Privacy Policy</button></span>
                </label>
                {errors.terms && (
                    <div className="flex items-center space-x-2 text-red-400 text-sm mt-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.terms}</span>
                    </div>
                )}
            </div>

            {errors.submit && (
                <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                    <AlertCircle className="w-5 h-5" />
                    <span>{errors.submit}</span>
                </div>
            )}

            {successMessage && (
                <div className="flex items-center space-x-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
                    <CheckCircle className="w-5 h-5" />
                    <span>{successMessage}</span>
                </div>
            )}

            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full py-3 bg-[#6abaca] text-slate-950 rounded-lg font-semibold hover:bg-cyan-400 transition-all hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Creating account...</span>
                    </>
                ) : (
                    <span>Create Account</span>
                )}
            </button>

            <div className="text-center text-gray-400 text-sm">
                Already have an account?{' '}
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-[#6abaca] hover:text-cyan-400 transition-colors font-semibold"
                >
                    Sign in
                </button>
            </div>
        </div>
    );
};

// Main Auth Component
export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="relative min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
            <AnimatedBackground />

            <div className="relative z-10 w-full max-w-md">
                {/* Logo and Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <img src="/safelink-logo.png" alt="SafeLink" className="w-12 h-12 text-[#6abaca]" />
                        <span className="text-3xl font-bold bg-gradient-to-r from-[#6abaca] to-cyan-300 bg-clip-text text-transparent">
                            SafeLink
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">
                        {isLogin ? 'Welcome Back' : 'Create Your Account'}
                    </h1>
                    <p className="text-gray-400">
                        {isLogin
                            ? 'Sign in to access your security dashboard'
                            : 'Join thousands protecting their networks'}
                    </p>
                </div>

                {/* Auth Card */}
                <div className="relative p-8 bg-slate-900/50 backdrop-blur border border-cyan-500/20 rounded-2xl shadow-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent rounded-2xl"></div>

                    <div className="relative">
                        {isLogin ? (
                            <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
                        ) : (
                            <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
                        )}
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center text-gray-500 text-xs">
                    <p>Protected by SafeLink Security</p>
                    <p className="mt-1">© 2025 SafeLink. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}