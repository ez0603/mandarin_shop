import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  z-index: 999;
`;

export const container = css`
  width: 90%;
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
  justify-content: space-between;
  position: relative;
`;

export const logoLayout = css`
  position: absolute;
  left: -45px;
  /* transform: translateX(-50%); */
  display: flex;
  align-items: center;
  justify-content: center;
  top: -20px;

  img {
    width: 160px;
    height: 120px;
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

export const iconWithText = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;

  span {
    position: absolute;
    bottom: -40px;
    white-space: nowrap;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s, visibility 0.3s;
    background-color: #fff;
    padding: 5px 7px;
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

    &::before {
      content: "";
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 6px;
      border-style: solid;
      border-color: transparent transparent #fff transparent;
    }
  }

  &:hover span {
    visibility: visible;
    opacity: 1;
  }

  &:hover svg {
    color: #dbdbdb;
  }
`;

export const category = css`
  display: flex;
  align-items: center;
  padding-top: 20px;
  position: relative;
  left: -3%;
`;

export const list = css`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 0;

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
