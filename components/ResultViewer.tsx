import React, { useState } from 'react';
import { GeneratedArtifacts, TabView } from '../types';
import { PreviewFrame } from './PreviewFrame';
import { FileExplorer } from './FileExplorer';
import { Icons } from './ui/Icons';

interface ResultViewerProps {
  artifacts: GeneratedArtifacts;
}

export const ResultViewer: React.FC<ResultViewerProps> = ({ artifacts }) => {
  const [activeTab, setActiveTab] = useState<TabView>(TabView.PLAN);

  const tabs = [
    { id: TabView.PLAN, label: 'App Plan', icon: Icons.Layout },
    { id: TabView.PREVIEW, label: 'Visual Preview', icon: Icons.Code },
    { id: TabView.CODE, label: 'Codebase', icon: Icons.Server },
    { id: TabView.GUIDE, label: 'Guide & Docs', icon: Icons.Rocket },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case TabView.PLAN:
        return (
           <div className="p-8 h-full overflow-y-auto bg-gray-900 text-gray-300 space-y-8">
             <div className="space-y-4">
               <h2 className="text-3xl font-bold text-white tracking-tight">{artifacts.appName}</h2>
               <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-900/50 text-indigo-300 text-xs font-mono border border-indigo-700/50">
                 {artifacts.techStack}
               </div>
               <p className="text-lg leading-relaxed text-gray-300 max-w-4xl">{artifacts.appSummary}</p>
             </div>

             <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 max-w-2xl">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Icons.CheckCircle className="w-4 h-4 text-green-500" /> Demo Credentials
                </h3>
                <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm text-green-400 whitespace-pre-wrap border border-gray-800 shadow-inner">
                  {artifacts.demoCredentials}
                </div>
             </div>
           </div>
        );
      case TabView.PREVIEW:
        return <PreviewFrame htmlContent={artifacts.uiMockupHtml} />;
      case TabView.CODE:
        return <FileExplorer files={artifacts.fileStructure} />;
      case TabView.GUIDE:
        return (
          <div className="p-8 bg-gray-900 h-full overflow-y-auto font-mono text-sm text-gray-300 whitespace-pre-wrap">
             <div className="max-w-4xl mx-auto space-y-4">
              <h1 className="text-2xl font-bold text-white mb-6">Deployment & Usage Guide</h1>
              {artifacts.readme}
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-[800px] w-full max-w-[90rem] mx-auto bg-gray-800 rounded-xl border border-gray-700 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex border-b border-gray-700 bg-gray-900">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors border-r border-gray-800 last:border-r-0 ${
              activeTab === tab.id
                ? 'bg-gray-800 text-white border-t-2 border-t-indigo-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-800 border-t-2 border-t-transparent'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="flex-1 bg-gray-900 overflow-hidden relative">
        {renderContent()}
      </div>
    </div>
  );
};
