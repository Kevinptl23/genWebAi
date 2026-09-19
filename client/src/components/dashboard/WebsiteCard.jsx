import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Rocket } from "lucide-react";

const WebsiteCard = ({ website }) => {
  const navigate = useNavigate();

  const handleOpenEditor = () => {
    navigate(`/editor/${website._id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-300/90 transition-all cursor-pointer flex flex-col justify-between"
      onClick={handleOpenEditor}
    >
      {/* Preview Container */}
      <div className="h-48 bg-slate-100 overflow-hidden rounded-t-2xl border-b border-slate-100 relative">
        <iframe
          title="website-preview"
          srcDoc={website.latestCode}
          sandbox="allow-scripts"
          loading="lazy"
          className="w-[140%] h-[140%] scale-[0.7] origin-top-left border-none pointer-events-none"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-slate-900 font-bold text-base mb-1 line-clamp-1">
            {website.title || "Untitled Website"}
          </h3>
          <p className="text-slate-500 text-xs mb-4">
            Updated {new Date(website.updatedAt).toLocaleDateString()}
          </p>
        </div>

        <button
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white font-semibold text-sm transition-all duration-200 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenEditor();
          }}
        >
          <Rocket size={15} />
          <span>Open Editor</span>
        </button>
      </div>
    </motion.div>
  );
};

export default WebsiteCard;
