import { css } from "@emotion/react";

export const layout = css`
  width: 100vw;
  height: 100vh;
  overflow: auto; 
  -ms-overflow-style: none; 
  scrollbar-width: none; 
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column;
`;

