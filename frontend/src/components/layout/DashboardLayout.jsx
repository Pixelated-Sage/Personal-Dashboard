import React from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileBar from "./ProfileBar";

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800">
      {/* Floating Sidebar */}
      <aside className="fixed top-2 left-2 z-40 w-64 h-[98vh] bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8 tracking-tight text-gray-800">PersonalDash</h2>
        <nav className="flex flex-col gap-4">
          <Link
            to="/"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 font-medium transition-all hover:bg-white/80 hover:shadow ${
              location.pathname === "/" ? "bg-cyan-600 text-white shadow" : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/vault"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 font-medium transition-all hover:bg-white/80 hover:shadow ${
              location.pathname === "/vault" ? "bg-cyan-600 text-white shadow" : ""
            }`}
          >
            Vault
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto justify-center ">{children}</main>

      {/* Floating Profile Bar */}
      <ProfileBar />
    </div>
  );
};

export default DashboardLayout;
