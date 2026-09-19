import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import { X, Sparkles } from "lucide-react";

export const LoginModel = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const data = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/auth/google`,
        {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        },
        { withCredentials: true }
      );

      dispatch(setUserData(data.data));

      if (onClose) onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md rounded-3xl bg-white border border-slate-200/90 shadow-2xl overflow-hidden p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Ambient Accents */}
            <div className="absolute -top-24 -left-24 w-60 h-60 bg-indigo-200/40 blur-[90px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-purple-200/30 blur-[90px] pointer-events-none" />

            <button
              className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition flex items-center justify-center cursor-pointer"
              onClick={onClose}
            >
              <X size={18} />
            </button>

            <div className="relative text-center pt-4 pb-2">
              <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700">
                <Sparkles size={13} className="text-indigo-600" />
                <span>AI-Powered Website Builder</span>
              </div>

              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight mb-2">
                Welcome to{" "}
                <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  GenWeb.ai
                </span>
              </h2>

              <p className="text-sm text-slate-500 mb-8">
                Sign in to build, edit, and publish AI websites in seconds.
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={loginWithGoogle}
                className="w-full py-3.5 px-4 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold shadow-sm hover:shadow-md hover:border-slate-400 transition flex items-center justify-center gap-3 cursor-pointer"
              >
                <img
                  src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                  alt="Google"
                  className="h-5 w-5"
                />
                <span>Continue with Google</span>
              </motion.button>

              <div className="flex items-center gap-4 my-8">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400 font-medium tracking-wide">
                  SECURE GOOGLE AUTH
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                By continuing, you agree to our{" "}
                <span className="font-medium text-slate-700 underline cursor-pointer hover:text-indigo-600">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="font-medium text-slate-700 underline cursor-pointer hover:text-indigo-600">
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
