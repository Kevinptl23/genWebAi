import { useNavigate } from "react-router-dom";
import HeroSection from "../components/createWebsite/HeroSection";
import PromptInput from "../components/createWebsite/PromptInput";
import GenerationLoader from "../components/createWebsite/GenerationLoader";
import { useWebsiteGenerator } from "../hoocks/useWebsiteGenerator.js";

const CreateWebsitePage = () => {
  const navigate = useNavigate();

  const {
    prompt,
    setPrompt,
    generateWebsite,
    loading,
    progress,
    creditError,
  } = useWebsiteGenerator(navigate);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center relative overflow-hidden font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-200/30 blur-[140px] pointer-events-none -z-10" />
      <HeroSection />

      <PromptInput
        prompt={prompt}
        setPrompt={setPrompt}
        loading={loading}
        onGenerate={generateWebsite}
        creditError={creditError}
      />

      {loading && <GenerationLoader progress={progress} />}
    </div>
  );
};

export default CreateWebsitePage;