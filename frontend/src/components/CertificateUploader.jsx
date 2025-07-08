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
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="skill"
          value={formData.skill}
          onChange={handleChange}
          className="input"
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
          className="input"
          required
        />

        <input
          type="date"
          name="issued_date"
          value={formData.issued_date}
          onChange={handleChange}
          className="input"
          required
        />

        <input
          type="file"
          name="file"
          accept=".pdf,.jpg,.png"
          onChange={handleChange}
          className="input"
          required
        />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Upload Certificate
        </button>
      </form>

      <div>
        <h2 className="text-xl font-semibold mt-6">Uploaded Certificates</h2>
        <ul className="mt-3 space-y-2">
          {certs.map(cert => (
            <li key={cert.id} className="bg-gray-800 p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p><strong>Skill:</strong> {cert.skill}</p>
                  <p><strong>Issued By:</strong> {cert.issued_by}</p>
                  <p><strong>Date:</strong> {cert.issued_date}</p>
                </div>
                <a
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  View
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CertificateUploader;
