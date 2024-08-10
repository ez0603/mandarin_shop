import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 10px;
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

export const header = css`
  width: 95%;
  height: 15%;
  padding: 30px 0 0 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;

  h1 {
    margin: 0;
    display: flex; /* Flexbox로 가로 배치 */
    align-items: center;
    cursor: default;
    font-weight: 500;
    font-size: 25px;
  }

  h1 svg {
    cursor: pointer;
    position: relative;
    margin-right: 8px;

    :hover {
      color: #0071e3;
    }

    /* svg 호버 시 툴팁 표시 */
    :hover + span.tooltip2 {
      visibility: visible;
      opacity: 1;
    }
  }

  span.tooltip2 {
    width: 70px;
    visibility: hidden;
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 8px 15px;
    border-radius: 4px;
    position: absolute;
    z-index: 1;
    bottom: 79%;
    left: 17%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 13px;
  }

  span.tooltip2::after {
    content: "";
    position: absolute;
    top: -30%; /* 화살표를 툴팁 아래에 배치 */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #333 transparent;
  }
`;


export const container = css`
  width: 97%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
  padding-top: 20px;
`;

export const imageContainer = css`
  width: 30%;
  height: auto;
  position: relative;
  top: 7%;
  left: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const productLayout = css`
  box-sizing: border-box;
  width: 60%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
    cursor: pointer;
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
  bottom: 130%;
  left: -50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  box-shadow: 0 5px 5px rgba(136, 136, 136, 0.199);

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 5px 20px rgba(136, 136, 136, 0.233);
  }

  .row {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
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
    background-color: #68b2f1;
    padding: 13px 0;
    color: white;
  }

  input,
  select {
    width: 97%;
    height: 46px;
    padding: 10px;
    border: 1px solid #dddddd00;
    box-sizing: border-box;
  }

  input:focus,
  select:focus,
  textarea:focus {
    border: 1px solid #ddd;
    transition: border-color 0.3s ease;
    outline: none;
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
    border-bottom-left-radius: 10px;
    background-color: #68b2f1;
  }

  .full-width {
    flex: 1;
  }

  .product-name-label {
    border-top-left-radius: 10px;
  }
`;

export const productBox = css`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: default;
`;

export const product = css`
  width: 100%;
`;

export const table = css`
  overflow: hidden;
  border-radius: 10px;
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-collapse: collapse;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 5px 5px rgba(136, 136, 136, 0.199);

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 5px 20px rgba(136, 136, 136, 0.233);
  }

  th,
  td {
    padding: 15px 0;
    text-align: center;
    color: #333;
  }

  th {
    background-color: #68b2f1;
    width: 35%;
    font-weight: 600;
    color: white;
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
  margin: 20px 15px 20px 15px;
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

export const optionContainer = css`
  width: 43%;
  height: 90px;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 5px 5px rgba(136, 136, 136, 0.199);

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 5px 20px rgba(136, 136, 136, 0.233);
  }

  p {
    margin: 0;
    padding: 5px 0 20px 0;
    font-size: 15px;
    font-weight: 600;
    color: #333;
  }
`;
