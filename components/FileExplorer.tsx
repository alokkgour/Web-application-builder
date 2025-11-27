import React, { useState, useMemo } from 'react';
import { FileArtifact } from '../types';
import { Icons } from './ui/Icons';

interface FileExplorerProps {
  files: FileArtifact[];
}

export const FileExplorer: React.FC<FileExplorerProps> = ({ files }) => {
  const [selectedFile, setSelectedFile] = useState<FileArtifact | null>(files[0] || null);

  // Simple sort to keep folders together (heuristic: slashes implies depth)
  const sortedFiles = useMemo(() => {
    return [...files].sort((a, b) => a.path.localeCompare(b.path));
  }, [files]);

  return (
    <div className="flex h-full bg-gray-900 text-gray-300 font-mono text-sm border border-gray-700 rounded-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col">
        <div className="p-3 border-b border-gray-800 font-semibold text-gray-400 text-xs uppercase tracking-wider">
          Explorer
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {sortedFiles.map((file) => (
            <button
              key={file.path}
              onClick={() => setSelectedFile(file)}
              className={`w-full text-left px-4 py-2 flex items-center space-x-2 truncate hover:bg-gray-800 transition-colors ${
                selectedFile?.path === file.path ? 'bg-indigo-900/30 text-indigo-300 border-l-2 border-indigo-500' : 'border-l-2 border-transparent'
              }`}
            >
              {file.path.endsWith('.json') ? <Icons.Code className="w-3 h-3" /> : 
               file.path.endsWith('.tsx') || file.path.endsWith('.ts') ? <Icons.Layout className="w-3 h-3" /> :
               <Icons.Server className="w-3 h-3" />}
              <span className="truncate">{file.path}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Code Editor View */}
      <div className="flex-1 flex flex-col bg-gray-900 min-w-0">
        {selectedFile ? (
          <>
            <div className="h-10 border-b border-gray-800 flex items-center px-4 bg-gray-900 justify-between">
              <span className="font-medium text-gray-200">{selectedFile.path}</span>
              <span className="text-xs text-gray-500">{selectedFile.language}</span>
            </div>
            <div className="flex-1 overflow-auto custom-scrollbar relative">
              <pre className="p-4 text-sm leading-relaxed tab-4">
                <code>{selectedFile.content}</code>
              </pre>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-600">
            Select a file to view source
          </div>
        )}
      </div>
    </div>
  );
};
