import { useEffect, useState, useRef } from 'react';
interface ScrollTriggerOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}
export const useScrollTrigger = (options: ScrollTriggerOptions = {}) => {
  const {
    threshold = 0.3,
    rootMargin = '0px',
    once = false
  } = options;
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) {
          observer.unobserve(currentRef);
        }
      } else {
        if (!once) {
          setInView(false);
        }
      }
    }, {
      threshold,
      rootMargin
    });
    observer.observe(currentRef);
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, once]);
  return {
    ref,
    inView
  };
};