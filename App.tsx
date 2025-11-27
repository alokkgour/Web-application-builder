import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputArea } from './components/InputArea';
import { ResultViewer } from './components/ResultViewer';
import { generateProjectArchitecture } from './services/gemini';
import { ProjectState } from './types';
import { Icons } from './components/ui/Icons';

const App: React.FC = () => {
  const [projectState, setProjectState] = useState<ProjectState>({
    id: 'init',
    name: 'New Project',
    description: '',
    status: 'idle',
  });

  const handleGenerate = async (prompt: string) => {
    setProjectState(prev => ({ ...prev, status: 'generating', description: prompt, errorMsg: undefined }));
    
    try {
      const artifacts = await generateProjectArchitecture(prompt);
      setProjectState(prev => ({
        ...prev,
        status: 'complete',
        generatedArtifacts: artifacts
      }));
    } catch (error) {
      setProjectState(prev => ({
        ...prev,
        status: 'error',
        errorMsg: error instanceof Error ? error.message : "An unknown error occurred"
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col text-gray-100 selection:bg-indigo-500 selection:text-white">
      <Header />
      
      <main className="flex-1 flex flex-col items-center p-4 sm:p-8">
        
        {/* Intro / Hero Section - Only show when idle */}
        {projectState.status === 'idle' && (
          <div className="text-center max-w-3xl mx-auto mt-12 mb-12 animate-in zoom-in duration-500">
            <h2 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Full-Stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Builder AI</span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Transform a simple prompt into a production-ready application. 
              Get source code, database schemas, Docker configs, and deployment guides in one click.
            </p>
          </div>
        )}

        <InputArea onSubmit={handleGenerate} isLoading={projectState.status === 'generating'} />

        {projectState.status === 'error' && (
          <div className="w-full max-w-4xl p-4 bg-red-900/20 border border-red-500/50 rounded-lg flex items-start gap-3 text-red-200 animate-in fade-in slide-in-from-top-2">
            <Icons.AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Generation Failed</p>
              <p className="text-sm opacity-90">{projectState.errorMsg}</p>
            </div>
          </div>
        )}

        {projectState.status === 'generating' && (
           <div className="flex flex-col items-center justify-center mt-20 space-y-6 animate-in fade-in duration-700">
             <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
                <Icons.Cpu className="w-20 h-20 text-indigo-400 animate-pulse-fast relative z-10" />
             </div>
             <div className="text-center space-y-2">
               <h3 className="text-xl font-semibold text-white">Constructing Application...</h3>
               <p className="text-gray-400 font-mono text-sm">Generating File Tree • Writing Dockerfiles • Compiling Documentation</p>
             </div>
             <div className="flex gap-2">
               <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-75"></span>
               <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-150"></span>
               <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-300"></span>
             </div>
           </div>
        )}

        {projectState.status === 'complete' && projectState.generatedArtifacts && (
          <ResultViewer artifacts={projectState.generatedArtifacts} />
        )}

      </main>

      <footer className="py-6 text-center text-gray-600 text-sm border-t border-gray-900 mt-auto">
        <p>Powered by Google Gemini 2.5 • React 18 • Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default App;