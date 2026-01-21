// src/services/ai.ts
import type { AIAnalysis } from '../types';

const OPENROUTER_API_KEY = "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"; 
const SITE_URL = "http://localhost:5173";
const SITE_NAME = "HR AI Recruiter";

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
        "model": "allenai/molmo-2-8b:free", // Bisa ganti ke "anthropic/claude-3-haiku" agar lebih murah & pintar
        "messages": [
          { "role": "system", "content": "You are a helpful JSON-speaking HR assistant." },
          { "role": "user", "content": prompt }
        ],
        "response_format": { "type": "json_object" } 
      })
    });

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);
    return result as AIAnalysis;

  } catch (error) {
    console.error("AI Error:", error);
    throw new Error("Failed to screen candidate");
  }
}