// Polyfill for ScrollTimeline
interface ScrollTimelineOffset {
  target?: Element;
  edge?: 'start' | 'end';
  threshold?: number;
}

interface ScrollTimelineOptions {
  source?: Element;
  orientation?: 'block' | 'inline' | 'horizontal' | 'vertical';
  scrollOffsets?: ScrollTimelineOffset[];
}

declare global {
  class ScrollTimeline {
    constructor(options?: ScrollTimelineOptions);
  }
  
  class ViewTimeline extends ScrollTimeline {
    constructor(options?: ScrollTimelineOptions & {
      subject?: Element;
      range?: 'cover' | 'contain' | 'start' | 'end';
    });
  }

  interface KeyframeAnimationOptions {
    timeline?: ScrollTimeline | ViewTimeline;
  }
}

export {};