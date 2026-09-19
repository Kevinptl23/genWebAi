import { Send } from "lucide-react";

function Chat({ website, setPrompt, handleUpdate, prompt, creditError }) {
  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50/50">
        {website?.conversation?.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] ${
              m.role === "user" ? "ml-auto" : "mr-auto"
            }`}
          >
            <div
              className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-xs ${
                m.role === "user"
                  ? "bg-linear-to-r from-indigo-600 to-violet-600 text-white rounded-br-xs font-medium"
                  : "bg-white border border-slate-200/90 text-slate-800 rounded-bl-xs"
              }`}
            >
              {m.content === "typing" ? (
                <div className="flex gap-1 py-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              ) : (
                m.content
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3.5 border-t border-slate-200 bg-white">
        {creditError && (
          <div className="mb-3 p-3 text-xs rounded-xl bg-rose-50 border border-rose-200 text-rose-600 font-medium">
            {creditError}
          </div>
        )}
        <div className="flex gap-2">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
            className="flex-1 rounded-2xl px-4 py-3 bg-slate-100 border border-slate-200/80 text-slate-900 text-sm placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white transition"
            placeholder="Describe website changes..."
          />

          <button
            className="px-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-xs hover:shadow-md transition cursor-pointer flex items-center justify-center disabled:opacity-50"
            onClick={handleUpdate}
            disabled={creditError || !prompt.trim()}
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
