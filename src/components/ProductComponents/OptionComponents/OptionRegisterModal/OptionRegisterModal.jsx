/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { registerOption } from "../../../../apis/api/option";
import useInsertOptionTitle from "../../../../hooks/useInsertOptionTitle";
import useGetOptionTitle from "../../../../hooks/useGetOptionTitle";
import * as s from "./style";
import { IoIosArrowDown } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";
function OptionRegisterModal({
  optionModal,
  closeModal,
  options,
  productId,
  onOptionAdded, // New prop for handling option addition
}) {
  const [optionName, setOptionName] = useState("");
  const [optionTitle, setOptionTitle] = useState("");
  const [optionSelectTitleId, setOptionSlectTitleId] = useState("");
  const { insertOptionTitle, Optionerror, refresh } = useInsertOptionTitle();
  const {
    optionTitleId = [],
    optionTitleName = [],
    error,
  } = useGetOptionTitle(productId, refresh); // Set default value to []

  const handleOptionTitleName = (e) => {
    setOptionTitle(e.target.value);
  };

  const handleOptionName = (e) => {
    setOptionName(e.target.value);
  };

  const insertOption = async () => {
    // 입력값이 유효한지 확인
    if (
      !optionSelectTitleId ||
      !optionName ||
      optionSelectTitleId === 0 ||
      optionName.trim() === ""
    ) {
      alert("옵션 타이틀과 옵션 이름을 모두 입력해 주세요.");
      return;
    }

    try {
      const params = {
        productId: productId,
        optionTitleId: optionSelectTitleId,
        optionName: optionName,
      };
      console.log(params);
      await registerOption(params);
      alert("옵션 이름 추가가 완료되었습니다.");
      const newOptionTitleIndex = optionTitleId.indexOf(optionSelectTitleId);
      const newOptionTitle = {
        optionTitleId: optionSelectTitleId,
        titleName: optionTitleName[newOptionTitleIndex],
      };
      const newOptionName = {
        optionTitleId: optionSelectTitleId,
        optionNameId: Date.now(),
        optionName: optionName,
      };
      onOptionAdded(newOptionTitle, newOptionName);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div css={s.backdrop} onClick={handleBackdropClick}>
      <div css={s.optionModal} onClick={(e) => e.stopPropagation()}>
        <div css={s.modalHeader}>
          <h2>옵션 등록</h2>
        </div>
        <div css={s.modalContent}>
          <div>
            <label>옵션 타이틀 추가</label>
            <input onChange={handleOptionTitleName} type="text" />
            <button
              onClick={() => insertOptionTitle(productId, optionTitle)}
              css={s.plusButton}
              title="옵션 타이틀 추가하기"
            >
              <CiSquarePlus size={25} />
            </button>
          </div>
          <div css={s.selectWrapper}>
            <label>옵션 내용 추가</label>
            <select
              value={optionSelectTitleId}
              onChange={(e) => setOptionSlectTitleId(Number(e.target.value))}
            >
              <option value="">타이틀 선택</option>
              {optionTitleId.length > 0 ? (
                optionTitleId.map((id, index) => (
                  <option key={id} value={id}>
                    {optionTitleName[index]}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  타이틀이 없습니다
                </option>
              )}
            </select>
            <IoIosArrowDown className="select-arrow" />
          </div>
          <div>
            <label>옵션 이름</label>
            <input onChange={handleOptionName} type="text" />
          </div>
        </div>
        <div css={s.modalFooter}>
          <button onClick={insertOption}>추가</button>
          <button onClick={closeModal}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default OptionRegisterModal;
