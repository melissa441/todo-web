import React from "react";
import Navbar from "/src/components/Navbar";
import TaskBoard from "/src/components/TaskBoard";
import { AuthProvider, useAuth } from "/src/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

function DashboardContent() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out!");
    navigate("/login");
  };

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <TaskBoard />
      <Footer />
    </>
  );
}

function Dashboard() {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
}

export default Dashboard;
