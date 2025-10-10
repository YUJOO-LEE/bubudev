import styled from '@emotion/styled';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const Section1 = () => {
  const { ref, isShow } = useIntersectionObserver();

  return (
    <Styled.Box ref={ref} className={isShow ? 'open' : 'section1'}>
      <p>
        향긋한 커피향이 가득한 야외 테라스와 실내 카페에서
        편안하게 휴식과 담소를 나누실 수 있습니다
        <span>아메리카노, 수정과를 제공합니다</span>
      </p>
      <Styled.Image src="/assets/images/noti_01.png" alt="카페 마리아쥬" className="right" />
    </Styled.Box>
  );
};

const Section2 = () => {
  const { ref, isShow } = useIntersectionObserver();

  return (
    <Styled.Box ref={ref} className={isShow ? 'open' : 'section2'}>
      <Styled.Image src="/assets/images/noti_02.png" alt="지금여기 포토부스" />
      <p>
        축복과 기쁨을 함께 나누고자
        포토부스를 설치합니다.
        즐거운 순간을 마음껏 담아가세요
      </p>
    </Styled.Box>
  );
};

export const Notification = () => {
  return (
    <Styled.Wrapper>
      <Styled.Title>
        <img src="/assets/images/title.png" alt="" />
        <h2>
          안내사항
        </h2>
        <p>
          참석해주시는 분들께 감사한 마음을 담아 준비했습니다
        </p>
      </Styled.Title>
      <Section1 />
      <Section2 />
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    margin: 10rem auto;
    max-width: 40rem;
    display: grid;
    gap: 3rem;
    width: 100%;
  `,
  Title: styled.div`
    position: relative;
    display: grid;
    gap: 1rem;
    justify-items: center;

    & h2 {
      width: 100%;
      font-size: 1.5rem;
      font-weight: 400;
      text-align: center;
      padding: 0.5rem 0;
      box-sizing: border-box;
      color: #fff;
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    }

    & p {
      font-size: 0.8rem;
      color: #888;
    }
    & img {
      position: absolute;
      width: 9.5rem;
      z-index: -1;
      left: 50%;
      top: -0.3rem;
      transform: translateX(-50%);
    }
  `,
  Box: styled.div`
    margin: 0 auto;
    max-width: 90%;
    display: grid;
    grid-template-columns: auto auto;
    gap: 1rem;
    overflow: hidden;
    transition: 1s 300ms;

    & p {
      padding: 3rem 2rem;
      font-size: 1rem;
      line-height: 1.5;
      word-break: keep-all;
    }

    & span {
      display: block;
      margin-top: 1rem;
      font-size: 0.8rem;
      color: #888;
      line-height: 1;
    }

    &.section1, &.section2, &.section3 {
      opacity: 0;
    }

    &.open {
      opacity: 1;
      transform: translateX(0);
    }

    &.section1 {
      transform: translateX(-100%);
    }

    &.section2 {
      transform: translateX(100%);
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
      gap: 0;
      & p {
        padding: 2rem 2rem 0;
      }
    }
    
    &:last-of-type {
      @media (max-width: 768px) {
        margin-top: -8rem;
      }
    }
  `,
  Image: styled.img`
    border-radius: 50%;
    width: 100%;
    object-fit: cover;
    aspect-ratio: 1;
    
    @media (max-width: 768px) {
      max-width: 200px;
      &.right {
        margin-left: auto;
      }
    }
  `,
};