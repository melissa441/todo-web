import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { Camera } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(`https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size too large. Please select an image under 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 200;
          const MAX_HEIGHT = 200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
          setAvatar(compressedDataUrl);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      if (users.find(u => u.email === email)) {
        throw new Error("User already exists with this email.");
      }

      const newUser = {
        uid: Date.now().toString(),
        email,
        password,
        name: email.split('@')[0],
        avatar: avatar,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      login({
        id: newUser.uid,
        uid: newUser.uid,
        email: newUser.email,
        name: newUser.name,
        avatar: newUser.avatar
      });

      toast.success("🎉 Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md p-8 bg-pink-50 rounded-2xl shadow-md border border-pink-100">
        <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="flex flex-col items-center mb-4">
            <div
              className="relative group cursor-pointer"
              onClick={handleImageClick}
            >
              <img
                src={avatar}
                alt="Avatar Preview"
                className="w-24 h-24 rounded-full border-4 border-pink-200 object-cover shadow-sm group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white w-6 h-6" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <p className="text-xs text-pink-400 mt-2">Optional: Upload profile picture</p>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-pink-100 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none bg-white shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-600 font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
