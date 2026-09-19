import CreditError from "./CreditError";

const PromptInput = ({
  prompt,
  setPrompt,
  loading,
  onGenerate,
  creditError,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4">

      {/* CREDIT ERROR MESSAGE */}
      <CreditError message={creditError} />

      <label className="text-slate-700 text-sm font-semibold mb-2.5 block">
        Describe your website concept
      </label>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={5}
        disabled={loading}
        placeholder="e.g. Create a sleek modern food delivery platform with hero section, menu cards, customer reviews, and vibrant green theme"
        className="w-full bg-white border border-slate-300/80 rounded-2xl p-5 text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-xs resize-none transition-all"
      />

      <div className="flex justify-center mt-8">
        <button
          onClick={onGenerate}
          disabled={loading || creditError}
          className="px-8 py-4 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 transition-all text-white font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-base"
        >
          {loading ? "Generating Website with AI..." : "Generate Website ✨"}
        </button>
      </div>
    </div>
  );
};

export default PromptInput;