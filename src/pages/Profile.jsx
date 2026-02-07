import React, { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Camera } from "lucide-react";

function Profile() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [displayName, setDisplayName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");

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
          // Create canvas for compression/resizing
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

          // Get compressed data URL
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
          setAvatar(compressedDataUrl);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex((u) => u.uid === user.id);

      if (userIndex === -1) {
        throw new Error("User not found.");
      }

      // Update local storage users array
      users[userIndex] = {
        ...users[userIndex],
        name: displayName,
        email: email,
        avatar: avatar,
      };
      localStorage.setItem("users", JSON.stringify(users));

      // Update current context session
      login({
        ...user,
        name: displayName,
        email: email,
        avatar: avatar,
      });

      toast.success("Profile updated!");
      // Automatic return to home page (dashboard)
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onLogout={handleLogout} title="My Profile" />

      <div className="flex flex-col items-center justify-center p-6 min-h-[calc(100vh-80px)]">
        <div className="bg-pink-50 p-8 rounded-2xl shadow-xl border border-pink-100 w-full max-w-md relative">
          <h1 className="text-3xl font-bold mb-8 text-center text-pink-600">Profile Settings</h1>

          <div className="flex flex-col items-center mb-8">
            <div
              className="relative group cursor-pointer"
              onClick={handleImageClick}
            >
              <img
                src={avatar}
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-pink-200 object-cover shadow-md transition-transform group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white w-8 h-8" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <p className="text-xs text-pink-400 mt-2">Click to change photo</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-1.5 text-pink-600 font-medium ml-1">Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full p-3 rounded-xl border border-pink-100 focus:ring-2 focus:ring-pink-400 outline-none bg-white transition-all shadow-sm"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-pink-600 font-medium ml-1">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl border border-pink-100 focus:ring-2 focus:ring-pink-400 outline-none bg-white transition-all shadow-sm"
                placeholder="your.email@example.com"
              />
            </div>

            <button
              onClick={handleUpdate}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg active:scale-[0.98] mt-4"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
