import React from "react";
import CertificateUploader from "../components/CertificateUploader";

const CertificatesPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Certificates</h1>
      <CertificateUploader />
    </div>
  );
};

export default CertificatesPage;
