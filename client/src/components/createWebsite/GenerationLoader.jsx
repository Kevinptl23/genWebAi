const GenerationLoader = ({ progress }) => {
  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <p className="text-zinc-400 mb-2">
        Designing layout & structure...
      </p>

      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-zinc-500 mt-2">
        <span>Estimated time remaining: 8–12 minutes </span> &nbsp; 
        <span>{ Math.floor(progress)} %</span>
      </div>
    </div>
  );
};

export default GenerationLoader;