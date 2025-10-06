import styled from '@emotion/styled';
import { Container, Marker, NaverMap, useNavermaps } from 'react-naver-maps';

export const Map = () => {
  const maps = useNavermaps()
  const target = new maps.LatLng(37.5222626, 127.0369346);

  return (
    <Styled.Wrapper>
      <Styled.Title>
        <h2>찾아오시는 길</h2>
        <p>서울특별시 강남구 도산대로 318 SB타워 G층 마리아쥬스퀘어</p>

        <Styled.ButtonWrapper>
          <Styled.Button href="https://naver.me/FwjBieLy" target="_blank" rel="noopener noreferrer">
            네이버지도
          </Styled.Button>
          <Styled.Button href="https://tmap.life/d67e5cab" target="_blank" rel="noopener noreferrer">
            TMAP
          </Styled.Button>
        </Styled.ButtonWrapper>
      </Styled.Title>
      <Styled.MapContainer>
        <NaverMap defaultCenter={target} defaultZoom={15}>
          <Marker position={target} />
        </NaverMap>
      </Styled.MapContainer>
      <Styled.Section>
        <Styled.Box>
          <h3>지하철</h3>
          <p>7호선, 분당선 강남구청역 하차</p>
          <p>강남구청역  3번 출구</p>
          <p><span>셔틀버스 이용</span> 또는 학동사거리 방면 도보 10분</p>
        </Styled.Box>
        <Styled.Box>
          <h3>버스</h3>
          <p>제일은행.호림아트센터앞 [23-125]</p>
          <p><span className="bus1">간선버스</span> 145, 440</p>
          <p><span className="bus2">지선버스</span> 3011, 4212</p>
        </Styled.Box>
        <Styled.Box>
          <h3>주차안내</h3>
          <p>"마리아쥬스퀘어" 검색</p>
          <p>SB타워 B2~B4층 (주차장 입구: 건물후면)</p>
        </Styled.Box>
      </Styled.Section>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    position: absolute;
    left: 50%;
    top: 72%;
    transform: translateX(-50%);
    display: grid;
    gap: 3rem;
    width: 100%;
    max-width: min(90%, 40rem);
  `,
  Title: styled.div`
    display: grid;
    gap: 1rem;
    justify-items: center;
    & h2 {
      font-size: 1.5rem;
      font-weight: 400;
    }
    & p {
      font-size: 0.8rem;
      color: #888;
    }
  `,
  MapContainer: styled(Container)`
    height: 40dvh;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
    @media (min-width: 768px) {
      max-height: 300px;
    }
  `,
  Section: styled.div`
    display: grid;
    gap: 1.3rem;
  `,
  Box: styled.div`
    display: grid;
    gap: 0.5rem;
    padding: 0 0.5rem;

    & h3 {
      font-size: 1rem;
      font-weight: 500;
      padding-bottom: 0.3rem;
    }

    & p {
      font-size: 0.9rem;
      line-height: 1.2;
      color: #555;
    }

    & span {
      text-decoration: underline rgb(255, 180, 99) wavy;
    }

    & span.bus1 {
      text-decoration: underline rgb(183, 222, 255) wavy;
    }

    & span.bus2 {
      text-decoration: underline rgb(182, 221, 113) wavy;
    }

    & + & {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      padding-top: 1.3rem;
    }
  `,
  ButtonWrapper: styled.div`
    display: flex;
    align-items: center;
  `,
  Button: styled.a`
    cursor: pointer;
    border-radius: 1rem;
    background-color: #fff;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    transition: background-color 0.3s ease;
    border: none;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);

    &:hover {
      background-color: #FFFFFF80;
    }
    
    & + & {
      margin-left: 1rem;
    }
  `,
};