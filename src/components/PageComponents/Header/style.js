import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #F9F5EA; */
`;

export const container = css`
  width: 75%;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const headerContent = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  top: -70px;

  img {
    width: 170px;
    height: 140px;
    cursor: pointer;
  }
`;

export const mypageAndCategory = css`
  display: flex;
  align-items: center;
  padding-top: 20px;
`;

export const mypageLayout = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 25px;

  p,
  svg {
    margin-left: 10px;
    cursor: pointer;
  }
`;

export const category = css`
  display: flex;
  align-items: center;
  padding-top: 20px;
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