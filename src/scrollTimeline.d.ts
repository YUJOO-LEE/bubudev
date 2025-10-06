// src/types/scroll-timeline.d.ts
declare global {
  interface ScrollTimeline extends AnimationTimeline {
    currentTime: number | null;
  }

  interface ScrollTimelineOptions {
    scrollOffsets?: Array<{
      target: Element;
      edge: 'start' | 'end';
      threshold: number;
    }>;
  }

  let ScrollTimeline: {
    prototype: ScrollTimeline;
    new(options?: ScrollTimelineOptions): ScrollTimeline;
  };
}

export {};
