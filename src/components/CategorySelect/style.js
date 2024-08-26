
import { css } from "@emotion/react";

export const customSelectContainer = css`
  position: relative;
  width: 100%;
`;

export const customSelectButton = css`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #fff;
  font-size: 13px;
  cursor: pointer;
  text-align: center;
  position: relative;
  appearance: none;
  color: #333;
`;

export const customSelectOptions = css`
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 7px;
  overflow-y: auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: none;

  &.open {
    display: block;
  }

  div {
    padding: 10px;
    font-size: 13px;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

