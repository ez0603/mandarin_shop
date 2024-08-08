import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const container = css`
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 50px;
`;

export const imageContainer = css`
  width: 40%;
  height: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  display: inline-block;
`;

export const editButton = css`
  position: relative;
  top: 25px;
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
    background-color: hsla(0, 0%, 79%, 0.678);
    color: hsl(0, 0%, 100%);
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
  width: 85%;
`;

export const table = css`
  width: 90%;
  /* border-collapse: collapse; */
  /* border: 1px solid #ddd; */
  /* border-collapse: separate;  */
  /* border-collapse: collapse; */
  border-spacing: 0px 15px;

  th,
  td {
    /* border: 1px solid #ddd; */
    padding: 15px 0;
    text-align: center;
    color: #585d6a;
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
`;

export const optionTitle = css`
  font-size: 24px;
  font-weight: 400;
  margin: 20px;
`;

export const optionLayout = css`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 30px 45px;
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

export const optionContainer = css`
  width: 40%;
  height: 85px;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
  background-color: #f7f7fb;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin: 0;
    padding: 5px 0 10px 0;
    font-size: 15px;
    font-weight: 600;
  }


`;
