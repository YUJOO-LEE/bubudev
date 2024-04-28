import styled from '@emotion/styled';
import hyungjun from './assets/images/memoji-hyungjun.png';
import yujoo from './assets/images/memoji-yujoo.png';

const App = () => {

  return (
    <Styled.Wrapper>
      <Styled.Logo>
        <Styled.Bubu>
          BUBU
        </Styled.Bubu>
        <Styled.Dev>
          .DEV
        </Styled.Dev>
      </Styled.Logo>
      <Styled.Hyungjun>
        <Styled.Inner>
          <img src={hyungjun} alt="Hyungjun" />
        </Styled.Inner>
      </Styled.Hyungjun>
      <Styled.Yujoo>
        <Styled.Inner>
          <img src={yujoo} alt="Yujoo" />
        </Styled.Inner>
      </Styled.Yujoo>
    </Styled.Wrapper>
  )
};

export default App;

const Styled = {
  Wrapper: styled.div`
    position: relative;
    width: 100dvw;
    height: 100dvh;
    background: linear-gradient(to right, #99CA3C, #F78E31);
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
  SubTitle: styled.p`
    color: #FCEC52;
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
    place-items: center;
    & img {
      
    }
  `,
};