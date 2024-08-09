/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useState, useEffect } from "react";
import useGetOptionTitle from "../../../../hooks/useGetOptionTitle";
import OptionRegisterModal from "../OptionRegisterModal/OptionRegisterModal"; // 모달 컴포넌트 가져오기
import { IoArrowBack } from "react-icons/io5"; // 뒤로가기 아이콘 가져오기
import {
  updateProductOption,
  updateProductTitleOption,
} from "../../../../apis/api/option";

const OptionManager = ({
  productId,
  optionTitles,
  optionNames,
  setOptionList,
}) => {
  const [optionModal, setOptionModal] = useState(false); // 모달 표시 상태
  const [updateState, setUpdateState] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // 애니메이션 상태 관리
  const [updateOptionData, setUpdateOptionData] = useState({
    productId: productId,
    optionNameId: "",
    optionName: "",
    optionTitleId: "",
    optionTitleName: "",
  });
  const [updateOptionTitleName, setUpdateOptionTitleName] = useState({
    productId: productId,
    optionTitleId: 0,
    titleName: "",
  });

  const {
    optionTitleId: fetchedOptionTitleIds,
    optionTitleName: fetchedOptionTitleNames,
    error: titleOptionsError,
    refetch, // 올바른 함수 이름으로 수정
  } = useGetOptionTitle(productId);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const openModal = () => {
    setOptionModal(true);
  };

  const closeModal = () => {
    setOptionModal(false);
  };

  const handleOptionAdded = (newOptionTitle, newOptionName) => {
    setOptionList((prevState) => {
      const updatedTitles = [...prevState.optionTitles];
      const updatedNames = [...prevState.optionNames];

      if (
        !updatedTitles.some(
          (title) => title.optionTitleId === newOptionTitle.optionTitleId
        )
      ) {
        updatedTitles.push(newOptionTitle);
      }

      if (
        !updatedNames.some(
          (name) => name.optionNameId === newOptionName.optionNameId
        )
      ) {
        updatedNames.push(newOptionName);
      }

      return {
        optionTitles: updatedTitles,
        optionNames: updatedNames,
      };
    });
  };

  const handleOptionName = (e) => {
    const newOptionName = e.target.value;
    setUpdateOptionData((prevData) => ({
      ...prevData,
      optionName: newOptionName,
    }));
  };

  const handleOptionTitleName = (e) => {
    const newTitleName = e.target.value;
    setUpdateOptionTitleName((prevData) => ({
      ...prevData,
      titleName: newTitleName,
    }));
  };

  const handleUpdateOption = async () => {
    if (window.confirm("정말로 옵션을 수정하시겠습니까?")) {
      try {
        await updateProductOption(updateOptionData);
        alert("옵션 수정 완료");
        setUpdateState(0);
        setIsVisible(false); // 숨기기
        refetch();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateOptionTitle = async () => {
    console.log("Updating option title with data:", updateOptionTitleName); // 로그 추가
    if (window.confirm("정말로 옵션 타이틀을 수정하시겠습니까?")) {
      try {
        await updateProductTitleOption(updateOptionTitleName);
        alert("옵션 타이틀 수정 완료");
        setUpdateState(0);
        setIsVisible(false); // 숨기기
        refetch();
      } catch (error) {
        console.error("Failed to update option title:", error); // 오류 로그 추가
      }
    }
  };

  const handleOpenEditor = (state, title = {}) => {
    setUpdateState(state);
    if (state === 2) {
      setUpdateOptionTitleName((prevData) => ({
        ...prevData,
        optionTitleId: title.optionTitleId,
        titleName: title.titleName,
      }));
    }
    setIsVisible(true); // 보이기
  };

  const handleCloseEditor = () => {
    setUpdateState(0);
    setIsVisible(false); // 숨기기
  };

  return (
    <div css={s.layout}>
      <div css={s.header}>
        <h3>Option List</h3>
        <button onClick={openModal}>옵션 추가</button>
      </div>
      <div css={s.optionsAndEditor}>
        <div css={s.optionsContainer}>
          {optionModal && (
            <OptionRegisterModal
              optionModal={optionModal}
              closeModal={closeModal}
              options={optionNames}
              productId={productId}
              onOptionAdded={handleOptionAdded}
            />
          )}
          {Array.isArray(optionTitles) && optionTitles.length > 0 ? (
            optionTitles.map((title) => (
              <div key={title.optionTitleId} css={s.optionLayout}>
                <h4>
                  {title.titleName}
                  <button
                    onClick={() => handleOpenEditor(2, title)} // 수정 열기, 현재 타이틀 전달
                  >
                    수정
                  </button>
                </h4>
                {Array.isArray(optionNames) && optionNames.length > 0 ? (
                  <div css={s.optionContainer}>
                    {optionNames
                      .filter(
                        (name) => name.optionTitleId === title.optionTitleId
                      )
                      .map((name) => (
                        <div
                          key={name.optionNameId}
                          style={{
                            display: "inline-block",
                            marginRight: "10px",
                          }}
                        >
                          {name.optionName}
                          <button
                            onClick={() => {
                              setUpdateOptionData((prevData) => ({
                                ...prevData,
                                optionNameId: name.optionNameId,
                                optionName: name.optionName,
                                optionTitleId: title.optionTitleId,
                                optionTitleName: title.titleName,
                              }));
                              handleOpenEditor(1); // 수정 열기
                            }}
                          >
                            수정
                          </button>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p>옵션이 없습니다</p>
                )}
              </div>
            ))
          ) : (
            <p>Loading</p>
          )}
        </div>

        <div css={s.updateContainer(isVisible)}>
          {updateState !== 0 && (
            <>
              <div css={s.updateButtons}>
                <button onClick={handleCloseEditor}>
                  <IoArrowBack />
                  뒤로
                </button>
                <button
                  onClick={
                    updateState === 1 ? handleUpdateOption : updateOptionTitle
                  }
                >
                  저장
                </button>
              </div>
              {updateState === 1 ? (
                <div>
                  <div>옵션 타이틀</div>
                  <input
                    type="text"
                    value={updateOptionData.optionTitleName}
                    disabled
                  />
                  <div>옵션 이름</div>
                  <input
                    type="text"
                    onChange={handleOptionName}
                    value={updateOptionData.optionName}
                  />
                </div>
              ) : (
                <div>
                  <div>옵션 타이틀 이름</div>
                  <input
                    type="text"
                    onChange={handleOptionTitleName}
                    value={updateOptionTitleName.titleName}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptionManager;
