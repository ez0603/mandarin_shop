import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
  height: 100%;
  position: relative;
  
  /* &::after {
    content: '';
    display: block;
    height: 50px; 
  } */
`;

export const container = css`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const containerBox = css`
  background-color: white;
  width: 30%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const header = css`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;

  & h1 {
    font-weight: 400;
    font-size: 25px;
  }
`;

export const inputContainer = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & h4 {
    margin: 0;
    margin-bottom: 15px;
    font-weight: 500;
  }
`;

export const signinButton = (active) => css`
  box-sizing: border-box;
  border: none;
  padding: 10px;
  width: 80%;
  border-radius: 8px;
  margin-bottom: 15px;
  background-color: ${active ? "#187cff" : "#b8d6fd"};
  color: white;
  cursor: ${active ? "pointer" : "default"};

  &:hover {
    background-color: ${active ? "#4494fc" : "#a2cbff"};
    color: ${active ? "#c2dbff" : "black"};
  }
  &:active {
    background-color: ${active ? "#1071fa" : "#a2cbff"};
  }
  a {
    text-decoration: none;
    padding: 5px;
  }
  a:link {
    color: #333333;
  }
  a:visited {
    color: #333333;
  }
`;

export const authentiCation = (state) => css`
  box-sizing: border-box;
  border: none;
  height: 40px;
  width: 80%;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: ${state ? "#187cff" : "#b8d6fd"};
  color: white;
  cursor: ${state ? "pointer" : "default"};

  &:hover {
    background-color: ${state ? "#4494fc" : "#a2cbff"};
  }
  &:active {
    background-color: ${state ? "#1071fa" : "#a2cbff"};
  }
`;

export const nextInput = css`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;
