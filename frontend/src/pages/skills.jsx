import React from "react";
import SkillForm from "../components/SkillForm";
import SkillList from "../components/SkillList";

const SkillsPage = () => {
  const [reload, setReload] = React.useState(false);

  const handleSkillAdded = () => {
    setReload(!reload); // trigger reload on SkillList
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Skill Management</h1>
      <SkillForm onSkillAdded={handleSkillAdded} />
      <SkillList key={reload} />
    </div>
  );
};

export default SkillsPage;
