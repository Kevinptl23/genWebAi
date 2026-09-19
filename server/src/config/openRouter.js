const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions";
const model = "deepseek/deepseek-chat";

export const generateResponse = async (prompt) => {
  const response = await fetch(openRouterUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: model,
      max_tokens: 5000,
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: "You must return ONLY valid RAW json",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error("OpenRouter Err: " +err);
  }

  const data = await response.json();
  return data;
};
