import { css } from "@emotion/react";

export const layout = css`
  position: relative;
  min-width: 100%; //모니터 기준
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const container = css`
  width: 95%;
  height: 100%;
  background-color: orange;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const list = css`
  width: 43%;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  /* background-color: aqua; */

  li {
    cursor: pointer;
  }
`;

export const listItem = css`
  padding: 10px;
`;

export const logoLayout = css`
  width: 180px;
  height: 100px;
  position: fixed;
  left: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: aqua; */

  img {
    margin-top: 10px;
    width: 170px;
    height: 140px;
  }
`;

export const mypageLayout = css`
  width: 20%;
  height: 100%;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* background-color: aqua; */
  
  svg, p {
      cursor: pointer;
  }
`;
