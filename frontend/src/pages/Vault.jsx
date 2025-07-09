import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CertificateModal from "./CertificateModal";

const VaultPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);

  const fetchCertificates = async () => {
    try {
      const res = await axios.get("http://localhost:8000/certificates/");
      setCertificates(res.data);
    } catch (err) {
      console.error("Failed to load certificates", err);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Vault</h2>
      <p className="text-sm text-gray-500">Your trusted certificate storage</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 border border-gray-200 rounded-xl shadow-lg p-4 relative backdrop-blur-md"
          >
            <h3 className="text-lg font-semibold text-gray-800">{cert.skill}</h3>
            <p className="text-sm text-gray-500">Issued by: {cert.issued_by}</p>
            <p className="text-xs mt-2 text-gray-400">Date: {cert.issued_date}</p>

            <button
              onClick={() => setSelectedCert(cert)}
              className="absolute top-4 right-4 text-sm text-cyan-600 hover:underline"
            >
              View
            </button>
          </motion.div>
        ))}
      </div>

      {selectedCert && (
        <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </div>
  );
};

export default VaultPage;
