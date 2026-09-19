import React from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Topbar = () => {
  const navigate = useNavigate();


  return (
    <div className="w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition">
            <ArrowLeft size={18} />
          </div>
          <span className="text-lg font-bold text-slate-900">Dashboard</span>
        </div>

        <button
          onClick={() => navigate("/create-website")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Create Website</span>
        </button>
      </div>
    </div>
  );
};
