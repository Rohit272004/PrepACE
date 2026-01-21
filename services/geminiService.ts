
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getResumeScore = async (jobDescription: string, resumeText: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return Promise.resolve(
`**Gemini API Key not configured.**

This is a placeholder response. In a real application, you would see an analysis of your resume against the job description.

**Analysis:**
*   **Keywords:** Your resume contains some keywords.
*   **Skills:** Your skills seem partially aligned.

**Score:** 65%

**Suggestions:**
*   Tailor your resume to include more specific keywords from the job description like 'cloud services' and 'agile methodologies'.
*   Quantify your achievements in your project descriptions (e.g., 'Improved performance by 15%').`
    );
  }

  try {
    const prompt = `
      You are an expert ATS (Applicant Tracking System) and a career coach.
      Analyze the following resume against the provided job description.
      Provide a "Match Score" as a percentage.
      Then, provide a concise analysis of how well the resume matches the job description, focusing on keywords, skills, and experience.
      Finally, give actionable suggestions for improvement.
      Format the output in Markdown.

      **Job Description:**
      ---
      ${jobDescription}
      ---

      **Resume:**
      ---
      ${resumeText}
      ---
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Error: Could not get a response from the AI. Please check your API key and try again.";
  }
};
