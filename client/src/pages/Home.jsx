import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoginModel } from "../components/LoginModel.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Coins, Sparkles, ArrowRight, Code, Smartphone, Zap } from "lucide-react";
import axios from "axios";
import { setUserData } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import { WebsiteContent } from "../components/dashboard/WebsiteContent.jsx";

const Home = () => {
  const highlights = [
    {
      title: "AI-Powered Code Generation",
      desc: "GenWeb.ai builds real production HTML, CSS, and JS with clean structures and instant live previews.",
      icon: Code,
    },
    {
      title: "Fully Responsive Layouts",
      desc: "Every website automatically adapts perfectly across mobile, tablet, and desktop screens.",
      icon: Smartphone,
    },
    {
      title: "Instant One-Click Deploy",
      desc: "Publish your website directly to live cloud servers with custom links in seconds.",
      icon: Zap,
    },
  ];
  
  const [openLogin, setOpenLogin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
      await axios.get(`${API_URL}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      setOpenProfile(false);
    } catch (error) {
      console.log("Error in handleLogOut: ", error);
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
        {/* Background Glow Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-linear-to-tr from-indigo-300/30 via-purple-300/20 to-pink-200/20 blur-[130px] pointer-events-none -z-10" />
        <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-indigo-200/30 blur-[140px] pointer-events-none -z-10" />

        {/* Navbar */}
        <motion.div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/80 shadow-xs">
          <div className="max-w-7xl mx-auto px-6 py-3.5 flex justify-between items-center">
            <div 
              className="text-xl font-extrabold tracking-tight cursor-pointer flex items-center gap-2"
              onClick={() => navigate('/')}
            >
              <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/30">
                G
              </div>
              <span className="bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                GenWeb.ai
              </span>
            </div>

            <div className="flex items-center gap-5">
              <div 
                className="hidden md:inline text-sm font-medium text-slate-600 hover:text-indigo-600 transition cursor-pointer" 
                onClick={() => navigate('/price')}
              >
                Pricing
              </div>

              {userData?.user && (
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-sm text-amber-700 font-medium">
                  <Coins size={15} className="text-amber-500" />
                  <span>Credits:</span>
                  <span className="font-bold">{userData?.user?.credits}</span>
                </div>
              )}
              
              {!userData?.user ? (
                <button
                  onClick={() => setOpenLogin(true)}
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition text-sm font-medium shadow-sm hover:shadow-md cursor-pointer"
                >
                  Get Started
                </button>
              ) : (
                <div className="relative">
                  <button
                    className="flex items-center gap-2 p-1 rounded-full border border-slate-200 bg-white hover:border-indigo-300 transition shadow-xs cursor-pointer"
                    onClick={() => setOpenProfile(!openProfile)}
                  >
                    <img
                      src={
                        userData?.user?.avatar ||
                        `https://ui-avatars.com/api/?name=${userData?.user?.name}&background=6366f1&color=fff`
                      }
                      alt="user avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </button>

                  <AnimatePresence>
                    {openProfile && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-64 z-50 rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden text-slate-800"
                      >
                        {/* User Info */}
                        <div
                          className="px-4 py-3 border-b border-slate-100 bg-slate-50/50"
                          onClick={() => setOpenProfile(false)}
                        >
                          <p className="text-sm font-semibold truncate text-slate-900">
                            {userData?.user?.name}
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            {userData?.user?.email}
                          </p>
                        </div>

                        {/* Dashboard Button */}
                        <button
                          className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-slate-50 transition text-slate-700 flex items-center gap-2"
                          onClick={() => {
                            setOpenProfile(false);
                            navigate("/dashboard");
                          }}
                        >
                          Dashboard
                        </button>

                        {/* Logout Button */}
                        <button
                          className="w-full text-left px-4 py-3 text-sm font-medium text-rose-600 hover:bg-rose-50 transition border-t border-slate-100 flex items-center gap-2"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Hero Section */}
        <section className="pt-40 pb-24 px-6 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700 mb-8 shadow-xs"
          >
            <Sparkles size={14} className="text-indigo-600" />
            <span>Next-Gen AI Website Builder 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]"
          >
            Build Production Websites <br />
            <span className="bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              In Seconds with AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 max-w-2xl mx-auto text-slate-600 text-lg md:text-xl leading-relaxed"
          >
            Describe your idea and watch AI design, code, and deploy a responsive, production-ready website tailored to your needs.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => {
                if (userData?.user) {
                  navigate("/dashboard");
                } else {
                  setOpenLogin(true);
                }
              }}
              className="px-8 py-4 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2.5 cursor-pointer text-base"
            >
              <span>{userData?.user ? "Go to Dashboard" : "Get Started Free"}</span>
              <ArrowRight size={18} />
            </button>
          </motion.div>
        </section>

        {/* Highlights Cards */}
        <section className="max-w-7xl mx-auto px-6 pb-28">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {highlights.map((h, i) => {
              const IconComp = h.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 p-8 shadow-xs hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-6">
                    <IconComp size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{h.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {h.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* User Websites Section - Only visible when logged in */}
        {userData?.user && (
          <div className="bg-white/60 border-t border-slate-200/80 py-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-7xl mx-auto px-6 mb-8"
            >
              <h2 className="text-3xl font-extrabold text-slate-900">
                Your Websites
              </h2>
            </motion.div>
            <WebsiteContent />
          </div>
        )}

        {/* Footer */}
        <footer className="border-t border-slate-200/80 bg-white/80 py-8 text-center text-sm text-slate-500 font-medium">
          &copy; {new Date().getFullYear()} GenWeb.ai — All rights reserved.
        </footer>

        {openLogin && (
          <LoginModel open={openLogin} onClose={() => setOpenLogin(false)} />
        )}
      </div>
    </>
  );
};

export default Home;
