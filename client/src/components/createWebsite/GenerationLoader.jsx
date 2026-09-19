const GenerationLoader = ({ progress }) => {
  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 w-full">
      <p className="text-slate-600 text-sm font-semibold mb-3 flex items-center justify-between">
        <span>Designing layout & architecture...</span>
        <span className="text-indigo-600 font-bold">{Math.floor(progress)}%</span>
      </p>

      <div className="h-3 bg-slate-200 rounded-full overflow-hidden p-0.5 shadow-inner">
        <div
          className="h-full bg-linear-to-r from-indigo-600 to-violet-600 rounded-full transition-all duration-300 shadow-sm"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-slate-500 mt-2 font-medium">
        <span>AI processing layout & assets</span>
        <span>Please wait...</span>
      </div>
    </div>
  );
};

export default GenerationLoader;