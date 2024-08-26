import { css } from "@emotion/react";

export const imageContainer = css`
  width: 100%;
  max-width: 550px;
  height: 550px;
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
  object-fit: contain;
  object-position: center;
  border-radius: 8px;
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
  background-color: rgba(0, 0, 0, 0.4); /* 불투명도 40% */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 8px;

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
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;
