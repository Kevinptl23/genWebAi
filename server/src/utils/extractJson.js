export function extractJson(text) {
  try {
    if (!text) {
       return;
    }

    let cleaned = text.trim();

    // Remove markdown ```json ``` or ```
    cleaned = cleaned
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Find first and last curly braces
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("No JSON found in AI response");
    }

    const jsonString = cleaned.substring(start, end + 1);

    return JSON.parse(jsonString);
  } catch (error) {
    return {
      success: false,
      error: "Invalid JSON returned by AI",
      raw: text
    };
  }
}