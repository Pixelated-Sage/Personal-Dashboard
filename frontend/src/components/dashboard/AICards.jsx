import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const tips = [
  "Break down your goals into small daily actions.",
  "Consistency beats intensity. Just show up.",
  "Don’t wait for motivation. Build habits.",
  "What you do today shapes your tomorrow.",
  "Discipline > Motivation.",
  "Celebrate your small wins.",
  "Track. Reflect. Improve.",
];

const AICards = () => {
  const [tip, setTip] = useState("");

  useEffect(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  }, []);

  return (
    <motion.div
      className="bg-white/70 backdrop-blur-lg border border-gray-300 p-6 rounded-2xl shadow-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-2">AI Suggestion</h2>
      <p className="text-gray-700 text-sm italic">“{tip}”</p>
    </motion.div>
  );
};

export default AICards;
