// src/components/ProductComponents/ImageUpload/style.js
import { css } from "@emotion/react";

export const imageContainer = css`
  width: 100%;
  max-width: 100%; /* 원하는 최대 너비로 설정 */
  height: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
`;

export const productImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지가 컨테이너를 채우도록 조정 */
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
