// style.js
import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
  height: 100%;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const container = css`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;


export const category = css`
width: 88%;
  display: flex;
  align-items: center;
`;

export const list = css`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 0;
  margin: 0;

  li {
    cursor: pointer;
  }
`;

export const listItem = css`
  padding: 10px;
  position: relative;

  ::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #dbdbdb;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
  }

  :hover::after {
    visibility: visible;
    width: 100%;
  }
`;


export const headerContainer = css`
  width: 82%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
`;

export const headerItem = css`
  cursor: default;
  width: 28%;
  display: flex;
  text-align: center;
  position: relative;
  left: 38%;
  justify-content: space-between;
`;

export const selectAllCheckbox = css`
  cursor: pointer;
  padding: 7px 10px;
  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  background-color: #fff;

  :hover {
    background-color: #f1f1f1;
  }
`;

export const productContainer = css`
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 10px;
`;

export const selectedProductContainer = css`
  background-color: #f1f1f1;
`;

export const checkbox = css`
  width: 20px;
  height: 18px;
  cursor: pointer;
`;

export const imgBox = css`
  width: 10%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

export const imgStyle = css`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 20px;
`;

export const productBox = css`
  width: 50%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const productItem = css`
  width: 35%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
`;

export const buttonBox = css`
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  button {
    box-sizing: border-box;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid #dbdbdb;
    background-color: #fff;
    :hover {
      background-color: #f1f1f1;
    }
  }
`;
