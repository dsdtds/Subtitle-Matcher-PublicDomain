
import { SubtitleLine } from '../types';

export const parseSrt = (srtContent: string): SubtitleLine[] => {
  const lines = srtContent.trim().split(/\r?\n\r?\n/);
  const subtitleLines: SubtitleLine[] = [];

  for (const line of lines) {
    const parts = line.split('\n');
    if (parts.length >= 3) {
      const index = parseInt(parts[0], 10);
      const timeMatch = parts[1].match(/(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})/);
      
      if (timeMatch) {
        const startTime = timeMatch[1];
        const endTime = timeMatch[2];
        const text = parts.slice(2).join(' ').trim();
        
        subtitleLines.push({ index, startTime, endTime, text });
      }
    }
  }
  return subtitleLines;
};
