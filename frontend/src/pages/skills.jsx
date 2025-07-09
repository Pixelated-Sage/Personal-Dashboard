import React from "react";
import SkillForm from "../components/SkillForm";
import SkillList from "../components/SkillList";

const SkillsPage = () => {
  const [reload, setReload] = React.useState(false);

  const handleSkillAdded = () => {
    setReload(!reload); // trigger reload on SkillList
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0a192f] p-6 space-y-8">
      <h1 className="text-3xl font-extrabold text-cyan-400 tracking-tight drop-shadow-lg mb-6">
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Skill Management
        </span>
      </h1>
      <div className="bg-gradient-to-tr from-[#1e293b] to-[#0f172a] rounded-2xl shadow-xl p-6 max-w-xl mx-auto mb-8">
        <SkillForm onSkillAdded={handleSkillAdded} />
      </div>
      <SkillList key={reload} />
    </div>
  );
};

export default SkillsPage;
