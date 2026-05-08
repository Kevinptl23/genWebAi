import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LoginModel } from "../components/LoginModel.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Coins } from "lucide-react";
import axios from "axios";
import { setUserData } from "../redux/userSlice.js";
import { Navigate, useNavigate } from "react-router-dom";
import { WebsiteContent } from "../components/dashboard/WebsiteContent.jsx";

const Home = () => {
  const highlights = [
    "AI-Powered Code Generation",
    "Fully Responsive Across All Devices",
    "Production-Ready Scalable Output",
  ];
  
  const [openLogin, setOpenLogin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("userData: ", userData);

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
      <div className="relative min-h-screen bg-[#040404] text-white overflow-hidden">
        <motion.div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-lg font-semibold">GenWeb.ai</div>
            <div className="flex items-center gap-5">
              <div className="hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer" onClick={() => navigate('/price')}>
                Pricing {openLogin}
              </div>
              {userData && (
                <div className=" flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10 transition">
                  <Coins size={14} className=" text-yellow-400" />
                  <span className=" text-zinc-300">Credits</span>
                  <span>{userData.user.credits}</span>
                  <span className="font-semibold">+</span>
                </div>
              )}
              
              {!userData ? (
                <button
                  onClick={() => setOpenLogin(true)}
                  className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm"
                >
                  Get Started
                </button>
              ) : (
                <div className="relative">
                  <button
                    className="flex items-center"
                    onClick={() => setOpenProfile(true)}
                  >
                    <img
                      src={
                        userData?.user?.avatar ||
                        `https://ui-avatars.com/api/?name=${userData?.user?.name}`
                      }
                      alt="user avatar"
                      className="w-9 h-9 rounded-full object-cover border border-white/20 shadow-md hover:scale-105 transition"
                    />
                  </button>

                  <AnimatePresence>
                    {openProfile && (
                      <>
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className="absolute right-0 mt-6 w-60 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden"
                        >
                          {/* User Info */}
                          <div
                            className="px-4 py-3 border-b border-white/10"
                            onClick={() => setOpenProfile(false)}
                          >
                            <p className="text-sm font-medium truncate">
                              {userData?.user?.name}
                            </p>
                            <p className="text-xs text-zinc-500 truncate">
                              {userData?.user?.email}
                            </p>
                          </div>
                          {/* Coins (Mobile Only) */}
                          <div className="px-4 py-3 border-b border-white/10 md:hidden">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10 transition w-full justify-between">
                                <div className="flex items-center gap-2">
                                  <Coins
                                    size={14}
                                    className="text-yellow-400"
                                  />
                                  <span className="text-zinc-300">Credits</span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span>{userData?.credits}</span>
                                  <span className="font-semibold">+</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Dashboard Button */}
                          <button
                            className="w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition"
                            onClick={() => {
                              setOpenProfile(false);
                              navigate("/dashboard");
                            }}
                          >
                            Dashboard
                          </button>

                          {/* Logout Button */}
                          <button
                            className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition border-t border-white/10"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </motion.div>
        <section className="pt-44 pb-32 px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            Build Stunning Websites <br />
            <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              with AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-2xl mx-auto text-zinc-400 text-lg"
          >
            Describe your idea and let AI generate a modern, responsive,
            production-ready website.
          </motion.p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition mt-12"
          >
            {userData ? "Go to dashboard" : "Get Started"}
          </button>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-white/5 border border-white/10 p-8"
              >
                <h1 className="text-xl font-semibold mb-3">{h}</h1>
                <p className="text-sm text-zinc-400">
                  GenWeb.ai builds real websites — clean code, animations,
                  responsiveness and scalable structure.
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {userData && (
          <div>
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-7xl mx-auto px-6 pb-5"
            >
              <h1 className="text-3xl font-bold">
                Your Websites
              </h1>
            </motion.div>
            <WebsiteContent />
          </div>
        )}
        <footer className="border-t border-white/10 py-10 text-center text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} GenWeb.ai
        </footer>
        {openLogin && (
          <LoginModel open={openLogin} onClose={() => setOpenLogin(false)} />
        )}
      </div>
    </>
  );
};

export default Home;
