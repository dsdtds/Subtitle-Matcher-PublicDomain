
import React from 'react';
import { FilmIcon } from './icons';

interface ControlsProps {
  speech: string;
  setSpeech: (speech: string) => void;
  minWords: number;
  setMinWords: (min: number) => void;
  maxWords: number;
  setMaxWords: (max: number) => void;
  isLoading: boolean;
  onFindMatches: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  speech,
  setSpeech,
  minWords,
  setMinWords,
  maxWords,
  setMaxWords,
  isLoading,
  onFindMatches,
}) => {
  const handleMinWordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setMinWords(Math.max(1, value));
      if (value > maxWords) {
        setMaxWords(value);
      }
    }
  };

  const handleMaxWordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
     if (!isNaN(value)) {
      setMaxWords(Math.max(1, value));
    }
  };


  return (
    <section className="p-6 bg-slate-800/50 rounded-lg border border-slate-700 shadow-lg">
      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor="speech-input" className="block text-sm font-medium text-slate-300 mb-2">
            Paste speech here
          </label>
          <textarea
            id="speech-input"
            rows={6}
            className="block w-full rounded-md border-0 bg-slate-900/80 py-2 px-3 text-slate-200 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6 transition"
            placeholder="e.g., We choose to go to the Moon..."
            value={speech}
            onChange={(e) => setSpeech(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="min-words" className="block text-sm font-medium text-slate-300 mb-2">
              Min words per clip
            </label>
            <input
              type="number"
              id="min-words"
              min="1"
              value={minWords}
              onChange={handleMinWordsChange}
              className="block w-full rounded-md border-0 bg-slate-900/80 py-2 px-3 text-slate-200 shadow-sm ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="max-words" className="block text-sm font-medium text-slate-300 mb-2">
              Max words per clip
            </label>
            <input
              type="number"
              id="max-words"
              min={minWords}
              value={maxWords}
              onChange={handleMaxWordsChange}
              className="block w-full rounded-md border-0 bg-slate-900/80 py-2 px-3 text-slate-200 shadow-sm ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={onFindMatches}
            disabled={isLoading || !speech.trim()}
            className="w-full flex items-center justify-center gap-2 rounded-md bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              'Searching...'
            ) : (
              <>
                <FilmIcon /> Find Matching Subtitles
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Controls;
