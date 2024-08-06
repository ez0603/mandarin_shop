import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const container = css`
  width: 85%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: orange;

`;

export const imageContainer = css`
width: 40%;
  position: relative;
  display: inline-block;
  background-color: aqua;
`;

export const productImage = css`
  width: 100%;
  height: auto;
`;

export const fileInput = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

export const productLayout = css`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: aqua;
`;
