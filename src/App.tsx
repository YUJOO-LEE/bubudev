import styled from '@emotion/styled';

const App = () => {

  return (
    <Styled.wrapper>
      부부는 개발중...
    </Styled.wrapper>
  )
};

export default App;

const Styled = {
  wrapper: styled.div({
    width: '100dvw',
    height: '100dvh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
};