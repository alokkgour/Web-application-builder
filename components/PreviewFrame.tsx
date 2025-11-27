import React, { useMemo } from 'react';

interface PreviewFrameProps {
  htmlContent: string;
}

export const PreviewFrame: React.FC<PreviewFrameProps> = ({ htmlContent }) => {
  const finalSrcDoc = useMemo(() => {
    if (!htmlContent) return '';

    // 1. Clean up: Remove Markdown code blocks if present (common LLM artifact)
    let content = htmlContent.trim();
    // Remove starting ```html or ```
    content = content.replace(/^```(html)?/i, '');
    // Remove ending ```
    content = content.replace(/```$/, '');

    // 2. Check if it's a full HTML document (has <html> tag)
    const hasHtmlTag = content.toLowerCase().includes('<html');
    
    // If it's a full document, we still want to ensure it has the necessary scripts if they are missing
    // But usually we trust the generator if it provides a full doc.
    if (hasHtmlTag) {
      return content;
    }

    // 3. If it's a partial fragment (just <div>...</div>), wrap it in a proper boilerplate
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>App Preview</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/lucide@latest"></script>
        <style>
          body { font-family: 'Inter', sans-serif; background-color: #f3f4f6; }
          /* Custom scrollbar to match app theme */
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
          ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        </style>
      </head>
      <body class="h-screen overflow-hidden">
        <div class="h-full overflow-y-auto p-4">
          ${content}
        </div>
        <script>
          // Initialize icons after render
          if (window.lucide) {
            window.lucide.createIcons();
          }
        </script>
      </body>
      </html>
    `;
  }, [htmlContent]);

  return (
    <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden border border-gray-700 relative">
      {!htmlContent ? (
         <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <span className="animate-pulse">Waiting for preview content...</span>
         </div>
      ) : (
        <iframe
          srcDoc={finalSrcDoc}
          title="Application Preview"
          className="w-full h-full bg-white block"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      )}
    </div>
  );
};