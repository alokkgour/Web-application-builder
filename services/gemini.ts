import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedArtifacts } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are a Full-Stack Builder AI. Your job is to produce a COMPLETE, READY-TO-USE web application.
Do NOT produce only architecture or pseudo code. Produce full files, runnable scripts, and clear documentation.

Your output must be a JSON object strictly adhering to the schema.

Adhere to this process:
1. APP DEFINITION: Define a concrete app.
2. VISUAL PREVIEW: Generate a single-file HTML/Tailwind CSS mock. 
   - Concise, high-fidelity.
   - Use <script src="https://cdn.tailwindcss.com"></script>.
   - Use <script src="https://unpkg.com/lucide@latest"></script>.
3. FULL CODE: Generate critical files (Next.js/React + Node/Express/Fastify + Prisma).
   - CRITICAL: Do NOT include 'package-lock.json', 'yarn.lock', or 'node_modules'.
   - CRITICAL: Do NOT include binary assets (images, favicons). Use placeholders.
   - INCLUDE: package.json (MUST include 'prisma', 'playwright', and 'ts-node' in devDependencies).
   - INCLUDE: tsconfig.json, .env.example, Dockerfile, docker-compose.yml.
   - INCLUDE: prisma/schema.prisma (Complete data model).
   - INCLUDE: prisma/seed.ts (Robust seed script generating realistic users, admins, and content for testing).
   - INCLUDE: prisma/migrations/0_init/migration.sql (Raw SQL version of the initial schema for version control).
   - INCLUDE: tests/e2e/app.spec.ts (Complete Playwright test suite covering Authentication and basic CRUD).
   - INCLUDE: Main server file, key API routes, key frontend pages/components.
4. DOCUMENTATION: README.md with Setup (Local/Docker), API Docs, Deployment.

Ensure code is production-ready. The seed script should make the app immediately usable with 'demo@example.com'.
`;

export const generateProjectArchitecture = async (prompt: string): Promise<GeneratedArtifacts> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", 
      contents: `Build this application: ${prompt}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            appName: { type: Type.STRING },
            appSummary: { type: Type.STRING, description: "A one-paragraph summary of the app purpose and core features." },
            demoCredentials: { type: Type.STRING, description: "Login details for Admin and Demo users." },
            techStack: { type: Type.STRING },
            uiMockupHtml: { type: Type.STRING, description: "Complete, standalone HTML5 string with Tailwind CSS and Lucide scripts for the visual preview. Do not wrap in markdown." },
            fileStructure: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  path: { type: Type.STRING, description: "Relative file path (e.g., 'prisma/seed.ts', 'tests/e2e/app.spec.ts')" },
                  content: { type: Type.STRING, description: "Full file content." },
                  language: { type: Type.STRING, description: "Language for syntax highlighting (e.g., 'typescript', 'sql')" }
                },
                required: ["path", "content", "language"]
              }
            },
            readme: { type: Type.STRING, description: "Full Markdown documentation including setup, API docs, and deployment." }
          },
          required: ["appName", "appSummary", "demoCredentials", "techStack", "uiMockupHtml", "fileStructure", "readme"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as GeneratedArtifacts;

  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    
    // Improve error message for the user
    if (error.message && error.message.includes("xhr error")) {
       throw new Error("The project is too large for a single generation. Please try a simpler prompt or refresh and try again.");
    }
    
    throw error;
  }
};