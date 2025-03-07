import axios from "axios";

export const generateRes = async (Q) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    // console.log("API Key:", apiKey); // Debug log

    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure the content type is set to JSON
      },
      data: {
        contents: [{ parts: [{ text: Q }] }],
      },
    });

    console.log(response);

    if (response.data.candidates && response.data.candidates.length > 0) {
      return response.data.candidates[0].content.parts[0].text;
    } else {
      return "No content generated.";
    }
  } catch (e) {
    console.error("Error generating response:", e);
    return "Error generating response.";
  }
};
