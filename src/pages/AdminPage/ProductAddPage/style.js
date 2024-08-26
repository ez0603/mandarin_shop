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
`;

export const container = css`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
gap: 30px;
`;

export const productLayout = css`
background-color: aqua;
width: 90%;
height: 40%;
`;

export const optionLayout = css`
background-color: orange;
width: 90%;
height: 40%;
`;

export const productInsert = css`
width: 100%;
height: 100%;
`;

