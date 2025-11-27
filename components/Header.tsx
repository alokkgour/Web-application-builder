import React from 'react';
import { Icons } from './ui/Icons';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Icons.Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Full-Stack Builder AI</h1>
            <p className="text-xs text-gray-400">Production-Ready Apps on Demand</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-xs font-medium border border-green-800 flex items-center gap-1">
            <Icons.CheckCircle className="w-3 h-3" /> Gemini 2.5 Active
          </span>
        </div>
      </div>
    </header>
  );
};
