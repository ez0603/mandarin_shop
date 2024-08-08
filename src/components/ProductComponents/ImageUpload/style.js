// style.js
import { css } from "@emotion/react";

export const imageContainer = css`
  width: 100%;
  max-width: 500px;
  height: 500px;
  position: relative; 
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px;
`;

export const productImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover; 
  object-position: center;
`;

export const fileInput = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`;

export const overlay = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

export const loader = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.404); /* 불투명 배경 추가 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10; /* 로딩 스피너가 다른 요소 위에 나타나도록 설정 */
`;
