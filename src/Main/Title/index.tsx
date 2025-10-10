import styled from '@emotion/styled';
import { Date } from './@components/Date.tsx';
import { Wedding } from './@components/Wedding.tsx';

export const Title = () => {

  return (
    <Styled.Wrapper>
      <Styled.Inner>
        <Styled.Date/>
        <Styled.Wedding/>
        <Styled.Time>
          토요일 오후 5시
        </Styled.Time>
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
      <Styled.Arrow />
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

    &:after {
      content: '';
      display: block;
      height: 200px;
    }

    height: 100dvh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    display: grid;
    grid-template-rows: 1fr auto;
    background: url('/assets/images/bg-small.jpg') no-repeat center/max(100%, calc(100dvh + 200px)) auto;
    animation: bgMove 60s linear infinite alternate;
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
  Time: styled.div`
    @keyframes fade-in {
      to { opacity: 1; }
    }
    opacity: 0;
    position: absolute;
    top: 68%;
    left: 50%;
    transform: translateX(-50%);
    animation: fade-in 1000ms 900ms ease forwards;
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
    
    & span:nth-of-type(1) { animation-delay: 1.5s; }
    & span:nth-of-type(2) { animation-delay: 1.6s; }
    & span:nth-of-type(3) { animation-delay: 1.7s; margin-right: 2px; }
    & span:nth-of-type(4) { animation-delay: 1.9s; margin-right: 2px; }
    & span:nth-of-type(5) { animation-delay: 2.1s; }
    & span:nth-of-type(6) { animation-delay: 2.2s; }
    & span:nth-of-type(7) { animation-delay: 2.3s; }
  `,
  Arrow: styled.div`
    @keyframes arrow-bounce {
      0% {
        transform: rotate(-45deg) translate(-50%, 0);
      }
      50% {
        transform: rotate(-45deg) translate(-60%, 10%);
      }
      100% {
        transform: rotate(-45deg) translate(-50%, 0);
      }
    }

    position: absolute;
    bottom: 5%;
    left: 50%;
    width: 24px;
    height: 24px;
    border-left: 2px solid #fff;
    border-bottom: 2px solid #fff;
    transform: translateX(-50%) rotate(-45deg);
    animation: arrow-bounce 1s ease infinite;
  `,
};