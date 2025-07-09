import React, { useState, useEffect } from "react";
import { getSkills, addCertificate, getCertificates } from "../services/api";

const CertificateUploader = () => {
  const [formData, setFormData] = useState({
    skill: "",
    issued_by: "",
    issued_date: "",
    file: null,
  });
  const [certs, setCerts] = useState([]);
  const [skills, setSkills] = useState([]);

  const fetchSkillsAndCerts = async () => {
    const skillRes = await getSkills();
    setSkills(skillRes.data);

    const certRes = await getCertificates();
    setCerts(certRes.data);
  };

  useEffect(() => {
    fetchSkillsAndCerts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("skill", formData.skill);
    data.append("issued_by", formData.issued_by);
    data.append("issued_date", formData.issued_date);
    data.append("file", formData.file);

    try {
      await addCertificate(data);
      setFormData({
        skill: "",
        issued_by: "",
        issued_date: "",
        file: null,
      });
      fetchSkillsAndCerts();
    } catch (err) {
      console.error("Error uploading certificate:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0a192f] p-6 space-y-8">
      <h1 className="text-3xl font-extrabold text-cyan-400 tracking-tight drop-shadow-lg mb-6">
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Certificates
        </span>
      </h1>

      <div className="bg-gradient-to-tr from-[#1e293b] to-[#0f172a] rounded-2xl shadow-xl p-6 max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="skill"
            value={formData.skill}
            onChange={handleChange}
            className="input w-full bg-[#0f172a] border border-cyan-900/30 text-cyan-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          >
            <option value="">Select Skill</option>
            {skills.map(skill => (
              <option key={skill.id} value={skill.id}>
                {skill.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="issued_by"
            value={formData.issued_by}
            onChange={handleChange}
            placeholder="Issued By"
            className="input w-full bg-[#0f172a] border border-cyan-900/30 text-cyan-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />

          <input
            type="date"
            name="issued_date"
            value={formData.issued_date}
            onChange={handleChange}
            className="input w-full bg-[#0f172a] border border-cyan-900/30 text-cyan-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />

          <input
            type="file"
            name="file"
            accept=".pdf,.jpg,.png"
            onChange={handleChange}
            className="input w-full bg-[#0f172a] border border-cyan-900/30 text-cyan-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />

          <button
            type="submit"
            className="bg-cyan-900/60 hover:bg-cyan-700/80 text-cyan-200 px-4 py-2 rounded-lg shadow transition-all duration-200 text-sm font-semibold border border-cyan-800 w-full"
          >
            Upload Certificate
          </button>
        </form>
      </div>

      <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] p-6 rounded-2xl shadow-lg max-w-2xl mx-auto border border-cyan-900/30">
        <h2 className="text-2xl font-bold text-cyan-300 tracking-wide mb-4">Uploaded Certificates</h2>
        <ul className="space-y-3">
          {certs.map(cert => (
            <li key={cert.id} className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-800/80 p-4 rounded-xl shadow border border-cyan-900/20">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="text-cyan-100 font-medium">{cert.issued_by}</span>
                <span className="text-cyan-400 mx-2 hidden md:inline">•</span>
                <span className="text-cyan-200">{cert.skill}</span>
                <span className="text-xs text-cyan-400 bg-cyan-900/40 px-2 py-1 rounded mt-1 md:mt-0">
                  {cert.issued_date}
                </span>
              </div>
              <a
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline mt-2 md:mt-0"
              >
                View
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CertificateUploader;
