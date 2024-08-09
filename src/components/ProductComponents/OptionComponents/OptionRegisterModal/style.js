import { css } from "@emotion/react";

export const optionModal = css`
  position: relative;
  top: 20px;
  left: 22%;
  transform: translate(100%, 50%);
  z-index: 999;
  width: 250px;
  max-width: 90%;
  height: auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-in-out ;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  &.modal-exit {
    animation: fadeOut 0.5s ease-in-out ;
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export const backdrop = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.6); */
  z-index: 998;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const plusButton = css`
  box-sizing: border-box;
  background-color: transparent;
  border: none;
  position: relative;
  transform: translate(100%, -100%);
  top: -43px;
  left: 65%;

  :hover {
    cursor: pointer;
    color: #0056b3;
    transition: background-color 0.3s, transform 0.3s;
  }

  &:hover::after {
    content: "옵션 타이틀 추가하기";
    position: absolute;
    bottom: 120%; 
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: white;
    padding: 7px 10px;
    border-radius: 3px;
    white-space: nowrap;
    font-size: 12px;
    z-index: 999;
  }
`;

export const modalHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;

  h2 {
    margin: 0;
    font-size: 20px;
  }

  .closeButton {
    color: black;
    cursor: pointer;
    font-size: 20px;
    background: none;
    border: none;

    &:hover {
      color: #fff;
    }
  }
`;

export const modalContent = css`
  margin-top: 20px;

  label {
    display: block;
    font-size: 15px;
    margin: 7px 0;
  }

  input[type="text"],
  select {
    margin-bottom: 5px;
    width: calc(100% - 10px);
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

export const modalFooter = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 13px;

  button {
    padding: 10px 20px;
    font-size: 15px;
    font-weight: bold;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
      background-color: #0056b3;
      transform: scale(1.05);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.5);
    }

    &:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    &:first-of-type {
      background-color: #007bff;

      &:hover {
        background-color: #0055b1;
      }
    }

    &:last-of-type {
      background-color: #6c757d;

      &:hover {
        background-color: #5a6268;
      }
    }

    &:not(:first-of-type) {
      margin-left: 15px;
    }
  }
`;

export const selectWrapper = css`
  position: relative;
  align-items: center;

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 8px 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    background-position: right 20px center;
    background-size: 10px 10px;
  }

  .select-arrow {
    position: absolute;
    top: 34px;
    right: 30px;
    pointer-events: none;
    font-size: 16px;
    color: #555;
  }

  select::-ms-expand {
    display: none;
  }
`;
