import { Send } from "lucide-react";

function Chat({ website, setPrompt, handleUpdate, prompt, creditError }) {
  console.log("website: ", website);
  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {website.conversation
          ?.reduce((acc, msg, index, arr) => {
            if (msg.role === "user") {
              acc.push(msg);

              const next = arr[index - 1];
              if (next && next.role === "ai") {
                acc.push(next);
              }
            }

            return acc;
          }, [])
          .map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] ${
                m.role === "user" ? "ml-auto" : "mr-auto"
              }`}
            >
              <div
                className={`px-4 py-2.5 rounded-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-white text-black"
                    : "bg-white/5 border border-white/10 text-zinc-200"
                }`}
              >
                {m.content === "typing" ? (
                  <div className="flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </div>
                ) : (
                  m.content
                )}
              </div>
            </div>
          ))}
      </div>

      <div className="p-3 border-t border-white/10">
        {creditError && (
          <div className="mx-3 mb-2 p-3 text-sm rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
            {creditError}
          </div>
        )}
        <div className="flex gap-2">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 rounded-2xl px-4 py-3 bg-white/5 border border-white/10"
            placeholder="Describe changes..."
          />

          <button
            className="px-4 py-3 rounded-2xl bg-white text-black"
            onClick={handleUpdate}
            disabled={creditError}
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
