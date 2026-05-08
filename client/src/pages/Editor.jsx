import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Code2, Rocket, Monitor } from "lucide-react";
import MonacoEditor from "@monaco-editor/react";

import Chat from "../components/Editor/Chat.jsx";
import Header from "../components/Editor/Header.jsx";

export const Editor = () => {
  const { id } = useParams();
  const [website, setWebsite] = useState(null);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [prompt, setPrompt] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [creditError, setCreditError] = useState("");
  const iframeRef = useRef(null);

  const handleUpdate = async () => {
    if (!prompt.trim() || creditError) return;

    const userMessage = { role: "user", content: prompt };
    const typingMessage = { role: "ai", content: "typing" };

    setWebsite((prev) => ({
      ...prev,
      conversation: [...prev.conversation, userMessage, typingMessage],
    }));

    try {
      const result = await axios.post(
        `http://localhost:8080/api/website/update/${id}`,
        { prompt },
        { withCredentials: true },
      );

      const backendMessage = result?.data?.message || "";

      // detect credit error from backend
      if (backendMessage.toLowerCase().includes("credit")) {
        setCreditError(backendMessage);

        // remove typing dots
        setWebsite((prev) => ({
          ...prev,
          conversation: prev.conversation.filter(
            (msg) => msg.content !== "typing",
          ),
        }));

        return;
      }

      // normal AI response
      setWebsite((prev) => ({
        ...prev,
        conversation: prev.conversation.map((msg) =>
          msg.content === "typing"
            ? { role: "ai", content: backendMessage }
            : msg,
        ),
        latestCode: result.data.code,
      }));

      if (result.data.code) {
        setCode(result.data.code);
      }

      setPrompt("");
    } catch (error) {
      const backendMessage = error?.response?.data?.message || "";

      if (backendMessage.toLowerCase().includes("credit")) {
        setCreditError(backendMessage);
      }

      // remove typing dots
      setWebsite((prev) => ({
        ...prev,
        conversation: prev.conversation.filter(
          (msg) => msg.content !== "typing",
        ),
      }));
    }
  };

  const handleDeploy = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/deploy", {
        websiteId: id,
      });

      alert("Website deployed 🚀");
      window.open(res.data.url, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch website
  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/website/get-by-id/${id}`,
          { withCredentials: true },
        );

        setWebsite(res.data.website || res.data);
        setCode(res.data.website.latestCode);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load website");
      }
    };

    fetchWebsite();
  }, [id]);

  // Live preview update
  useEffect(() => {
    if (!iframeRef.current || !code) return;

    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    iframeRef.current.src = url;

    return () => URL.revokeObjectURL(url);
  }, [code]);

  const openPreview = () => {
    const newTab = window.open();
    newTab.document.open();
    newTab.document.write(code);
    newTab.document.close();
  };

  if (error)
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  if (!website)
    return (
      <div className="h-screen flex items-center justify-center text-zinc-400">
        Loading editor...
      </div>
    );

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row bg-black text-white overflow-hidden">
      <aside className="hidden lg:flex w-[380px] flex-col border-r border-white/10 bg-black/80">
        <Header website={website} />
        <Chat
          website={website}
          setPrompt={setPrompt}
          handleUpdate={handleUpdate}
          prompt={prompt}
          creditError={creditError}
        />
      </aside>

      <div className="flex-1 flex flex-col">
        <div className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80">
          <span className="text-xs text-zinc-400">Live Preview</span>

          <div className="flex gap-4">
            <button
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 text-sm font-semibold hover:scale-105 transition"
              onClick={handleDeploy}
            >
              <Rocket size={14} /> Deploy
            </button>

            <button className="p-2" onClick={() => setShowCode(!showCode)}>
              <Code2 size={18} />
            </button>

            <button className="p-2" onClick={openPreview}>
              <Monitor size={18} />
            </button>
          </div>
        </div>

        {showCode ? (
          <MonacoEditor
            height="100%"
            defaultLanguage="html"
            value={code}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
            }}
          />
        ) : (
          <iframe ref={iframeRef} className="flex-1 w-full bg-white" />
        )}
      </div>
    </div>
  );
};
