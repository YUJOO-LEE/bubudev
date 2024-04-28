import styled from '@emotion/styled';

export const Main = () => {

  return (
    <Styled.Wrapper>
      <Styled.Logo>
        <Styled.SubTitle>
          우리는 부부 개발자!
        </Styled.SubTitle>
        <Styled.Bubu>
          BUBU
        </Styled.Bubu>
        <Styled.Dev>
          .DEV
        </Styled.Dev>
      </Styled.Logo>
      <Styled.Hyungjun>
        <Styled.Inner>
          <img src="/assets/images/memoji-hyungjun.png" alt="Hyungjun"/>
          <strong>HYUNG-JUN</strong>
          <p>Back-end developer</p>
        </Styled.Inner>
      </Styled.Hyungjun>
      <Styled.Yujoo>
        <Styled.Inner>
          <img src="/assets/images/memoji-yujoo.png" alt="Yujoo"/>
          <strong>YUJOO</strong>
          <p>Front-end developer</p>
        </Styled.Inner>
      </Styled.Yujoo>
    </Styled.Wrapper>
  )
};

const Styled = {
  Wrapper: styled.div`
    position: relative;
    width: 100%;
    height: 100dvh;
    overflow: hidden;
  `,
  Logo: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    display: grid;
    justify-items: flex-end;
    line-height: 1;
  `,
  SubTitle: styled.strong`
    color: #FCEC52;
    font-size: 1.2rem;
    justify-self: flex-start;
  `,
  Bubu: styled.p`
    font-size: 10rem;
    letter-spacing: -0.5rem;
    transform: rotate3d(1, 1, 1, -10deg);
    text-shadow: -0.5rem -0.5rem 0 rgba(0, 0, 0, 0.22);

    font-family: "Jua", sans-serif;
    font-weight: 400;
  `,
  Dev: styled.p`
    margin-top: -2.5rem;
    font-size: 3rem;
    letter-spacing: -0.1rem;
    transform: rotate3d(1, 1, 1, 10deg);
    text-shadow: 0.4rem 0.1rem 0 rgba(0, 0, 0, 0.22);

    font-family: "Jua", sans-serif;
    font-weight: 400;
  `,
  Hyungjun: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    display: grid;
    place-items: flex-end;
    border-radius: 0 50% 50% 0;
    background-color: white;
    transform: translateX(-50%);
    transition: .2s;

    &:hover {
      transform: translateX(-40%);
    }
  `,
  Yujoo: styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    display: grid;
    place-items: flex-start;
    border-radius: 50% 0 0 50%;
    background-color: white;
    transform: translateX(50%);
    transition: .2s;

    &:hover {
      transform: translateX(40%);
    }
  `,
  Inner: styled.div`
    width: 50%;
    height: 100%;
    display: grid;
    justify-items: center;
    align-content: center;
    gap: 1rem;

    & img {
      width: 70%;
      aspect-ratio: 1;
    }

    & strong {
      font-size: 1.2rem;
    }

    & p {
      font-size: 1rem;
      line-height: 1;
    }
  `,
};