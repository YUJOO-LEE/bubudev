import styled from '@emotion/styled';
import { useRef } from 'react';
import { Modal } from '../../component/Modal.tsx';
import { CONTACT } from './@constants.ts';
import { Contact } from './@components/Contact.tsx';

export const Bank = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleClick = () => {
    modalRef.current?.showModal();
  };

  return (
    <Styled.Wrapper>
      <Styled.Title>
        <img src="/assets/images/title.png" alt="" />
        <h2>마음 전하실 곳</h2>
      </Styled.Title>
      <Styled.Content>
        모든 분들이 결혼식에 참석해 주신다면<br/>
        더할 나위 없이 기쁘겠지만,<br/>
        부득이하게 참석이 어려우신 분들을 위해<br/>
        마음을 전하실 곳을 마련했습니다.<br/><br/>
        축복해 주시는 마음만으로도 충분히 감사드리며,<br/>
        혹시나 마음을 전하시고 싶으신 분들은<br/>
        아래 계좌로 부탁드립니다.
      </Styled.Content>
      <Styled.Button onClick={handleClick}>
        계좌번호 안내
      </Styled.Button>
      <Modal modalRef={modalRef}>
        <Contact data={CONTACT}/>
      </Modal>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    margin: 10rem auto 0;
    display: grid;
    gap: 3rem;
    width: 100%;
    max-width: min(90%, 40rem);
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

    & img {
      position: absolute;
      width: 12rem;
      height: 4rem;
      z-index: -1;
      left: 50%;
      top: -0.5rem;
      transform: translateX(-50%);
    }
  `,
  Content: styled.div`
    font-size: 0.9rem;
    font-weight: 400;
    color: #888;
    text-align: center;
    line-height: 1.6;
  `,
  Box: styled.div`
    display: grid;
    gap: 1rem;
  `,
  Button: styled.button`
    border: none;
    cursor: pointer;
    border-radius: 1rem;
    background-color: rgba(255, 255, 255, 0.4);
    font-size: 0.9rem;
    font-weight: 500;
    padding: 0.725rem 1rem;
    transition: background-color 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
    color: #333;
    
    &:hover {
      background-color: #FFFFFF80;
    }
  `,
};