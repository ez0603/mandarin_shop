/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { registerOption } from "../../../../apis/api/option";
import useInsertOptionTitle from "../../../../hooks/useInsertOptionTitle";
import useGetOptionTitle from "../../../../hooks/useGetOptionTitle";
import CustomSelect from "../../../OptionSelect/OptionSelect";
import * as s from "./style";
import { CiSquarePlus } from "react-icons/ci";

function OptionRegisterModal({
  closeModal,
  productId,
  onOptionAdded,
}) {
  const [optionName, setOptionName] = useState("");
  const [optionTitle, setOptionTitle] = useState("");
  const [optionSelectTitleId, setOptionSlectTitleId] = useState("");
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const { insertOptionTitle, refresh } = useInsertOptionTitle();
  const {
    optionTitleId = [],
    optionTitleName = [],
  } = useGetOptionTitle(productId, refresh);

  useEffect(() => {
    if (optionTitleId.length > 0) {
      setIsLoading(false); // 옵션 데이터가 로드되면 로딩 상태를 false로 설정
    }
  }, [optionTitleId]);

  const handleOptionTitleName = (e) => {
    setOptionTitle(e.target.value);
  };

  const handleOptionName = (e) => {
    setOptionName(e.target.value);
  };

  const handleOptionSelect = (selectedOption) => {
    setOptionSlectTitleId(selectedOption.optionTitleId);
  };

  const insertOption = async () => {
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
      console.error("옵션 추가 실패:", error);
    }
  };

  const insertOptionTitleOnly = async () => {
    if (!optionTitle.trim()) {
      alert("옵션 타이틀을 입력해 주세요.");
      return;
    }

    try {
      await insertOptionTitle(productId, optionTitle);
      setOptionTitle(""); // 입력 필드를 초기화합니다.
      refresh(); // 옵션 타이틀 목록을 새로고침
    } catch (error) {
      console.error("옵션 타이틀 추가 실패:", error);
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
            <input
              value={optionTitle}
              onChange={handleOptionTitleName}
              type="text"
            />
            <button
              onClick={insertOptionTitleOnly}
              css={s.plusButton}
              title="옵션 타이틀 추가하기"
            >
              <CiSquarePlus size={25} />
            </button>
          </div>
          <div css={s.selectWrapper}>
            <label>옵션 타이틀 선택</label>
            {isLoading ? (
              <p>잠시만 기다려주세요...</p>
            ) : (
              <CustomSelect
                options={optionTitleId.map((id, index) => ({
                  optionTitleId: id,
                  optionName: optionTitleName[index],
                }))}
                selectedOption={optionTitleId.find(
                  (id) => id === optionSelectTitleId
                )}
                onSelect={handleOptionSelect}
              />
            )}
          </div>
          <div>
            <label>옵션 이름 추가</label>
            <input
              value={optionName}
              onChange={handleOptionName}
              type="text"
            />
          </div>
        </div>
        <div css={s.modalFooter}>
          <button onClick={insertOption} disabled={isLoading}>
            옵션 추가
          </button>
          <button onClick={closeModal}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default OptionRegisterModal;
