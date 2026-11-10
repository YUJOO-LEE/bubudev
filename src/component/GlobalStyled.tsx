import { css, Global } from '@emotion/react';

const GlobalStyled = () => {
  return <Global styles={css`
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      font-family: inherit;
      font-optical-sizing: auto;
    }
    html, body {
      scroll-behavior: smooth;
    }
    body {
      background-color: #fff8ed;
      width: 100%;
      color: #59343c;
      font-family: 'Pretendard Variable', sans-serif;
      -webkit-font-smoothing: antialiased;
      font-size: 18px;
    }
    ul,li,ol {
      list-style: none;
      padding: 0;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    p {
      font-weight: 400;
    }
    strong {
      font-weight: 600;
    }
    button { font: inherit; color: inherit; cursor: pointer; }
    button, a { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
    svg { display: block; }
    ::selection { background: #c5dac5; color: #59343c; }
    :focus-visible { outline: 2px solid #59343c; outline-offset: 6px; }
    [id] { scroll-margin-top: 32px; }
    html[data-motion='off'] { scroll-behavior: auto; }
    @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
  `} />
};

export default GlobalStyled;
