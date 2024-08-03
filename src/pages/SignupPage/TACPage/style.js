import { css } from "@emotion/react";

export const pageLayout = css`
  width: 100%;
  height: 100%;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  /* background-color: aqua; */
`;

export const header = css`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: aqua; */

  & h1 {
    margin: 0;
  }
`;
export const pageContainer = css`
  width: 60%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  border: 1px solid #dbdbdb;
  background-color: #f3f3f3;
  border-radius: 20px;
`;
export const agreeBox = css`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
export const container = css`
  width: 90%;
  height: 90%;
  background-color: transparent;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const agree = css`
width: 100%;
`;

export const buttonBox = css`
    /* background-color: aqua; */
    display: flex;
    align-items: center;
    justify-content: end;
    width: 90%;
    margin-bottom: 30px;
`;

export const button  = (agreed) => css`
  width: 20%;
  box-sizing: border-box;
  font-size: 14px;
  border: 1px solid ${agreed ? "#187cff" : "#dbdbdb"};
  border-radius: 10px;
  cursor: pointer;
  padding: 15px 0;
  background-color:  ${agreed ? "#187cff" : "#fefefe"};
  color: ${agreed ? "#fefefe" : "#999"};
  box-shadow: ${agreed ? "3px 8px 10px hsla(0, 0%, 0%, 0.411)" : "3px 5px 8px 3px hsla(0, 0%, 55%, 0.411)"};
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: ${agreed ? "translateY(2px)" : ""};
  }
  &:active {
    box-shadow: inset 3px 5px 8px 3px hsla(0, 0%, 0%, 0.411);
  }
`;
