import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PricingCard from "./PricingCard";
import { ArrowLeft } from "lucide-react";
import { LoginModel } from "../LoginModel.jsx";

const plans = [
  {
    name: "Free",
    price: "₹0",
    credits: "100 Credits",
    desc: "Perfect to explore GenWeb.ai",
    features: [
      "AI website generation",
      "Responsive HTML output",
      "Basic animations",
    ],
    button: "Get Started",
  },
  {
    name: "Pro",
    price: "₹499",
    credits: "500 Credits",
    desc: "For serious creators & freelancers",
    features: [
      "Everything in Free",
      "Faster generation",
      "Edit & regenerate",
      "Download source code",
    ],
    button: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "₹1499",
    credits: "1000 Credits",
    desc: "For teams & power users",
    features: [
      "Unlimited iterations",
      "Highest priority",
      "Team collaboration",
      "Dedicated support",
    ],
    button: "Contact Sales",
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("Pro");
  const [openLogin, setOpenLogin] = useState(false);
  const { userData } = useSelector((state) => state.user);

  const handlePlanAction = (planName) => {
    if (planName === "Free") {
      if (userData) {
        navigate("/create-website");
      } else {
        setOpenLogin(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-6 py-10 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-indigo-200/30 blur-[130px] pointer-events-none -z-10" />

      {/* Back Button */}
      <div
        className="max-w-6xl mx-auto flex items-center gap-3 cursor-pointer group mb-10"
        onClick={() => navigate("/")}
      >
        <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-200 transition">
          <ArrowLeft size={18} />
        </div>
        <span className="text-base font-semibold text-slate-700 group-hover:text-slate-900 transition">Back to Home</span>
      </div>

      {/* Heading */}
      <div className="text-center mb-14 mt-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          Simple, Transparent <span className="bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">Pricing</span>
        </h1>
        <p className="text-slate-600 text-lg mt-3 font-medium">Buy credits once. Build stunning websites anytime.</p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            selected={selectedPlan}
            onSelect={setSelectedPlan}
            onAction={() => handlePlanAction(plan.name)}
          />
        ))}
      </div>

      {openLogin && (
        <LoginModel open={openLogin} onClose={() => setOpenLogin(false)} />
      )}
    </div>
  );
};

export default Pricing;
