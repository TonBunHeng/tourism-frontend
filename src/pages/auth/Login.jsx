import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Sun, Moon, ShieldCheck, ArrowRight } from "lucide-react";
import logo from "../../assets/images/tourism_logo.png";
import { getInitialTheme, applyTheme, isDarkTheme, THEME_CHANGE_EVENT } from "../../utils/Theme";
import authService from "../../services/authService";
import { useAlert } from "../../context/AlertContext";

export default function Login() {
  const { showInfo } = useAlert();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "admin@tourism.gov.kh",
    password: "password123",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return isDarkTheme(getInitialTheme());
  });

  useEffect(() => {
    const handleThemeChange = (e) => {
      if (e.detail && typeof e.detail.isDark === "boolean") {
        setIsDarkMode(e.detail.isDark);
      } else {
        setIsDarkMode(document.documentElement.classList.contains("dark"));
      }
    };
    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = isDarkMode ? "light" : "dark";
    applyTheme(nextTheme);
    setIsDarkMode(!isDarkMode);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await authService.login(formData);
      if (res.success) {
        navigate("/dashboard");
      } else {
        setErrorMessage(res.message || "Invalid credentials.");
      }
    } catch (err) {
      setErrorMessage(err.message || "Failed to log in to API backend.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-100 dark:bg-[#09090b] text-slate-900 dark:text-zinc-100 transition-colors duration-300 overflow-hidden select-none">
      {/* Glassmorphic Container */}
      <div className="w-full max-w-4xl bg-white/90 dark:bg-zinc-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-zinc-800/80 rounded-lg shadow-2xl overflow-hidden grid md:grid-cols-12 relative z-10 transition-all duration-300">

        {/* Left Section - Branding & Visuals (Solid Primary Color) */}
        <div className="md:col-span-5 bg-[#003E83] text-white p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full pointer-events-none" />

          {/* Top Logo & App Title */}
          <div>
            <div className="w-24 h-24 mb-4 drop-shadow-lg">
              <img
                src={logo}
                alt="AngkorVerses Logo"
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white text-center">
              AngkorVerses
            </h1>
            <p className="text-blue-200/80 text-sm font-medium mt-1 text-center">
              Admin & Management Portal
            </p>
          </div>

          {/* Middle/Bottom Features Highlight */}
          <div className="relative z-10 mt-12 mb-6 hidden md:block space-y-4">
            <div className="flex items-center gap-3 text-xs lg:text-sm text-blue-100/90 bg-white/10 backdrop-blur-sm px-3.5 py-2.5 rounded-xl border border-white/10">
              <ShieldCheck className="w-5 h-5 text-[#22b7ab] shrink-0" />
              <span>Secure Role-Based Access Control</span>
            </div>
            <div className="flex items-center gap-3 text-xs lg:text-sm text-blue-100/90 bg-white/10 backdrop-blur-sm px-3.5 py-2.5 rounded-xl border border-white/10">
              <div className="w-2 h-2 rounded-full bg-[#22b7ab] animate-pulse" />
              <span>Real-time Tourism Data Analytics</span>
            </div>
          </div>

          {/* Footer Copyright */}
          <div className="relative z-10 text-xs text-blue-200/60 font-light">
            © {new Date().getFullYear()} AngkorVerses. All rights reserved.
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="md:col-span-7 p-8 lg:p-12 flex flex-col justify-between bg-white/60 dark:bg-zinc-900/60">

          {/* Header & Dark Mode Toggle */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
                Admin Sign In
              </h2>
              <p className="text-slate-500 dark:text-zinc-400 text-sm mt-1">
                Enter your credentials to manage portal settings
              </p>
            </div>

            <button
              type="button"
              onClick={handleToggleTheme}
              className="p-2.5 rounded-xl text-slate-600 dark:text-zinc-300 hover:bg-slate-200/60 dark:hover:bg-zinc-800 transition-colors border border-slate-200 dark:border-zinc-700/60 cursor-pointer"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@tourism.gov.kh"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#003E83] dark:focus:ring-[#22b7ab] focus:border-transparent transition text-sm"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                  Password <span className="text-red-500">*</span>
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => { 
                    e.preventDefault(); 
                    showInfo("Please contact the Super Administrator (admin@tourism.gov.kh) to securely reset your credentials.", "Password Reset Request"); 
                  }}
                  className="text-xs text-[#003E83] dark:text-[#22b7ab] hover:underline font-medium cursor-pointer"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#003E83] dark:focus:ring-[#22b7ab] focus:border-transparent transition text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me Option */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 dark:border-zinc-700 text-[#003E83] focus:ring-[#003E83] dark:focus:ring-[#22b7ab] cursor-pointer"
                />
                <span className="text-xs font-medium text-slate-600 dark:text-zinc-400">Remember session</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-[#003E83] hover:bg-[#002e62] text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg shadow-[#003E83]/25 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
