import React from "react";
import { motion } from "framer-motion";

const PricingCard = ({ plan, selected, onSelect }) => {
  const isActive = selected === plan.name;

  return (
    <motion.div
      onClick={() => onSelect(plan.name)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 backdrop-blur-lg
      ${
        isActive
          ? "border-indigo-500 bg-gradient-to-b from-indigo-900/40 to-black shadow-xl scale-105"
          : "border-gray-800 bg-zinc-900/40"
      }`}
    >
      {plan.popular && (
        <span className="bg-indigo-600 text-xs px-3 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <h2 className="text-2xl font-semibold mt-3">{plan.name}</h2>
      <p className="text-gray-400 text-sm">{plan.desc}</p>

      <div className="mt-6">
        <h3 className="text-4xl font-bold">
          {plan.price}
          <span className="text-sm text-gray-400"> /one-time</span>
        </h3>
        <p className="text-yellow-400 mt-2">{plan.credits}</p>
      </div>

      <ul className="mt-6 space-y-3 text-gray-300">
        {plan.features.map((feature, i) => (
          <li key={i}>✓ {feature}</li>
        ))}
      </ul>

      <button
        // onClick={(e) => {
        //   e.stopPropagation();
        //   handlePayment(plan.name);
        // }}
        className={`w-full mt-8 py-3 rounded-lg font-medium transition
        ${
          isActive
            ? "bg-indigo-600 hover:bg-indigo-700"
            : "bg-gray-800 hover:bg-gray-700"
        }`}
      >
        {plan.button}
      </button>
    </motion.div>
  );
};

export default PricingCard;
