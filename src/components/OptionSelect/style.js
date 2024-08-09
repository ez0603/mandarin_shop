
import { css } from "@emotion/react";

export const customSelectContainer = css`
  position: relative;
  width: 96%;
`;

export const customSelectButton = css`
  width: 100%;
  padding: 9px;
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid #ccc;
  font-size: 13px;
  cursor: pointer;
  text-align: center;
  position: relative;
  appearance: none;
  color: #333;

  &:focus {
    border-color: #999;
    outline: none;
  }
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
  max-height: 200px; /* 옵션 목록이 길어질 경우를 대비해 최대 높이 설정 */
  visibility: hidden; /* 기본값을 visibility: hidden으로 설정 */
  opacity: 0; /* 기본값을 opacity: 0으로 설정 */
  transition: opacity 0.3s ease, visibility 0.3s ease; /* 트랜지션 추가 */

  &.open {
    visibility: visible;
    opacity: 1;
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
