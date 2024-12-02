import { useEffect, useRef } from 'react';

export const useResizeObserver = (callback: (size: DOMRect) => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        callback(entry.contentRect);
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [callback]);

  return ref;
};
