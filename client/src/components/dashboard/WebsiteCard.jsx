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
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25 }}
      className="bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 cursor-pointer"
      onClick={handleOpenEditor}
    >
      {/* Preview */}
      <div className="h-48 bg-black overflow-hidden rounded-t-2xl">
        <iframe
          title="website-preview"
          srcDoc={website.latestCode}
          sandbox="allow-scripts"
          loading="lazy"
          className="w-[140%] h-[140%] scale-[0.7] origin-top-left border-none pointer-events-none"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-white text-sm mb-2 line-clamp-2">{website.prompt}</p>

        <p className="text-zinc-400 text-xs mb-4">
          Last updated {new Date(website.updatedAt).toLocaleDateString()}
        </p>

        <button
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenEditor();
          }}
        >
          <Rocket size={16} />
          View in details
        </button>
      </div>
    </motion.div>
  );
};

export default WebsiteCard;
