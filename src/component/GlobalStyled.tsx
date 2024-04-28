import { css, Global } from '@emotion/react';

const GlobalStyled = () => {
  return <Global styles={css`
    @import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Jua&family=Noto+Sans+KR:wght@100..900&display=swap');
    
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      font-family: "Noto Sans KR", sans-serif;
      font-optical-sizing: auto;
    },
    ul,li,ol {
      list-style: none;
      padding: 0;
    },
    a {
      color: inherit;
      text-decoration: none;
    },
  `} />
};

export default GlobalStyled;