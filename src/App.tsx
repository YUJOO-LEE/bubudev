import { useEffect } from 'react';
import { NavermapsProvider } from 'react-naver-maps';
import { Main } from './Main';

const App = () => {

  useEffect(() => {
    document.body.animate(
      [
        { backgroundColor: '#FFF7EE', offset: 0 },
        { backgroundColor: '#FFF7EE', offset: 0.5 },
        { backgroundColor: '#ffc2b0', offset: 0.51 },
        { backgroundColor: '#ffeef7', offset: 0.7 },
        { backgroundColor: '#fbffda', offset: 0.9 },
        { backgroundColor: '#deeab3', offset: 1 },
      ],
      {
        fill: 'both',
        timeline: new ScrollTimeline({
          scrollOffsets: [
            { target: document.body, edge: 'start', threshold: 1 },
            { target: document.body, edge: 'end', threshold: 1 },
          ],
        }) as any,
      })
  }, []);

  return (
    <NavermapsProvider
      ncpKeyId="oyo4sfsgf5"
    >
      <Main/>
    </NavermapsProvider>
  )
};

export default App;