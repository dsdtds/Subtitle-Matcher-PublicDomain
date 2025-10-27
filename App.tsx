
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import Results from './components/Results';
import { Match, SubtitleFile } from './types';
import { MOCK_SUBTITLES } from './constants';
import { parseSrt } from './services/subtitleService';

const App: React.FC = () => {
  const [speech, setSpeech] = useState<string>("We choose to go to the Moon in this decade and do the other things, not because they are easy, but because they are hard.");
  const [minWords, setMinWords] = useState<number>(2);
  const [maxWords, setMaxWords] = useState<number>(5);
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState<boolean>(false);

  const cleanText = (text: string) => {
    return text.toLowerCase().replace(/[^\w\s']|_/g, "").replace(/\s+/g, " ").trim();
  };

  const findMatches = useCallback(async () => {
    setIsLoading(true);
    setSearched(true);
    setMatches([]);
    setError(null);

    // Simulate fetching and parsing
    await new Promise(resolve => setTimeout(resolve, 500)); 
    
    try {
      const allSubtitles: SubtitleFile[] = MOCK_SUBTITLES.map(sub => ({
        ...sub,
        lines: parseSrt(sub.srtContent),
      }));

      const speechWords = cleanText(speech).split(' ');
      const foundMatches: Match[] = [];
      let speechIndex = 0;

      while (speechIndex < speechWords.length) {
        let bestMatch: { match: Match; length: number } | null = null;
        
        for (let n = Math.min(maxWords, speechWords.length - speechIndex); n >= minWords; n--) {
          const phraseWords = speechWords.slice(speechIndex, speechIndex + n);
          const searchPhrase = phraseWords.join(' ');

          for (const subFile of allSubtitles) {
            for (const line of subFile.lines) {
              if (cleanText(line.text).includes(searchPhrase)) {
                bestMatch = {
                  match: {
                    matchedText: phraseWords.join(' '),
                    movieTitle: subFile.movieTitle,
                    year: subFile.year,
                    startTime: line.startTime,
                    endTime: line.endTime,
                    originalLine: line.text,
                  },
                  length: n
                };
                break; 
              }
            }
            if (bestMatch) break;
          }
          if (bestMatch) break;
        }

        if (bestMatch) {
          foundMatches.push(bestMatch.match);
          speechIndex += bestMatch.length;
        } else {
          speechIndex++; 
        }
      }

      setMatches(foundMatches);
    } catch (e) {
      setError("Failed to process subtitles. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [speech, minWords, maxWords]);

  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <main className="mt-8">
          <Controls
            speech={speech}
            setSpeech={setSpeech}
            minWords={minWords}
            setMinWords={setMinWords}
            maxWords={maxWords}
            setMaxWords={setMaxWords}
            isLoading={isLoading}
            onFindMatches={findMatches}
          />
          <Results
            matches={matches}
            isLoading={isLoading}
            error={error}
            searched={searched}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
