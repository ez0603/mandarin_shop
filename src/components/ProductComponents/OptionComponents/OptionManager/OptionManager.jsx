/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useState, useEffect } from "react";
import useGetOptionTitle from "../../../../hooks/useGetOptionTitle";
import OptionRegisterModal from "../OptionRegisterModal/OptionRegisterModal";
import { IoArrowBack } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import {
  updateProductOption,
  updateProductTitleOption,
  deleteOptionTitle,
  deleteOption,
} from "../../../../apis/api/option";

const OptionManager = ({
  productId,
  optionTitles,
  optionNames,
  setOptionList,
}) => {
  const [optionModal, setOptionModal] = useState(false);
  const [updateState, setUpdateState] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
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
    refetch,
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
        newOptionTitle.titleName &&
        !updatedTitles.some(
          (title) => title.optionTitleId === newOptionTitle.optionTitleId
        )
      ) {
        updatedTitles.push(newOptionTitle);
      }

      if (
        newOptionName.optionNameId !== 0 &&
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
        setIsVisible(false);
        refetch();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateOptionTitle = async () => {
    if (window.confirm("정말로 옵션 타이틀을 수정하시겠습니까?")) {
      try {
        await updateProductTitleOption(updateOptionTitleName);
        alert("옵션 타이틀 수정 완료");
        setUpdateState(0);
        setIsVisible(false);
        refetch();
      } catch (error) {
        console.error("Failed to update option title:", error);
      }
    }
  };

  const handleDeleteOption = async (optionNameId) => {
    console.log("Attempting to delete option with ID:", optionNameId);
    if (window.confirm("정말로 이 옵션을 삭제하시겠습니까?")) {
      try {
        const response = await deleteOption({ optionNameId });
        console.log("Delete response:", response);
        alert("옵션이 삭제되었습니다.");
        refetch();
      } catch (error) {
        console.error("Failed to delete option:", error);
      }
    }
  };

  const handleDeleteOptionTitle = async (optionTitleId) => {
    console.log("Attempting to delete option title with ID:", optionTitleId);
    if (
      window.confirm(
        "이 옵션 타이틀에 속한 모든 옵션이 삭제됩니다. 정말로 삭제하시겠습니까?"
      )
    ) {
      try {
        const response = await deleteOptionTitle({ optionTitleId });
        console.log("Delete response:", response);
        alert("옵션 타이틀이 삭제되었습니다.");
        refetch();
      } catch (error) {
        console.error("Failed to delete option title:", error);
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
    setIsVisible(true);
  };

  const handleCloseEditor = () => {
    setUpdateState(0);
    setIsVisible(false);
  };

  return (
    <div css={s.layout}>
      <div css={s.header}>
        <h3>Option List</h3>
        <button onClick={openModal} css={s.optionAddButton(optionModal)}>
          옵션 추가
        </button>
      </div>
      <div css={s.optionsAndEditor}>
        <div css={s.optionsContainer(isVisible, optionModal)}>
          {optionModal && (
            <OptionRegisterModal
              optionModal={optionModal}
              closeModal={closeModal}
              options={optionNames}
              productId={productId}
              onOptionAdded={handleOptionAdded}
            />
          )}
          {Array.isArray(optionTitles) &&
          optionTitles.length > 0 &&
          optionTitles.some((title) => title.titleName) ? (
            optionTitles.map(
              (title) =>
                title.titleName && (
                  <div key={title.optionTitleId} css={s.optionLayout}>
                    <div css={s.optionTitle}>
                      <h4>{title.titleName}</h4>
                      <div>
                        <button onClick={() => handleOpenEditor(2, title)}>
                          <FaRegEdit size={17} />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteOptionTitle(title.optionTitleId)
                          }
                        >
                          <MdDeleteOutline size={17} />
                        </button>
                      </div>
                    </div>
                    {Array.isArray(optionNames) &&
                    optionNames.filter(
                      (name) =>
                        name.optionTitleId === title.optionTitleId &&
                        name.optionNameId !== 0
                    ).length > 0 ? (
                      <div css={s.optionContainer}>
                        {optionNames
                          .filter(
                            (name) =>
                              name.optionTitleId === title.optionTitleId &&
                              name.optionNameId !== 0
                          )
                          .map((name) => (
                            <div key={name.optionNameId} css={s.optionName}>
                              {name.optionName}
                              <div>
                                <button
                                  onClick={() => {
                                    setUpdateOptionData((prevData) => ({
                                      ...prevData,
                                      optionNameId: name.optionNameId,
                                      optionName: name.optionName,
                                      optionTitleId: title.optionTitleId,
                                      optionTitleName: title.titleName,
                                    }));
                                    handleOpenEditor(1);
                                  }}
                                >
                                  <FaRegEdit size={15} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteOption(name.optionNameId)
                                  }
                                >
                                  <MdDeleteOutline size={15} />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p>옵션을 추가해주세요</p>
                    )}
                  </div>
                )
            )
          ) : (
            <p>옵션 타이틀이 없습니다</p>
          )}
        </div>

        <div css={s.updateContainer(isVisible)}>
          {updateState !== 0 && (
            <>
              <div css={s.updateButtons}>
                <button onClick={handleCloseEditor}>
                  <IoArrowBack size={19}/>
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
                <div css={s.optionBox}>
                  <p>옵션 타이틀</p>
                  <input
                    type="text"
                    value={updateOptionData.optionTitleName}
                    disabled
                  />
                  <p>옵션 이름</p>
                  <input
                    type="text"
                    onChange={handleOptionName}
                    value={updateOptionData.optionName}
                  />
                </div>
              ) : (
                <div css={s.optionBox}>
                  <p>옵션 타이틀 이름</p>
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
