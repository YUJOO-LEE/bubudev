import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';

type Props = {
  galleryRef: React.RefObject<HTMLDivElement>;
};

export const Gallery = (props: Props) => {
  const { galleryRef } = props;

  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!innerRef.current || !galleryRef.current) return;
    const wrapper = galleryRef.current;
    const inner = innerRef.current;
    inner.animate(
      [
        { opacity: 0, offset: 0 },
        { transform: 'translateX(0)', opacity: 1, offset: 0.1 },
        { transform: 'translateX(calc(-100% + 100dvw)', opacity: 1, offset: 0.9 },
        { opacity: 0, transform: 'translateX(calc(-100% + 100dvw)', offset: 1 },
      ],
      {
        fill: 'both',
        timeline: new ScrollTimeline({
          scrollOffsets: [
            { target: wrapper, edge: 'start', threshold: 1 },
            { target: wrapper, edge: 'end', threshold: 1 },
          ],
        }),
      },
    );
  }, [galleryRef]);

  return (
    <Styled.Wrapper ref={galleryRef}>
      <Styled.Title>
        갤러리
      </Styled.Title>
      <Styled.Inner ref={innerRef}>
        {[...Array(6)].map((_, index) => (
          <Styled.Item key={index}>
            <figure>
              <img src={`/assets/images/pic_${index + 1}.jpg`} alt="사진"/>
            </figure>
          </Styled.Item>
        ))}
      </Styled.Inner>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    position: absolute;
    left: 0;
    top: 2850px;
    width: 100%;
    height: 2000px;
    z-index: 100;
  `,
  Inner: styled.div`
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    width: 850dvw;
    height: 100dvh;
    margin-top: -650px; /* jeju-container랑 겹치도록 */
    transform: translateX(0);
    will-change: transform, opacity;
  `,
  Title: styled.p`
    position: sticky;
    top: 0;
    width: 360px;
    margin: 0 auto;
    padding-top: 4rem;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 400;
  `,
  Item: styled.div`
    position: relative;
    width: auto;
    flex-shrink: 0;
    background: #fff;

    & figure {
      overflow: hidden;
      width: 90%;
      height: 70dvh;
      margin: auto;
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  `,
};