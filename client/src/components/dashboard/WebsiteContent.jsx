import React, { useState, useEffect } from "react";
import { ArrowLeft, Plus, Rocket } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";
import WebsiteCard from "./WebsiteCard.jsx";

export const WebsiteContent = () => {
  const navigate = useNavigate();
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

  const openEditor = (id) => {
    navigate(`/editor/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Greeting */}
      { 
        isDashboard ? 
          <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <p className="text-sm text-zinc-400 mb-1">Welcome Back</p>
        <h1 className="text-3xl font-bold">{userData?.user?.name || "User"}</h1>
          </motion.div> : ""
      } 

      {/* Websites Grid */}
      {websites.length === 0 ? (
        <div className="text-center mt-20 text-zinc-500">
          No websites yet. Create your first website 🚀
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
