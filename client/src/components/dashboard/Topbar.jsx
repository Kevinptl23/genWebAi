import React from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Topbar = () => {
  const navigate = useNavigate();

  const openEditor = (id) => {
    navigate(`/editor/${id}`);
  };
  return (
    <div className="w-full border-b border-white/10 bg-[#0b0b0b] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <ArrowLeft
            size={20}
            className="text-zinc-400 group-hover:text-white transition"
          />
          <span className="text-lg font-semibold text-white">Dashboard</span>
        </div>

        <button
          onClick={() => navigate("/create-website")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:opacity-90 transition"
        >
          <Plus size={16} />
          Create Website
        </button>
      </div>
    </div>
  );
};
