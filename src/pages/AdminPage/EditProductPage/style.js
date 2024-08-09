import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto; /* 세로 스크롤 활성화 */
  overflow-x: hidden; /* 가로 스크롤 숨김 */
  ::-webkit-scrollbar {
    width: 10px; /* 스크롤바의 너비 */
  }

  ::-webkit-scrollbar-thumb {
    height: 20%;
    background: #ababaf;

    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(179, 179, 179, 0.1);
  }
`;

export const container = css`
  width: 95%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 40px;
`;

export const buttonBox = css`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  button:nth-of-type(1) {
    border: none;
    background-color: transparent;
    &:hover .tooltip {
      visibility: visible;
      opacity: 1;
    }
  }

  button:nth-of-type(2) {
    cursor: pointer;
    box-sizing: border-box;
    padding: 10px 18px;
    border: 1px solid #dbdbdb;
    background-color: #fff;
    border-radius: 8px;

    :hover {
      background-color: #f7f7f7;
    }
  }
`;

export const tooltipStyle = css`
  visibility: hidden;
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 5px 8px;
  border-radius: 4px;
  position: relative;
  z-index: 1;
  bottom: -70%; /* 버튼의 위에 툴팁이 나타나도록 설정 */
  left: -50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;

  /* 화살표 */
  &::after {
    content: "";
    position: absolute;
    top: -35%; /* 툴팁의 아래쪽에 화살표 위치 */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #333 transparent;
  }
`;

export const imageContainer = css`
  width: 30%;
  height: auto;
  position: relative;
  display: flex;
  left: 3%;
  align-items: center;
  justify-content: center;
  display: inline-block;
`;

export const inputBox = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

export const input = css`
  display: flex;
  flex-direction: column;
  width: 96%;
  border: 1px solid #dbdbdb;
  border-radius: 10px;

  .row {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    /* border: 1px solid #ddd; */
  }

  .cell {
    border-radius: 10px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-sizing: border-box;
    border: none;
  }

  label {
    width: 160px;
    text-align: center;
    background-color: #f7f7fb;
    padding: 12px 0;
  }

  input,
  select {
    width: 97%;
    height: 46px;
    padding: 10px;
    border: 1px solid #dddddd00;
    box-sizing: border-box;
    border-radius: 10px;
  }

  input:focus,
  select:focus,
  textarea:focus {
    border: 1px solid #ddd;
    transition: border-color 0.3s ease;
    outline: none;
    /* background-color: #f1f1f134; */
  }

  textarea {
    width: 100%;
    height: 103px;
    padding: 12px;
    resize: none;
    box-sizing: border-box;
    border: 1px solid #dddddd00;
    border-top: 1px solid #ddd;
    border-bottom-right-radius: 10px;
  }

  .product-description-label {
    text-align: center;
    padding-top: 35px;
    height: 55px;
    border-top: 1px solid #ddd;
    background-color: #f7f7fb;
    border-bottom-left-radius: 10px;
  }

  .full-width {
    flex: 1;
  }

  .product-name-label {
    border-top-left-radius: 10px;
  }
`;

export const editButton = css`
  position: relative;
  top: -15px;
  left: 40%;
  color: #090909;
  padding: 10px 15px;
  font-size: 15px;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  border: 1px solid #e8e8e8;
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
`;

export const editOkButton = css`
  position: relative;
  color: #090909;
  padding: 10px;
  right: 4%;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  border: 1px solid #e8e8e8;
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
`;

export const productLayout = css`
  box-sizing: border-box;
  width: 55%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: aqua; */
`;

export const productBox = css`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  cursor: default;
`;
export const product = css`
  width: 100%;
`;

export const table = css`
  width: 100%;
  border-spacing: 10px 15px;

  th,
  td {
    /* border: 1px solid #ddd; */
    border: 1px solid #ddd;
    padding: 15px 0;
    text-align: center;
    color: #333;
    border-radius: 8px;
  }

  th {
    background-color: #f7f7fb;
    width: 35%;
    font-weight: 400;
    border-right: none;
  }

  td {
    background-color: #fff;
  }

  tr:nth-of-type(3) td {
    padding: 10px 0;
    line-height: 1.5;
    overflow-y: auto;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-thumb {
      height: 30%;
      background: #dbdbdb;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
      background: rgba(177, 177, 177, 0.1);
    }
  }
`;

export const optionTitle = css`
  font-size: 27px;
  font-weight: 400;
  margin: 0 15px 20px 15px;
  color: #333;
`;

export const optionLayout = css`
  width: 100%;
  height: 280px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px 45px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 6px; /* 스크롤바의 너비 */
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

export const optionContainer = css`
  width: 43%;
  height: 90px;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
  background-color: #f7f7fb;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin: 0;
    padding: 5px 0 20px 0;
    font-size: 15px;
    font-weight: 600;
    color: #333;
  }
`;
