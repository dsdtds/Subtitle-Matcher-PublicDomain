
export interface SubtitleLine {
  index: number;
  startTime: string;
  endTime: string;
  text: string;
}

export interface SubtitleFile {
  movieTitle: string;
  year: number;
  lines: SubtitleLine[];
}

export interface Match {
  matchedText: string;
  movieTitle: string;
  year: number;
  startTime: string;
  endTime: string;
  originalLine: string;
}

export interface MockSubtitle {
    movieTitle: string;
    year: number;
    srtContent: string;
}
