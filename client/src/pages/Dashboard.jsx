import React, { useState, useEffect } from "react";
import { ArrowLeft, Plus, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";
import { WebsiteContent } from "../components/dashboard/WebsiteContent.jsx";
import { Topbar } from "../components/dashboard/Topbar.jsx";

export const Dashboard = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* TopBar */}
      <Topbar/>

      {/* Content */}
      <WebsiteContent/>
    </div>
  );
};
