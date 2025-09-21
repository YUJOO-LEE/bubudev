import React, { useEffect, useRef, useState } from 'react';

type Options = {
  ref?: React.RefObject<HTMLElement>;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  ratio?: number;
};

export const useIntersectionObserver = (options?: Options) => {
  const ref = useRef<HTMLDivElement>(null);

  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    const target = options?.ref?.current || ref.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsShow(options?.ratio ? entry.intersectionRatio > options.ratio : entry.isIntersecting);
      },
      options,
    );
    observer.observe(target);
    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    ref: options?.ref ? undefined : ref,
    isShow,
  };
};