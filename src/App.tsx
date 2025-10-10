import { NavermapsProvider } from 'react-naver-maps';
import { Main } from './Main';

const App = () => {
  return (
    <NavermapsProvider ncpKeyId="oyo4sfsgf5">
      <Main/>
    </NavermapsProvider>
  )
};

export default App;