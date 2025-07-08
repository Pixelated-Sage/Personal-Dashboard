import React, { useEffect, useState } from "react";
import { getSkills, getPlans, getCertificates } from "../services/api";
import DashboardCard from "../components/DashboardCard";
import ChartSection from "../components/ChartSection";

const DashboardPage = () => {
  const [skills, setSkills] = useState([]);
  const [plans, setPlans] = useState([]);
  const [certs, setCerts] = useState([]);

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
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <DashboardCard title="Total Skills" count={skills.length} />
        <DashboardCard title="Plans This Week" count={plans.length} />
        <DashboardCard title="Certificates" count={certs.length} />
      </div>

      {/* Pie Chart Section */}
      <ChartSection skills={skills} />

      {/* Recent Skills */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Recent Skills</h2>
        <ul className="bg-gray-900 p-4 rounded space-y-2">
          {skills.slice(0, 3).map((s) => (
            <li key={s.id} className="flex justify-between">
              <span>{s.name}</span>
              <span className="text-sm text-gray-400">{s.Status}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Plans */}
      <div>
        <h2 className="text-xl font-semibold text-white mt-6 mb-2">This Week's Plan</h2>
        <ul className="bg-gray-900 p-4 rounded space-y-2">
          {plans.slice(0, 3).map((p) => (
            <li key={p.id}>
              <span className="text-sm text-gray-400">{p.Date}</span> – {p.Text}
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Certificates */}
      <div>
        <h2 className="text-xl font-semibold text-white mt-6 mb-2">Certificates</h2>
        <ul className="bg-gray-900 p-4 rounded space-y-2">
          {certs.slice(0, 3).map((c) => (
            <li key={c.id}>
              {c.issued_by} – {c.skill} – <span className="text-sm text-gray-400">{c.issued_date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
