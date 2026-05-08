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
    <div className="min-h-screen bg-black flex flex-col justify-center">
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