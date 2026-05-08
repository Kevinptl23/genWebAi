import CreditError from "./CreditError";

const PromptInput = ({
  prompt,
  setPrompt,
  loading,
  onGenerate,
  creditError,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-10 px-4">

      {/* CREDIT ERROR MESSAGE */}
      <CreditError message={creditError} />

      <label className="text-zinc-300 text-sm mb-2 block">
        Describe your website
      </label>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={6}
        disabled={loading}
        placeholder="create a food delivery website with add to cart feature, animated, green theme"
        className="w-full bg-black border border-white/10 rounded-xl p-5 text-white outline-none focus:border-indigo-500 resize-none"
      />

      <div className="flex justify-center mt-8">
        <button
          onClick={onGenerate}
          disabled={loading || creditError}
          className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 transition text-white font-semibold disabled:opacity-40"
        >
          {loading ? "Generating website..." : "Generate Website"}
        </button>
      </div>
    </div>
  );
};

export default PromptInput;