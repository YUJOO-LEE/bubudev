import { css, Global } from '@emotion/react';

const GlobalStyled = () => {
  return <Global styles={css`
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
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