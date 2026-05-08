import { useState, useCallback, useRef } from "react";
import axios from "axios";

export const useWebsiteGenerator = (navigate) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [creditError, setCreditError] = useState("");

  const intervalRef = useRef(null);

  const startProgress = () => {
    setProgress(0);

    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 85) return p;
        return p + Math.random() * 6;
      });
    }, 400);
  };

  const stopProgress = () => {
    clearInterval(intervalRef.current);
    setProgress(100);
  };

  const generateWebsite = useCallback(async () => {
    if (!prompt.trim() || creditError) return;

    setLoading(true);
    setCreditError("");
    startProgress();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/website/generate",
        { userPrompt: prompt },
        { withCredentials: true }
      );

      stopProgress();

      setTimeout(() => {
        navigate(`/editor/${res.data.websiteId}`);
      }, 600);
    } catch (error) {
      clearInterval(intervalRef.current);
      setLoading(false);

      const message =
        error?.response?.data?.message ||
        "Something went wrong";

      // Detect credit error
      if (message.toLowerCase().includes("credit")) {
        setCreditError(
          "You don’t have enough credits to generate a website. Please add more credits to continue."
        );
      } else {
        setCreditError(message);
      }
    }
  }, [prompt, navigate, creditError]);

  return {
    prompt,
    setPrompt,
    generateWebsite,
    loading,
    progress,
    creditError,
  };
};