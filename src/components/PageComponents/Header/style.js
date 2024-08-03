import { css } from "@emotion/react";

export const layout = css`
  position: relative;
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const container = css`
  width: 85%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const headerContent = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 30px;
`;

export const logoLayout = css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 170px;
    height: 140px;
  }
`;

export const mypageLayout = css`
  width: 20%;
  margin-left: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;

  p,
  svg {
    margin-left: 10px;
    cursor: pointer;
  }
`;

export const category = css`
  width: 80%;
  height: 30%;
  display: flex;
  align-items: center;
  
`;

export const list = css`
  width: 100%;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
  padding: 0;
  margin: 0;

  li {
    cursor: pointer;
  }
`;

export const listItem = css`
  padding: 10px;
`;
