import React from "react";
import { motion } from "framer-motion";

const PricingCard = ({ plan, selected, onSelect, onAction }) => {
  const isActive = selected === plan.name;

  return (
    <motion.div
      onClick={() => onSelect(plan.name)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative cursor-pointer rounded-3xl p-8 border transition-all duration-300 backdrop-blur-md flex flex-col justify-between
      ${
        isActive
          ? "border-indigo-500/80 bg-white shadow-2xl shadow-indigo-500/15 scale-105 ring-2 ring-indigo-500/20"
          : "border-slate-200 bg-white/80 hover:border-slate-300 shadow-sm hover:shadow-md"
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3.5 right-6 bg-linear-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-md shadow-indigo-500/25">
          Most Popular
        </span>
      )}

      <div>
        <h2 className="text-2xl font-bold text-slate-900 mt-1">{plan.name}</h2>
        <p className="text-slate-500 text-sm mt-1">{plan.desc}</p>

        <div className="mt-6">
          <h3 className="text-4xl font-extrabold text-slate-900">
            {plan.price}
            <span className="text-sm font-normal text-slate-500"> /one-time</span>
          </h3>
          <p className="text-indigo-600 font-semibold text-sm mt-2">{plan.credits}</p>
        </div>

        <ul className="mt-6 space-y-3 text-slate-600 text-sm">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-indigo-600 font-bold">✓</span> {feature}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          if (onAction) onAction();
        }}
        className={`w-full mt-8 py-3.5 rounded-xl font-bold transition-all cursor-pointer text-sm shadow-xs
        ${
          isActive
            ? "bg-linear-to-r from-indigo-600 to-violet-600 text-white hover:shadow-indigo-500/30 hover:scale-[1.02] shadow-md shadow-indigo-500/20"
            : "bg-slate-100 text-slate-800 hover:bg-slate-200"
        }`}
      >
        {plan.button}
      </button>
    </motion.div>
  );
};

export default PricingCard;
