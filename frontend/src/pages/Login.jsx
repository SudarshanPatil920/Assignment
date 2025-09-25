import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api";

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isFocused, setIsFocused] = useState({ email: false, password: false });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    const handleFocus = (field) => setIsFocused(prev => ({ ...prev, [field]: true }));
    const handleBlur = (field) => setIsFocused(prev => ({ ...prev, [field]: false }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await loginUser(form);
            console.log("Logged-in user:", res);

            if (res._id) {
                // Don't store in localStorage
                if (res.role === "admin") navigate("/admin");
                else navigate("/dashboard");
            }
            else {
                setError("No User Found");
            }
        } catch (err) {
            setError(err.message || "Login failed");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 p-6 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-amber-400/10 to-rose-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/5 to-teal-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }}></div>
            </div>

            {/* Login card */}
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-2xl mb-4 border border-amber-400/30">
                            <svg className="w-8 h-8 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-light bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-slate-400 font-light">Sign in to your account</p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-6 p-4 bg-rose-500/10 border border-rose-400/20 rounded-xl backdrop-blur-sm">
                            <div className="flex items-center space-x-2 text-rose-300">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm font-medium">{error}</span>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div className="relative">
                            <label className="block text-amber-100/80 text-sm font-light mb-3 uppercase tracking-wider">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                onFocus={() => handleFocus("email")}
                                onBlur={() => handleBlur("email")}
                                required
                                disabled={loading}
                                placeholder="your@email.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-amber-50 placeholder-slate-400 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 backdrop-blur-sm pr-10"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label className="block text-amber-100/80 text-sm font-light mb-3 uppercase tracking-wider">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                onFocus={() => handleFocus("password")}
                                onBlur={() => handleBlur("password")}
                                required
                                disabled={loading}
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-amber-50 placeholder-slate-400 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 backdrop-blur-sm pr-10"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl hover:shadow-amber-500/25 overflow-hidden"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-white/10">
                        <p className="text-center text-slate-400 font-light">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-amber-300 hover:text-amber-200 font-medium">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center mt-6">
                    <p className="text-slate-500 text-sm font-light">© 2024 Task Elegance. Premium Experience</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
