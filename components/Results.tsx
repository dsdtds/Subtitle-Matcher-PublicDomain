
import React from 'react';
import { Match } from '../types';
import Spinner from './Spinner';
import { DownloadIcon } from './icons';

interface ResultsProps {
  matches: Match[];
  isLoading: boolean;
  error: string | null;
  searched: boolean;
}

const Results: React.FC<ResultsProps> = ({ matches, isLoading, error, searched }) => {
    
  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(matches, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "subtitle_matches.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const downloadCSV = () => {
    const csvRows = [
      ['matchedText', 'movieTitle', 'year', 'startTime', 'endTime', 'originalLine'],
      ...matches.map(match => [
        `"${match.matchedText.replace(/"/g, '""')}"`,
        `"${match.movieTitle.replace(/"/g, '""')}"`,
        match.year.toString(),
        match.startTime,
        match.endTime,
        `"${match.originalLine.replace(/"/g, '""')}"`
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "subtitle_matches.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-48">
          <Spinner />
          <p className="mt-4 text-slate-400">Searching through archives...</p>
        </div>
      );
    }
    if (error) {
      return <p className="text-center text-red-400">{error}</p>;
    }
    if (searched && matches.length === 0) {
      return <p className="text-center text-slate-400">No matches found. Try adjusting the word counts or using a different speech.</p>;
    }
    if (matches.length > 0) {
      return (
        <div className="space-y-4">
          {matches.map((match, index) => (
            <div key={index} className="p-4 bg-slate-800 rounded-md border border-slate-700 transition-all hover:border-sky-500 hover:bg-slate-700/50">
                <p className="text-lg font-semibold">
                    <span className="text-sky-400">"{match.matchedText}"</span>
                </p>
                <p className="text-sm text-slate-400 mt-1">
                    — From <span className="font-medium text-slate-300">{match.movieTitle} ({match.year})</span>
                </p>
                <p className="text-xs text-slate-500 font-mono mt-2">
                    Timestamp: {match.startTime} &rarr; {match.endTime}
                </p>
                 <p className="text-xs text-slate-400 mt-2 italic border-l-2 border-slate-600 pl-2">
                    Original line: {match.originalLine}
                </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="mt-8">
        {searched && !isLoading && matches.length > 0 && (
            <div className="flex justify-end items-center mb-4 gap-2">
                 <span className="text-sm text-slate-400">Download Results:</span>
                 <button onClick={downloadJSON} className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold py-1 px-3 rounded-md transition">JSON</button>
                 <button onClick={downloadCSV} className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold py-1 px-3 rounded-md transition">CSV</button>
            </div>
        )}
      <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700 min-h-[12rem] flex items-center justify-center">
        {renderContent()}
      </div>
    </section>
  );
};

export default Results;
