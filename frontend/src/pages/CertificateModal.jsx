import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const CertificateModal = ({ cert, onClose }) => {
  if (!cert) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white text-gray-900 max-w-md w-full mx-4 p-6 rounded-2xl shadow-xl relative"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
          <h2 className="text-xl font-semibold mb-2">{cert.skill}</h2>
          <p className="mb-1"><strong>Issued By:</strong> {cert.issued_by}</p>
          <p><strong>Date:</strong> {cert.issued_date}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CertificateModal;
