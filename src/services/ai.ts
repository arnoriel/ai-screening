// src/services/ai.ts
import type { AIAnalysis } from '../types';

// Mengambil data dari environment variables Vite
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const SITE_URL = import.meta.env.VITE_SITE_URL;
const SITE_NAME = import.meta.env.VITE_SITE_NAME;

export async function screenCandidateWithAI(
  resumeText: string,
  jobDescription: string,
  requirements: string[]
): Promise<AIAnalysis> {
  
  const prompt = `
    You are an expert HR Recruiter AI. Analyze the following candidate for the job.
    
    JOB DESCRIPTION:
    ${jobDescription}
    
    REQUIREMENTS:
    ${requirements.join(', ')}
    
    CANDIDATE RESUME/PROFILE:
    ${resumeText}
    
    Output strictly in JSON format with the following structure:
    {
      "score": number (0-100),
      "summary": "Brief professional summary of the match",
      "pros": ["point 1", "point 2"],
      "cons": ["point 1", "point 2"],
      "matchReasoning": "Why this score was given"
    }
  `;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": SITE_URL,
        "X-Title": SITE_NAME,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "arcee-ai/trinity-large-preview:free",
        "messages": [
          { "role": "system", "content": "You are a helpful JSON-speaking HR assistant." },
          { "role": "user", "content": prompt }
        ],
        "response_format": { "type": "json_object" } 
      })
    });

    const data = await response.json();
    
    // Safety check jika API mengembalikan error
    if (!response.ok) throw new Error(data.error?.message || "API Error");

    const result = JSON.parse(data.choices[0].message.content);
    return result as AIAnalysis;

  } catch (error) {
    console.error("AI Error:", error);
    throw new Error("Failed to screen candidate");
  }
}