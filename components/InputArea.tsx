import React, { useState } from 'react';
import { Icons } from './ui/Icons';

interface InputAreaProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-gray-900 rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your app idea (e.g., 'A SaaS dashboard for a coffee subscription service with analytics and user management')..."
              className="w-full bg-transparent text-gray-100 p-6 pr-32 focus:outline-none resize-none min-h-[120px] text-lg placeholder-gray-500"
              disabled={isLoading}
            />
            <div className="absolute bottom-4 right-4 flex items-center space-x-2">
              <button
                type="submit"
                disabled={!prompt.trim() || isLoading}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  !prompt.trim() || isLoading
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                }`}
              >
                {isLoading ? (
                  <>
                    <Icons.Loader2 className="w-5 h-5 animate-spin" />
                    <span>Architecting...</span>
                  </>
                ) : (
                  <>
                    <Icons.Rocket className="w-5 h-5" />
                    <span>Generate App</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
