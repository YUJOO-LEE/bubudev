// src/types/scroll-timeline.d.ts
declare global {
  interface KeyframeAnimationOptions {
    timeline?: any;
  }

  interface ScrollTimelineOptions {
    source?: Element | null;
    orientation?: 'block' | 'inline' | 'horizontal' | 'vertical';
    scrollOffsets?: Array<{
      target: Element;
      edge: 'start' | 'end';
      threshold: number;
    }>;
  }

  interface ScrollTimeline {
    readonly currentTime: any;
    readonly duration: any;
    readonly phase: 'inactive' | 'before' | 'active' | 'after';
    source: Element | null;
    orientation: 'block' | 'inline' | 'horizontal' | 'vertical';
    scrollOffsets: Array<{
      target: Element;
      edge: 'start' | 'end';
      threshold: number;
    }>;
  }

  const ScrollTimeline: {
    prototype: ScrollTimeline;
    new(options?: ScrollTimelineOptions): ScrollTimeline;
  };
}

export {};
