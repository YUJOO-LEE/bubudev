import styled from '@emotion/styled';
import { Main } from './Main';

const App = () => {

  return (
    <Styled.Wrapper>
      <Main />
    </Styled.Wrapper>
  )
};

export default App;

const Styled = {
  Wrapper: styled.div`
    background: linear-gradient(to right, #99CA3C, #F78E31);
  `,
};