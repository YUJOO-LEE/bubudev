import styled from '@emotion/styled';
import { useRef } from 'react';
import { Modal } from '../../component/Modal.tsx';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Contact } from './@components/Contact.tsx';
import { BRIDE_CONTACT, GROOM_CONTACT } from './@constants.ts';

export const Info = () => {
  const { ref, isShow } = useIntersectionObserver({ threshold: [0, 0.5, 1], ratio: 0.5 });

  const groomModalRef = useRef<HTMLDialogElement>(null);
  const brideModalRef = useRef<HTMLDialogElement>(null);

  const handleGroomClick = () => {
    groomModalRef.current?.showModal();
  };
  const handleBrideClick = () => {
    brideModalRef.current?.showModal();
  };

  return (
    <Styled.Wrapper ref={ref}>
      <Styled.Box isShow={isShow}>
        <Styled.Title style={{ textAlign: 'right' }}>신랑</Styled.Title>
        <Styled.Name>
          <p>박상원 · 최효순<span>의 아들</span></p>
          <strong>박형준</strong>
        </Styled.Name>
        <Styled.Button onClick={handleGroomClick}>
          혼주에게 연락하기
        </Styled.Button>
      </Styled.Box>
      <Styled.Box isShow={isShow} style={{ transitionDelay: '300ms' }}>
        <Styled.Title style={{ textAlign: 'left' }}>신부</Styled.Title>
        <Styled.Name>
          <p>이인재 · 권희숙<span>의 딸</span></p>
          <strong>이유주</strong>
        </Styled.Name>
        <Styled.Button onClick={handleBrideClick}>
          혼주에게 연락하기
        </Styled.Button>
      </Styled.Box>
      <Modal modalRef={groomModalRef} start="left">
        <Contact type="groom" data={GROOM_CONTACT}/>
      </Modal>
      <Modal modalRef={brideModalRef}>
        <Contact type="bride" data={BRIDE_CONTACT}/>
      </Modal>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    padding: 17rem 10% 8rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    gap: 5%;
    background: url('/assets/images/info.jpg') no-repeat center/cover;

    @media (max-width: 768px) {
      top: 7%;
      padding: 10rem 10% 8rem;
      grid-template-columns: 1fr;
      gap: 5rem;
    }

    /* webkit 브라우저용 */
    -webkit-mask-image: -webkit-linear-gradient(to bottom,
    transparent 0%,
    black 200px,
    black calc(100% - 200px),
    transparent 100%
    );
    -webkit-mask-size: 100% 100%;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;

    /* 표준 브라우저용 */
    mask-image: linear-gradient(to bottom,
    transparent 0%,
    black 200px,
    black calc(100% - 200px),
    transparent 100%
    );
    mask-size: 100% 100%;
    mask-repeat: no-repeat;
    mask-position: center;
  `,
  Box: styled.div<{ isShow: boolean }>`
    width: 100%;
    max-width: 400px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 1rem;
    box-shadow: 0 40px 60px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    transition: 1s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s ease;
    transform: translateY(${(props) => (props.isShow ? '0' : '50%')});
    opacity: ${(props) => (props.isShow ? 1 : 0)};
    will-change: backdrop-filter;
    display: grid;
  `,
  Name: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3rem 2rem 2rem;

    & strong {
      font-size: 1.2rem;
    }

    & span {
      font-weight: 300;
      font-size: 0.9rem;
    }
  `,
  Title: styled.div`
    position: absolute;
    top: -1.8rem;
    left: 0;
    width: 100%;
    padding: 0 1rem;
    font-weight: 600;
    color: #fff;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.3);

    @media (max-width: 768px) {
      text-align: left !important;
    }
  `,
  Button: styled.button`
    border: none;
    cursor: pointer;
    border-radius: 0 0 1rem 1rem;
    background-color: #FFFFFF40;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 0.725rem 1rem;
    transition: background-color 0.3s ease;
    color: #333;

    &:hover {
      background-color: #FFFFFF80;
    }
  `,
};