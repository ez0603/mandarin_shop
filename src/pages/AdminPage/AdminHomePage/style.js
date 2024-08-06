import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
  height: 100%;
  overflow: auto; 
  -ms-overflow-style: none; 
  scrollbar-width: none; 
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: aqua;
`;

export const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: aqua;
`;



