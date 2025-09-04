
import React from 'react';
import { BrainIcon } from './Icons';

interface AiSuggestionsProps {
  analysis: string;
  isLoading: boolean;
}

const AiSuggestions: React.FC<AiSuggestionsProps> = ({ analysis, isLoading }) => {

  const formattedAnalysis = analysis
    .replace(/### (.*)/g, '<h3 class="text-lg font-semibold text-cyan-400 mt-4 mb-2">$1</h3>')
    .replace(/\*\* (.*) \*\*/g, '<strong class="text-white">$1</strong>')
    .replace(/\* (.*)/g, '<li class="ml-5 list-disc">$1</li>')
    .replace(/\n/g, '<br />')
    // Handle list spacing correctly
    .replace(/<br \/>(<li)/g, '$1') 
    .replace(/(<\/li>)<br \/>/g, '$1');


  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
      <div className="flex items-center mb-4">
        <BrainIcon className="h-6 w-6 text-cyan-400 mr-3" />
        <h2 className="text-xl font-bold text-white">AI Smart Suggestions</h2>
      </div>
      {isLoading && (
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
          <p className="ml-4 text-gray-400">AI is analyzing your scenario...</p>
        </div>
      )}
      {!isLoading && !analysis && (
        <div className="text-center text-gray-500 py-10">
          <p>Click "Generate AI Analysis" in the simulator to get financial insights and recommendations for your scenario.</p>
        </div>
      )}
      {analysis && !isLoading && (
        <div 
          className="prose prose-invert prose-sm max-w-none text-gray-300"
          dangerouslySetInnerHTML={{ __html: formattedAnalysis }}
        />
      )}
    </div>
  );
};

export default AiSuggestions;
