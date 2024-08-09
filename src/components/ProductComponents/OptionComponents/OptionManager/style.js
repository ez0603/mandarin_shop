import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const header = css`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  button {
    box-sizing: border-box;
    padding: 10px 15px;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
  }
`;

export const optionsAndEditor = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const optionsContainer = css`
  width: 70%; /* 옵션 목록의 너비를 65%로 설정 */
  background-color: #fff;
  height: 350px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
  }

  ::-webkit-scrollbar-thumb {
    height: 30%;
    background: #217af4;

    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1);
  }
`;

export const optionLayout = css`
  background-color: orange;
  padding: 35px;
`;

export const optionContainer = css`
  background-color: aqua;
  padding-top: 10px;
`;

export const updateContainer = (isVisible) => css`
  width: 30%; /* 수정 컨테이너의 너비를 30%로 설정 */
  display: flex;
  flex-direction: column;
  background-color: ${isVisible ? "#fff" : "transparent"};
  padding: 15px;
  box-shadow: ${isVisible ? "0px 0px 10px rgba(0, 0, 0, 0.1)" : "none"};
  position: relative; /* fixed로 위치를 제어하여 화면에 고정되게 설정 */
  left: -31%;
  transform: ${isVisible ? "translateX(100%)" : "translateX(0)"};
  opacity: ${isVisible ? "1" : "0"}; /* 투명도 설정 */
  transition: transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out, opacity 0.7s ease-in-out; /* 위치 이동과 그림자, 투명도에 대한 트랜지션 설정 */
  z-index: ${isVisible ? "1" : "-1"}; /* z-index를 사용하여 요소가 겹치지 않도록 제어 */
  pointer-events: ${isVisible ? "auto" : "none"};
`;



export const updateButtons = css`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  button {
    margin-left: 10px;
  }
`;
