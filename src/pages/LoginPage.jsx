import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        login({
          id: user.uid,
          uid: user.uid,
          email: user.email,
          name: user.name,
          avatar: user.avatar
        });
        toast.success("👋 Welcome back!");
        navigate("/dashboard");
      } else {
        toast.error("❌ Invalid email or password.");
      }
    } catch (err) {
      toast.error("⚠️ An error occurred during login.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md p-8 bg-pink-50 rounded-2xl shadow-md border border-pink-100">
        <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
          Welcome Back!
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              className="w-full px-4 py-3 border border-pink-100 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none bg-white shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className="w-full px-4 py-3 border border-pink-100 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none bg-white shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white py-3.5 rounded-xl font-bold hover:bg-pink-600 transition-all shadow-lg active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-pink-600 font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
