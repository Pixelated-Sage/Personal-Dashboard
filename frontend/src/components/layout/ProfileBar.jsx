import React from "react";

const ProfileBar = () => {
  return (
    <div className="fixed top-2 right-2 z-40 w-64 h-[98vh] bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 flex flex-col items-center p-6">
      <div className="w-20 h-20 rounded-full bg-cyan-200 mb-4 flex items-center justify-center text-3xl font-bold text-cyan-700">
        {/* Placeholder for profile image or initials */}
        AB
      </div>
      <div className="text-center">
        <div className="font-semibold text-gray-800">Abhi</div>
        <div className="text-sm text-gray-500 mb-4">Your Role</div>
      </div>
      {/* Add more profile-related components here */}
      <div className="mt-6 w-full">
        {/* Placeholder for future widgets */}
      </div>
    </div>
  );
};

export default ProfileBar;