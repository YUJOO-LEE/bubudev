import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { Flower } from './@components/Flower.tsx';
import { Bank } from './Bank';
import { Gallery } from './Gallery';
import { Info } from './Info';
import { Map } from './Map';
import { Message } from './Message';
import { Notification } from './Notification';
import { Title } from './Title';

export const Main = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const scaleStart = windowHeight * 0.3;
      const scaleEnd = windowHeight;
      const scale = scrollY < scaleStart ? 0.6 :
                   scrollY >= scaleEnd ? 1.0 :
                   0.6 + (0.4 * (scrollY - scaleStart) / (scaleEnd - scaleStart));

      const borderRadius = scale < 1 ? 2 : 0;

      const body = document.body;

      if (body.style.top) return;
      contentRef.current.style.transform = `scale(${scale})`;
      contentRef.current.style.borderRadius = `${borderRadius}rem ${borderRadius}rem 0 0`;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    contentRef.current.animate(
      [
        { backgroundColor: '#FFFFFF', offset: 0.4 },
        { backgroundColor: '#FFF7EE', offset: 0.5 },
        { backgroundColor: '#ffeef7', offset: 0.7 },
        { backgroundColor: '#fbffda', offset: 0.9 },
        { backgroundColor: '#deeab3', offset: 1 },
      ],
      {
        fill: 'both',
        timeline: new ScrollTimeline({
          scrollOffsets: [
            { target: contentRef.current, edge: 'start', threshold: 1 },
            { target: contentRef.current, edge: 'end', threshold: 1 },
          ],
        }) as any,
      })
  }, []);

  return (
    <Styled.Wrapper>
      <Title />
      <Styled.Content ref={contentRef}>
        <Flower wrapper={contentRef} />
        <Message />
        <Info />
        <Notification />
        <Gallery />
        <Map />
        <Bank />
      </Styled.Content>
    </Styled.Wrapper>
  )
};

const Styled = {
  Wrapper: styled.div`
    position: relative;
    overflow: hidden;
  `,
  Content: styled.div`
    position: relative;
    background: #fff;
    border-radius: 4rem 4rem 0 0;
    min-height: 100dvh;
    margin-top: 100dvh;
    padding: 5rem 0;
    transition: transform 100ms, border-radius 300ms;
    transform-origin: center top;
    z-index: 10;
    box-shadow: 0 -1rem 4rem rgba(0, 0, 0, 0.1), 0 -0.5rem 1rem rgba(0, 0, 0, 0.1);
  `,
};