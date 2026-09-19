import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header({ website }) {
  const navigate = useNavigate();

  return (
    <div className="h-14 px-4 flex items-center justify-between border-b border-slate-200/80 bg-white">
      <div className="flex items-center gap-2.5 overflow-hidden">
        <button 
          onClick={() => navigate('/dashboard')}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition cursor-pointer"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="font-bold text-slate-900 truncate text-sm">{website.title || "Untitled Website"}</span>
      </div>
    </div>
  );
}

export default Header;