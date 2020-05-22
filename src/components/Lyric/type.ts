import {ReactNode} from 'react';

export interface LrcLine {
  millisecond: number;
  content?: string;
}

export interface LrcProps {
  lrc: string;
  children: (lrcLine: LrcLine, active: boolean, index: number) => ReactNode;
  currentTime?: number;
  autoScrollAfterUserScroll?: number;
  onCurrentLineChange?: (lrcLine: LrcLine | null, index: number) => any;
  className?: string

  [key: string]: any;

}
