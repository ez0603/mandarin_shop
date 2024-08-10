import { css } from "@emotion/react";

export const layout = css`
  box-sizing: border-box;
  width: calc(100% - 250px); /* 사이드바를 제외한 나머지 공간 */
  height: 100%;
  margin-left: 250px; /* 사이드바의 너비만큼 왼쪽 여백 추가 */
  background-color: #f7f7fb;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
