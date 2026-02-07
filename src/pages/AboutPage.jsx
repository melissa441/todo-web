// src/pages/AboutPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import {
  HelpCircle,
  BookOpen,
  MessageSquare,
  ChevronDown,
  Database,
  Lock,
  CloudOff,
  Code,
  Layers,
  MousePointer2,
  Heart,
  Coffee
} from "lucide-react";

export default function AboutPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [openFaq, setOpenFaq] = useState(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const faqs = [
    {
      id: 1,
      question: "Where is my data stored?",
      answer: "Your data is stored locally in your browser's Internal Storage (localStorage). This means your tasks never leave your computer, providing 100% privacy."
    },
    {
      id: 2,
      question: "Do I need an internet connection?",
      answer: "No! Since the app runs entirely in your browser using local storage, you can manage your tasks offline. Internet is only needed to initially load the website."
    },
    {
      id: 3,
      question: "Can I use multiple accounts?",
      answer: "Yes. You can create different local 'accounts'. Each account has its own independent task board stored separately in your browser storage."
    },
    {
      id: 4,
      question: "What happens if I clear my browser cache?",
      answer: "WARNING: If you manually clear your browser's 'Site Data' or 'Local Storage', your tasks and local accounts will be deleted. We recommend not clearing site data for this app."
    },
    {
      id: 5,
      question: "Is this app secure?",
      answer: "Yes. Since there is no database server, there is no risk of a cloud data breach. Your data stays on your physical device."
    }
  ];

  const techStack = [
    {
      title: "React 19",
      description: "A modern JavaScript library for building fast, reactive user interfaces with a component-based architecture.",
      icon: Code
    },
    {
      title: "Tailwind CSS",
      description: "A utility-first CSS framework that allows for rapid UI development and a premium, responsive design.",
      icon: Layers
    },
    {
      title: "dnd-kit",
      description: "A lightweight, modular, and accessible drag-and-drop toolkit for React that powers our Kanban board.",
      icon: MousePointer2
    }
  ];

  const features = [
    {
      title: "Local Privacy",
      description: "No servers, no tracking. Your data stays with you.",
      icon: Lock
    },
    {
      title: "Offline Ready",
      description: "Manage your workflow anytime, anywhere.",
      icon: CloudOff
    },
    {
      title: "Zero Latency",
      description: "Instant updates thanks to direct browser storage.",
      icon: Database
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <Navbar onLogout={handleLogout} title="About TaskFlow" />

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">
        {/* Hero Section */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
              <Heart className="w-8 h-8 text-pink-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Modern Task Management</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              TaskFlow is a high-performance Kanban board inspired by professional tools like Trello,
              but simplified for personal speed and absolute privacy through Local Storage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-lg bg-pink-50 border border-pink-100 hover:shadow-md transition">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-100 rounded-full mb-4">
                    <IconComponent className="w-6 h-6 text-pink-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How it Works / Tech Stack */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Technically optimized for the best browser experience</p>
          </div>

          <div className="space-y-6">
            {techStack.map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <div key={index} className="flex flex-col md:flex-row gap-4 p-6 border rounded-xl hover:bg-gray-50 transition border-gray-100">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{tech.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{tech.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <HelpCircle className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Questions</h2>
            <p className="text-gray-600">Everything you need to know about your local data</p>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === faq.id ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 pb-4 bg-gray-50 border-t border-gray-100 pt-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer info */}
        <section className="bg-pink-500 rounded-xl p-8 text-center text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Ready to be Productive?</h2>
          <p className="text-pink-100 mb-8 max-w-md mx-auto">
            Start organizing your tasks with a modern board that respects your privacy and works as fast as you do.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white text-pink-600 px-8 py-3 rounded-full font-bold hover:bg-pink-50 transition shadow-lg"
          >
            Go to Dashboard
          </button>

          <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-center gap-4 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4" />
              <span>Tailored with ❤️ in Kigali, Rwanda</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
