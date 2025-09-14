import styled from '@emotion/styled';
import { Title } from './Title';

export const Main = () => {
  return (
    <Styled.Wrapper>
      <Title/>
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

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: -200px;
      left: 0;
      width: 100%;
      height: 200px;
      background: linear-gradient(to bottom, #FFF7EE00, #FFF7EEFF);
    }
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