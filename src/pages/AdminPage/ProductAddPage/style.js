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
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const header = css`
  width: 100%;
  display: flex;
  justify-content: flex-end; 
  padding: 10px;
  position: sticky;
  top: 7%;
`;

export const saveButton = css`
  padding: 10px 25px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const content = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between; 
  align-items: center;
`;

export const productLayout = css`
  background-color: white;
  width: 45%;
  height: 80%;
  border-radius: 10px;
  `;

export const optionLayout = css`
  background-color: white;
  width: 50%;
  height: 80%;
  border-radius: 10px;
`;

