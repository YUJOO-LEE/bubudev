// src/types/scroll-timeline.d.ts  
declare global {
  // KeyframeAnimationOptions에 timeline 속성 추가 (any 타입으로 우회)
  interface KeyframeAnimationOptions {
    timeline?: unknown;
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
    readonly currentTime: CSSNumberish | null;
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
