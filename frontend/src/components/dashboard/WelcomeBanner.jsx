import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const WelcomeBanner = () => {
  const [quote, setQuote] = useState("");
  const [datetime, setDatetime] = useState(new Date());

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await axios.get("http://localhost:8000/quotes/");
        if (res.data.length > 0) {
          setQuote(res.data[0].content);
        }
      } catch (err) {
        console.error("Failed to fetch quote:", err);
      }
    };
    fetchQuote();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setDatetime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = datetime.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = datetime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <motion.div
      className="bg-white/70 border border-gray-200 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-xl w-full space-y-4 text-gray-800"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {formattedDate} • {formattedTime}
          </p>
        </div>
        <div className="text-sm text-right text-gray-500 mt-4 md:mt-0">
          <p className="font-semibold">PersonalDash v0.1</p>
          <p>Release: July 2025</p>
        </div>
      </div>

      {quote && (
        <div className="mt-4 border-l-4 border-blue-400 pl-4 text-sm italic text-gray-700">
          “{quote}”
        </div>
      )}
    </motion.div>
  );
};

export default WelcomeBanner;
