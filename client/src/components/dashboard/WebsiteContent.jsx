import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";
import WebsiteCard from "./WebsiteCard.jsx";

export const WebsiteContent = () => {
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";

  const { userData } = useSelector((state) => state.user);
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/website/get-all`,
          { withCredentials: true },
        );
        setWebsites(res.data || []);
      } catch (error) {
        console.log("Error in Dashboard:", error);
      }
    };

    fetchWebsites();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Greeting */}
      {isDashboard && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-sm font-medium text-slate-500 mb-1">Welcome Back 👋</p>
          <h1 className="text-4xl font-extrabold text-slate-900">{userData?.user?.name || "User"}</h1>
        </motion.div>
      )} 

      {/* Websites Grid */}
      {websites.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 shadow-xs text-slate-500">
          <p className="text-lg font-medium text-slate-700 mb-2">No websites yet</p>
          <p className="text-sm text-slate-500">Create your first website to get started 🚀</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {websites.map((site) => (
            <WebsiteCard website={site} key={site._id} />
          ))}
        </div>
      )}
    </div>
  );
};
