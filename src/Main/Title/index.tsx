import styled from '@emotion/styled';
import { Date } from './@components/Date.tsx';
import { Wedding } from './@components/Wedding.tsx';

export const Title = () => {

  return (
    <Styled.Wrapper>
      <Styled.Inner>
        <Styled.Date/>
        <Styled.Wedding/>
        <Styled.Text>
          <span>박</span>
          <span>형</span>
          <span>준</span>
          <span>♥</span>
          <span>이</span>
          <span>유</span>
          <span>주</span>
        </Styled.Text>
      </Styled.Inner>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    @keyframes bgMove {
      from {
        background-position: center 0;
      }
      to {
        background-position: center -200px;
      }
    }

    height: calc(100dvh + 200px);
    max-height: 1000px;
    display: grid;
    grid-template-rows: 1fr auto;
    background: url('/assets/images/bg-small.jpg') no-repeat center/max(100%, calc(100vh + 200px)) auto;
    animation: bgMove 60s linear infinite alternate;

    &:after {
      content: '';
      display: block;
      height: 200px;
    }

    /* webkit 브라우저용 */
    -webkit-mask-image: -webkit-linear-gradient(to bottom,
      black 0%,
      black calc(100% - 200px),
      transparent 100%
    );
    -webkit-mask-size: 100% 100%;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;

    /* 표준 브라우저용 */
    mask-image: linear-gradient(to bottom,
      black 0%,
      black calc(100% - 200px),
      transparent 100%
    );
    mask-size: 100% 100%;
    mask-repeat: no-repeat;
    mask-position: center;,
  `,
  Inner: styled.div`
    position: relative;
    display: grid;
    place-items: center;
  `,
  Date: styled(Date)`
    @keyframes zoomOut {
      from {
        transform: scale(4);
        opacity: 0;
        filter: blur(100px);
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }

    width: 40%;
    max-width: 300px;
    animation: zoomOut 1.5s ease forwards;
    will-change: filter;
  `,
  Wedding: styled(Wedding)`
    @keyframes fadeIn {
      from {
        opacity: 0;
        filter: blur(10px);
      }
      to {
        opacity: 1;
      }
    }

    width: 50%;
    max-width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
    opacity: 0;
    animation: fadeIn 1s ease 1s forwards;
    will-change: filter;
  `,
  Text: styled.p`
    @keyframes fadeIn {
      to { opacity: 1; }
    }
    
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translateX(-50%);
    color: #FFF;
    text-shadow: 0 0 10px #00000080;
    
    & span {
      display: inline-block;
      opacity: 0;
      animation: fadeIn 200ms ease forwards;
    }
    
    & span:nth-of-type(1) { animation-delay: 0s; }
    & span:nth-of-type(2) { animation-delay: 0.1s; }
    & span:nth-of-type(3) { animation-delay: 0.2s; margin-right: 2px; }
    & span:nth-of-type(4) { animation-delay: 0.4s; margin-right: 2px; }
    & span:nth-of-type(5) { animation-delay: 0.6s; }
    & span:nth-of-type(6) { animation-delay: 0.7s; }
    & span:nth-of-type(7) { animation-delay: 0.8s; }
  `,
};