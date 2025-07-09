import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSkills, getPlans, getCertificates } from "../services/api";
import DashboardCard from "../components/DashboardCard";
import ChartSection from "../components/ChartSection";

const DashboardPage = () => {
  const [skills, setSkills] = useState([]);
  const [plans, setPlans] = useState([]);
  const [certs, setCerts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const skillRes = await getSkills();
      const planRes = await getPlans();
      const certRes = await getCertificates();
      setSkills(skillRes.data);
      setPlans(planRes.data);
      setCerts(certRes.data);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0a192f] p-6 space-y-8">
      <h1 className="text-4xl font-extrabold text-cyan-400 tracking-tight drop-shadow-lg mb-6">
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Personal Dashboard
        </span>
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <DashboardCard title="Total Skills" count={skills.length} />
        <DashboardCard title="Plans This Week" count={plans.length} />
        <DashboardCard title="Certificates" count={certs.length} />
      </div>

      {/* Pie Chart Section */}
      <div className="bg-gradient-to-tr from-[#1e293b] to-[#0f172a] rounded-2xl shadow-xl p-6">
        <ChartSection skills={skills} />
      </div>

      {/* Recent Skills */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold text-cyan-300 tracking-wide">Recent Skills</h2>
          <button
            onClick={() => navigate("/skills")}
            className="bg-cyan-900/60 hover:bg-cyan-700/80 text-cyan-200 px-4 py-2 rounded-lg shadow transition-all duration-200 text-sm font-semibold border border-cyan-800"
          >
            Add Skill
          </button>
        </div>
        <ul className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] p-5 rounded-xl shadow-lg space-y-3 border border-cyan-900/30">
          {skills.slice(0, 3).map((s) => (
            <li key={s.id} className="flex justify-between items-center">
              <span className="font-medium text-cyan-100">{s.name}</span>
              <span className="text-xs px-2 py-1 rounded bg-cyan-900/60 text-cyan-300 uppercase tracking-wider">
                {s.Status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Plans */}
      <div>
        <div className="flex items-center justify-between mb-3 mt-8">
          <h2 className="text-2xl font-bold text-cyan-300 tracking-wide">This Week's Plan</h2>
          <button
            onClick={() => navigate("/planner")}
            className="bg-cyan-900/60 hover:bg-cyan-700/80 text-cyan-200 px-4 py-2 rounded-lg shadow transition-all duration-200 text-sm font-semibold border border-cyan-800"
          >
            Add Task
          </button>
        </div>
        <ul className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] p-5 rounded-xl shadow-lg space-y-3 border border-cyan-900/30">
          {plans.slice(0, 3).map((p) => (
            <li key={p.id} className="flex items-center gap-3">
              <span className="text-xs text-cyan-400 bg-cyan-900/40 px-2 py-1 rounded">{p.Date}</span>
              <span className="text-cyan-100">{p.Text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Certificates */}
      <div>
        <div className="flex items-center justify-between mb-3 mt-8">
          <h2 className="text-2xl font-bold text-cyan-300 tracking-wide">Certificates</h2>
          <button
            onClick={() => navigate("/certificates")}
            className="bg-cyan-900/60 hover:bg-cyan-700/80 text-cyan-200 px-4 py-2 rounded-lg shadow transition-all duration-200 text-sm font-semibold border border-cyan-800"
          >
            Add Certificate
          </button>
        </div>
        <ul className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] p-5 rounded-xl shadow-lg space-y-3 border border-cyan-900/30">
          {certs.slice(0, 3).map((c) => (
            <li key={c.id} className="flex flex-col md:flex-row md:items-center md:justify-between">
              <span className="text-cyan-100 font-medium">{c.issued_by}</span>
              <span className="text-cyan-400 mx-2">•</span>
              <span className="text-cyan-200">{c.skill}</span>
              <span className="text-xs text-cyan-400 bg-cyan-900/40 px-2 py-1 rounded mt-1 md:mt-0">
                {c.issued_date}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
