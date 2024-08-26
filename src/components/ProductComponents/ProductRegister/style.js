import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: wheat;
`;

export const textContainer = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: aqua;
`;

export const category = css`
  width: 150px;
`;

export const imgBox = css`
  width: 250px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
`;
