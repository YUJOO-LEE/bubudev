import { css, Global } from '@emotion/react';

const GlobalStyled = () => {
  return <Global styles={css`
    @import url('https://fonts.googleapis.com/css2?family=Gaegu&display=swap');
    @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css");    
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      font-family: "Pretendard Variable", sans-serif;
      font-optical-sizing: auto;
    },
    body {
      background-color: #FFF7EE;
    }
    ul,li,ol {
      list-style: none;
      padding: 0;
    },
    a {
      color: inherit;
      text-decoration: none;
    },
    p {
      font-weight: 300;
    },
    strong {
      font-weight: 600;
    },
  `} />
};

export default GlobalStyled;