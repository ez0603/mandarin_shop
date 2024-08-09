import { css } from "@emotion/react";

export const layout = css`
  width: 96%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const header = css`
  width: 101%;
  margin: 15px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-size: 25px;
    margin: 10px;
  }

  button {
    cursor: pointer;
    box-sizing: border-box;
    position: relative;
    padding: 10px 15px;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    background-color: #fff;
    transition: all 0.3s;
    box-shadow: 6px 6px 12px #c5c5c53d, -6px -6px 12px #ffffff;

    :hover {
      letter-spacing: 3px;
      background-color: #f7f7fb;
      box-shadow: rgba(190, 190, 190, 0.589) 0px 7px 29px 0px;
      cursor: pointer;
    }

    :active {
      color: #666;
      box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
    }
  }
`;

export const optionAddButton = (optionModal) => css`
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  padding: 10px 15px;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  background-color: #fff;
  transition: all 0.3s, opacity 0.5s ease-in-out;
  opacity: ${optionModal ? "0" : "1"};
  visibility: ${optionModal ? "hidden" : "visible"};
  box-shadow: 6px 6px 12px #c5c5c53d, -6px -6px 12px #ffffff;

  :hover {
    letter-spacing: 3px;
    background-color: #f7f7fb;
    box-shadow: rgba(190, 190, 190, 0.589) 0px 7px 29px 0px;
    cursor: pointer;
  }

  :active {
    color: #666;
    box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
  }
`;

export const optionsAndEditor = css`
  width: 98%;
  display: flex;
  justify-content: space-around;
`;

export const optionsContainer = css`
  width: 90%;
  background-color: #fff;
  height: 390px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
    height: 20%;
    background: #d6d6da;

    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(179, 179, 179, 0.1);
  }
`;

export const optionLayout = css`
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 46%;
  height: 180px;
  display: flex;
  flex-direction: column;
  
  h4 {
    font-size: 18px;
    margin: 15px;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

export const optionTitle = css`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;

  div {
    width: 20%;
    display: flex;
    justify-content: space-between;
  }
`;

export const optionContainer = css`
  padding: 20px;
  height: 120px;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  gap: 30px;
  word-break: break-word;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: #ababaf;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1);
  }
`;

export const optionName = css`
display: flex;
flex-direction: row;
width: auto;
gap: 15px;

div {
  display: flex;
  gap: 10px;
}
`;

export const updateContainer = (isVisible) => css`
  width: 30%; /* 수정 컨테이너의 너비를 30%로 설정 */
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background-color: ${isVisible ? "#fff" : "transparent"};
  padding: 15px;
  box-shadow: ${isVisible ? "0px 0px 10px rgba(0, 0, 0, 0.1)" : "none"};
  position: relative; /* fixed로 위치를 제어하여 화면에 고정되게 설정 */
  left: -25%;
  transform: ${isVisible ? "translateX(100%)" : "translateX(0)"};
  opacity: ${isVisible ? "1" : "0"}; /* 투명도 설정 */
  transition: transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out,
    opacity 0.7s ease-in-out; /* 위치 이동과 그림자, 투명도에 대한 트랜지션 설정 */
  z-index: ${isVisible
    ? "1"
    : "-1"}; /* z-index를 사용하여 요소가 겹치지 않도록 제어 */
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
