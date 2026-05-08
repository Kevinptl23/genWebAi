import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PricingCard from "./PricingCard";
import { ArrowLeft } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

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

  //const stripePromise = loadStripe("YOUR_PUBLISHABLE_KEY");

  // const handlePayment = async (plan) => {
//   try {
//     const res = await axios.post(
//       "http://localhost:8080/api/payment/create-checkout-session",
//       { plan }
//     );

//     const stripe = await stripePromise;
//     window.location.href = res.data.url;
//   } catch (error) {
//     console.error(error);
//   }
// };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      {/* Back Button */}
      <div
        className="flex items-center gap-3 cursor-pointer group ml-10"
        onClick={() => navigate("/")}
      >
        <ArrowLeft
          size={20}
          className="text-zinc-400 group-hover:text-white transition"
        />
        <span className="text-lg font-semibold text-white">Home</span>
      </div>

      {/* Heading */}
      <div className="text-center mb-14 mt-10">
        <h1 className="text-4xl md:text-5xl font-bold">
          Simple, transparent pricing
        </h1>
        <p className="text-gray-400 mt-3">Buy credits once. Build anytime.</p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            selected={selectedPlan}
            onSelect={setSelectedPlan}
          />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
