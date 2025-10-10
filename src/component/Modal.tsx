import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

type Props = {
  start?: 'left' | 'right';
  modalRef: React.RefObject<HTMLDialogElement>;
};

const Inner = (props: React.PropsWithChildren<Props>) => {
  const { modalRef, children } = props;

  const handleClose = () => {
    if (!modalRef.current) return;
    modalRef.current.close();
  };

  useEffect(() => {
    const prevScrollY = preventScroll();
    return () => {
      allowScroll(prevScrollY);
    };
  }, []);

  return <Styled.Content>{children}
    <Styled.Close onClick={handleClose}>닫기</Styled.Close>
  </Styled.Content>;
};

export const Modal = (props: React.PropsWithChildren<Props>) => {
  const { start = 'right', modalRef } = props;

  const { isShow } = useIntersectionObserver({ ref: modalRef });

  return (
    <Styled.Wrapper ref={modalRef} className={start}>
      {isShow && <Inner {...props} />}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.dialog`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    border: none;
    width: 100dvw;
    height: 100dvh;
    max-width: 100dvw;
    max-height: 100dvh;
    opacity: 0;
    transition: all 300ms;

    &[open] {
      opacity: 1;

    }

    @starting-style {
      &[open] {
        &.left {
          transform: translate(-100%, 100%) scale(0);
          border-radius: 50% 50% 50% 0;
        }

        &.right {
          transform: translate(100%, 100%) scale(0);
          border-radius: 50% 50% 0 50%;
        }
      }
    }
  `,
  Content: styled.div`
    padding: 2rem;
    display: grid;
    grid-template-rows: 1fr auto;
    justify-items: center;
    gap: 1.5rem;
    height: 100%;
  `,
  Close: styled.button`
    cursor: pointer;
    border: none;
    border-radius: 1rem;
    background: #EFEFEF;
    width: 100%;
    max-width: 400px;
    padding: 0.725rem 0;
    box-sizing: border-box;
    transition: background 200ms;
    color: #555;
    font-size: 0.8rem;
    font-weight: 400;

    &:hover {
      background: #DDD;
    }
  `,
};

export const preventScroll = () => {
  const scrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.overflowY = 'scroll';
  return scrollY;
};

export const allowScroll = (scrollY: number) => {
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.top = '';
  document.body.style.overflowY = '';
  window.scrollTo(0, scrollY);
};
