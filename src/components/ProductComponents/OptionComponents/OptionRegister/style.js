import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const container = css`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

export const textContainer = css`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

export const categoryBox = css`
  display: flex;
  align-items: center;
  font-size: 15px;
  gap: 15px;
`;

export const category = css`
  width: 185px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
`;

export const imgBox = css`
  box-sizing: border-box;
  position: relative;
  left: 25%;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  object-fit: cover;
`;

export const productLayout = css`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 35px;
`;

export const productBox = css`
  width: 100%;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 17px;

  label {
    margin-right: 13px;
  }

  input {
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    padding: 9px;

    &:focus {
      border: 1px solid #bdbdbd;
      outline: none;
    }
  }
`;

export const descriptionBox = css`
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  textarea {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    padding: 8px;
    resize: none;
    margin-top: 15px;
    font-size: 15px;

    &:focus {
      border: 1px solid #bdbdbd;
      outline: none;
    }
  }
`;
