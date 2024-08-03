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
  /* background-color: orange; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const logoLayout = css`
  width: 180px;
  height: 100px;
  position: fixed;
  left: 45%;
  top: 15px;
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
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
`;

export const icon = css`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* background-color: aqua; */

  svg,
  p {
    cursor: pointer;
  }
`;

export const category = css`
  width: 80%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* background-color: aqua; */
`;

export const list = css`
  width: 100%;
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
  padding-top: 0;
  margin-bottom: 10px;
  /* background-color: aqua; */
`;
