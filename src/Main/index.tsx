import { useRef } from 'react';
import styled from '@emotion/styled';
import { Flower } from './@components/Flower';
import { Bank } from './Bank';
import { Gallery } from './Gallery';
import { Info } from './Info';
import { Map } from './Map';
import { Message } from './Message';
import { Notification } from './Notification';
import { Title } from './Title';

export const Main = () => {
  const scrollSection = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  return (
    <Styled.Wrapper>
      <Title/>
      <Gallery galleryRef={galleryRef} />
      <Styled.ScrollSection ref={scrollSection}>
        <Flower wrapper={scrollSection} gallery={galleryRef} />
        <Styled.Content>
          <Message />
          <Info />
          <Notification />
          <Map />
          <Bank />
        </Styled.Content>
      </Styled.ScrollSection>
    </Styled.Wrapper>
  )
};

const Styled = {
  Wrapper: styled.div`
    width: 100dvw;
    min-height: 100dvh;
    contain: paint;
  `,
  ScrollSection: styled.div`
    position: relative;
    height: calc(4315px + 2000px - 100dvh);
  `,
  Content: styled.div`
    position: absolute;
    left: 50dvw;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-50%);
  `,
};