import React, {useState, useRef, useLayoutEffect, useEffect} from 'react';

import {LrcProps,} from '../type';
import {AUTO_SCROLL_AFTER_USER_SCROLL} from '../constant';
import useLrc from '../hook/use_lrc';
import useLrcLineOffsetTopMap from '../hook/use_lrc_line_offset_top_map';
import useAutoScroll from '../hook/use_auto_scroll';

interface Props extends LrcProps {
  scrollToCurrentLineSymbol: number;
}

const Lrc = ({
               lrc,
               currentTime = 0,
               children,
               autoScrollAfterUserScroll = AUTO_SCROLL_AFTER_USER_SCROLL,
               onCurrentLineChange,
               scrollToCurrentLineSymbol,
               ...props
             }: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const autoScroll = useAutoScroll({
    rootRef,
    autoScrollAfterUserScroll,
    scrollToCurrentLineSymbol,
  });
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const lrcLineList = useLrc(lrc);
  const lrcLineOffsetTopMap = useLrcLineOffsetTopMap({lrcLineList, rootRef});

  useLayoutEffect(() => {
    const {length} = lrcLineList;
    let i = 0;
    for (; i < length; i += 1) {
      const {millisecond} = lrcLineList[i];
      if (currentTime < millisecond) {
        break;
      }
    }
    setCurrentIndex(i - 1);
  }, [currentTime, lrcLineList]);

  useLayoutEffect(() => {

    const top = (lrcLineOffsetTopMap.get(currentIndex) || 0) -
      (lrcLineOffsetTopMap.get(Infinity) || 0) / 2


    if (autoScroll) {
      console.log({currentIndex})
      const {current} = rootRef;
      if (current && currentIndex > 5) {
        current.scrollTo({
          left: 0,
          top:top-280,
          behavior: 'smooth',
        })
      }

    }
  }, [currentIndex, autoScroll]);
  useEffect(() => {
    if (onCurrentLineChange) {
      onCurrentLineChange(lrcLineList[currentIndex] || null, currentIndex);
    }
  }, [currentIndex, lrcLineList, onCurrentLineChange]);

  return (
    <div {...props} ref={rootRef}>
      {lrcLineList.map((lrcLine, index) =>
        children(lrcLine, index === currentIndex, index),
      )}
    </div>
  );
};

export default Lrc;
