import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/tourism_logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "admin@kh.com",
    password: "1234",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Add your login API call here
    console.log("Login attempt:", formData);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-lg overflow-hidden shadow-lg grid md:grid-cols-2">

        {/* Left Side - Branding */}
        <div className="flex flex-col items-center justify-center p-10 bg-white">
          <img
            src={logo}
            alt="Smart Tourism Logo"
            className="w-48 h-48 object-contain"
          />
          <h1 className="mt-6 text-4xl font-bold text-primary text-center">
            Smart Tourism
          </h1>
          <p className="text-gray-500 mt-2 text-center">Admin Portal</p>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-primary flex items-center justify-center p-10">
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <h2 className="text-4xl font-bold text-white text-center mb-10">
              Admin Login
            </h2>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-white font-medium mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Please enter your email address"
                className="w-full px-4 py-3 rounded bg-blue-400/40 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-white/50 transition"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-8">
              <label htmlFor="password" className="block text-white font-medium mb-2">
                Password <span className="text-red-400">*</span>
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Please enter your password"
                className="w-full px-4 py-3 rounded bg-blue-400/40 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-white/50 transition"
                required
              />
            </div>

            {/* Login Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-primary py-3 rounded font-semibold hover:bg-gray-100 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-white/70 text-sm mt-6">
              Forgot password? <span className="underline cursor-pointer hover:text-white">Reset here</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}