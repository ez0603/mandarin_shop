import { css } from "@emotion/react";

export const layout = css`
  position: fixed;
  left: 0;
  top: 5%;
  width: 250px;
  height: 100%;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
`;

export const menuList = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
`;

export const menuItem = css`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  color: black;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  padding: 40px 0;
`;

export const link = css`
  display: flex;
  margin-top: 15px;
  text-decoration: none;
  cursor: pointer;
  color: #ccc;
  font-size: 20px;
  gap: 10px;
`;

// 활성화된 링크에 대한 스타일
export const activeLink = css`
  color: #333; 
`;
