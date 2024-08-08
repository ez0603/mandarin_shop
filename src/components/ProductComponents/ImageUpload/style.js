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

  &:hover div {
    cursor: pointer;
    opacity: 1;
  }
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
  cursor: pointer;
`;

export const overlay = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;
