import styled from '@emotion/styled';

export const Message = () => {
  return (
    <Styled.Wrapper>
      <Styled.Title>
        <Styled.Image src="/assets/images/title.png" alt="" />
        우리 <span>드디어</span> 결혼합니다
      </Styled.Title>
      <Styled.Message>
        평생을 함께할 사람과 뜻깊은 시간을 갖고자 합니다.<br/>
        항상 사랑해주신 분들께 감사의 마음을 전하며,<br/>
        이 기쁜 날을 함께 나누고 싶습니다.<br/>
        많은 축복과 격려 부탁드립니다.
      </Styled.Message>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: grid;
    gap: 1.5rem;
  `,
  Title: styled.div`
    position: relative;
    text-align: center;
    font-size: 1.5rem;
    
    & span {
      @keyframes bounce {
        0% {
          transform: rotate(-10deg) translateY(-2%);
        }
        100% {
          transform: rotate(10deg) translateY(-2%);
        }
      }
      
      font-family: 'Gaegu', sans-serif;
      font-size: 2.2rem;
      display: inline-block;
      animation: bounce 1s infinite alternate;
      color: #fff;
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    }
  `,
  Image: styled.img`
    position: absolute;
    width: 7.5rem;
    z-index: -1;
    left: 50%;
    top: -0.2rem;
    transform: translateX(calc(-50% - 2rem));
  `,
  Message: styled.div`
    font-size: 0.9rem;
    line-height: 1.8;
    text-align: center;
  `,
};