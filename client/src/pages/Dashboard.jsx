import React from "react";
import { WebsiteContent } from "../components/dashboard/WebsiteContent.jsx";
import { Topbar } from "../components/dashboard/Topbar.jsx";

export const Dashboard = () => {

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* TopBar */}
      <Topbar/>

      {/* Content */}
      <WebsiteContent/>
    </div>
  );
};
