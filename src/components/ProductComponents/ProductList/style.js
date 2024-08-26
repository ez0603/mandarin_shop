// style.js
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
`;

export const container = css`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  align-items: center;
  gap: 8%;
  padding: 20px;
`;

export const imgBox = css`
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const imgStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
`;

export const product = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding-top: 20px;
`;
