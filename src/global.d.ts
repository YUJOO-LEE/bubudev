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

declare class ScrollTimeline {
  constructor(options?: ScrollTimelineOptions);
}

declare class ViewTimeline extends ScrollTimeline {
  constructor(options?: ScrollTimelineOptions & {
    subject?: Element;
    range?: 'cover' | 'contain' | 'start' | 'end';
  });
}