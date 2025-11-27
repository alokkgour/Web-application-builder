export interface ProjectState {
  id: string;
  name: string;
  description: string;
  status: 'idle' | 'generating' | 'complete' | 'error';
  generatedArtifacts?: GeneratedArtifacts;
  errorMsg?: string;
}

export interface FileArtifact {
  path: string;
  content: string;
  language: string; // 'typescript', 'json', 'sql', 'markdown', etc.
}

export interface GeneratedArtifacts {
  appName: string;
  appSummary: string;
  demoCredentials: string; // Email/pass for admin and demo users
  uiMockupHtml: string; // The visual preview (HTML/Tailwind)
  fileStructure: FileArtifact[]; // List of all files generated
  readme: string; // Comprehensive guide (Steps 5-10 from requirements)
  techStack: string;
}

export enum TabView {
  PLAN = 'PLAN',
  PREVIEW = 'PREVIEW',
  CODE = 'CODE',
  GUIDE = 'GUIDE'
}
