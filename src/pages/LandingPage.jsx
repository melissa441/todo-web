import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { NotebookPen, MapPin, CheckCircle } from "lucide-react";
import Button from "../components/Button"; // ✅ Import Button

export default function LandingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 shadow">
        <h1 className="text-2xl font-bold text-pink-600">TaskFlow</h1>
        <nav className="space-x-4">
          <Link to="/login" className="text-gray-600 hover:text-pink-600">
            Login
          </Link>
          <Button to="/signup">Sign Up</Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row flex-1 items-center justify-center px-8 py-16 gap-12">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Organize Your Tasks Effortlessly
          </h2>
          <p className="text-lg text-gray-600">
            TaskFlow helps you manage your periodic schedule in 3 simple groups:
            <span className="font-semibold text-pink-500"> To-Do</span>,{" "}
            <span className="font-semibold text-pink-500">In Progress</span>, and{" "}
            <span className="font-semibold text-pink-500">Done</span>.
          </p>

          <p className="flex items-center text-gray-700">
            <MapPin className="w-5 h-5 text-pink-500 mr-2" />
            Based in Kigali, Rwanda 
          </p>

          {/* ✅ Using Button components */}
          <div className="space-x-4">
            <Button to="/signup" variant="primary">
              Get Started
            </Button>
            <Button to="/login" variant="outline">
              Login
            </Button>
          </div>
        </motion.div>

        {/* Right side animations remain the same */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 flex flex-col items-center gap-6"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="bg-pink-100 p-6 rounded-xl shadow-lg w-72 text-center"
          >
            <NotebookPen className="w-12 h-12 text-pink-500 mx-auto" />
            <h3 className="font-bold mt-2">Add a Task</h3>
            <p className="text-sm text-gray-600">Quickly jot down your tasks.</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            className="bg-pink-100 p-6 rounded-xl shadow-lg w-72 text-center"
          >
            <CheckCircle className="w-12 h-12 text-pink-500 mx-auto" />
            <h3 className="font-bold mt-2">Track Progress</h3>
            <p className="text-sm text-gray-600">
              Move tasks from To-Do → In Progress → Done.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <footer className="text-center py-4 text-gray-500 border-t">
        © {new Date().getFullYear()} TaskFlow. All rights reserved.
      </footer>
    </div>
  );
}
