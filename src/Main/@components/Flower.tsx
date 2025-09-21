import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import '../../scrollTimeline.js';

type Props = {
  wrapper: React.RefObject<HTMLDivElement>;
  gallery: React.RefObject<HTMLDivElement>;
};

export const Flower = (props: Props) => {
  const { wrapper, gallery } = props;
  const trackRef = useRef<HTMLDivElement>(null);
  const flowerRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!wrapper.current || !flowerRef.current) return;
    const wrapperElement = wrapper.current;
    const flower = flowerRef.current;
    flower.animate(
      [
        { offsetDistance: '100%', offset: 0 },
        { offsetDistance: '47%', offset: 0.4 },
        { offsetDistance: '47%', offset: 0.58 },
        { offsetDistance: '0%', offset: 1 },
      ],
      {
        fill: 'both',
        timeline: new ScrollTimeline({
          scrollOffsets: [
            { target: wrapperElement, edge: 'start', threshold: 1 },
            { target: wrapperElement, edge: 'end', threshold: 1 },
          ],
        }),
      },
    );
  }, [wrapper]);

  useEffect(() => {
    if (!gallery.current || !trackRef.current) return;
    const galleryElement = gallery.current;
    const track = trackRef.current;
    track.animate(
      [
        { transform: 'translate(-50%, 0)', zIndex: 200, opacity: 1, offset: 0 },
        { opacity: 1, zIndex: 200,  offset: 0.01 },
        { opacity: 0, zIndex: 0,  offset: 0.03 },
        { opacity: 0, zIndex: 0,  offset: 0.77 },
        { opacity: 1,zIndex: 200,  offset: 0.78 },
        { transform: `translate(-50%, calc(2000px - 100dvh))`, zIndex: 200, opacity: 1, offset: 1 },
      ],
      {
        fill: "both",
        timeline: new ScrollTimeline({
          scrollOffsets: [
            { target: galleryElement, edge: "start", threshold: 1 },
            { target: galleryElement, edge: "end", threshold: 1 }
          ]
        })
      }
    );
  }, [gallery]);

  return (
    <Styled.Track ref={trackRef}>
      <Styled.Flower ref={flowerRef} src="/assets/images/flower.png"/>
    </Styled.Track>
  );
};

const Styled = {
  Track: styled.div`
    position: absolute;
    left: 50dvw;
    top: 0;
    z-index: 200;
    width: 1048px;
    transform: translateX(-50%);
    will-change: transform;
  `,
  Flower: styled.img`
    position: absolute;
    left: 0;
    top: 0;
    width: 89px;
    height: 68px;
    will-change: offset-distance;
    offset-distance: 100%;
    offset-rotate: auto 90deg;
    offset-path: path('m523.89,4304.71v-102.65c0-380.2-349.01-699.56-349.01-699.56-444.83-376.4,250.93-486.65,250.93-486.65,444.83-102.65,557.68-250.93,557.68-250.93,283.93-319.37-486.96-646.34-486.96-646.34-258.91-112.16-314.04-296.55-314.04-296.55C-5.24,1295.45,395.39,1206.1,502.03,1255.07c65,29.84,105.64,109.85,90,179.91-35.06,157.03-234.66,151.32-234.66,151.32-287.05,0-340.67-193.9-340.67-193.9-85.15-285.15,215.21-534.18,215.21-534.18,309.81-245.7,291.98-636.53,291.98-636.53V0');
  `,
};