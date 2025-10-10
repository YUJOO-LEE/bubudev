import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { Modal } from '../../component/Modal';

const images = [
  { src: "/assets/images/pic_2.jpg", transform: "rotate(5deg)" },
  { src: "/assets/images/pic_3.jpg", transform: "rotate(-7deg) translateX(-5%)" },
  { src: "/assets/images/pic_4.jpg", transform: "rotate(-12deg) translateX(5%)" },
  { src: "/assets/images/pic_5.jpg", transform: "rotate(8deg)" },
  { src: "/assets/images/pic_6.jpg", transform: "rotate(5deg)", gridColumn: "span 2" }
];

type Props = {
  src: string;
  style: React.CSSProperties;
  isShow: boolean;
  onClick: () => void;
};

const Image = (props: Props) => {
  const { src, style, isShow, onClick } = props;

  return (
    <Styled.Item style={style} className={isShow ? 'show' : ''} onClick={onClick}>
      <img src={src} alt="사진"/>
    </Styled.Item>
  );
};

export const Gallery = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const [target, setTarget] = useState<number>(0);
  const [modalImage, setModalImage] = useState<string>('');

  const handleImageClick = (src: string) => () => {
    setModalImage(src);
    modalRef.current?.showModal();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTarget((prev) => (prev < 4 ? prev + 1 : 0));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Styled.Wrapper>
      <Styled.Title>
        <img src="/assets/images/title.png" alt="" />
        <h2>
          갤러리
        </h2>
        <p>
          클릭하시면 사진을 크게 보실 수 있습니다
        </p>
      </Styled.Title>
      <Styled.Inner>
        {images.map((image, index) => (
          <Image
            key={index}
            isShow={target === index}
            style={{
              transform: image.transform,
              ...(image.gridColumn && { gridColumn: image.gridColumn })
            }}
            src={image.src}
            onClick={handleImageClick(image.src)}
          />
        ))}
      </Styled.Inner>
      <Modal modalRef={modalRef}>
        <Styled.ZoomImage src={modalImage} alt="사진"/>
      </Modal>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    margin: 0 auto;
    max-width: 40rem;
    display: grid;
    gap: 3rem;
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
      width: 8rem;
      z-index: -1;
      left: 50%;
      top: -0.1rem;
      transform: translateX(-50%);
    }
  `,
  Inner: styled.div`
    padding: 0 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;

    &:has(:hover) {
      &>div:hover {
        z-index: 10;
        transform: scale(1.1) !important;
      }
      &>div:not(:hover) {
        filter: blur(1px);
        opacity: 0.7;
      }
    }
  `,
  Item: styled.div`
    padding: 0.5rem 0.5rem 2rem;
    display: grid;
    background: #fff;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
    transition: transform 300ms, filter 500ms, opacity 500ms;
    cursor: pointer;
    
    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    
    &.show {
      z-index: 1;
      transform: scale(1.05) !important;
    }
  `,
  ZoomImage: styled.img`
    width: 90dvw;
    height: 80dvh;
    object-fit: contain;
  `,
};