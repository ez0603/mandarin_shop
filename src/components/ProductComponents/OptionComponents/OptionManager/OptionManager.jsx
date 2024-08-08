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
    titleOptions,
    error: titleOptionsError,
    refetch: refetchOptions,
  } = useGetOptionTitle(productId);

  useEffect(() => {
    refetchOptions();
  }, [refetchOptions]);

  const openModal = () => {
    setOptionModal(true);
  };

  const closeModal = () => {
    setOptionModal(false);
  };

  const handleOptionAdded = (newOptionTitle, newOptionName) => {
    setOptionList((prevTitles, prevNames) => {
      const updatedTitles = [...prevTitles];
      const updatedNames = [...prevNames, newOptionName];

      if (
        !prevTitles.some(
          (title) => title.optionTitleId === newOptionTitle.optionTitleId
        )
      ) {
        updatedTitles.push(newOptionTitle);
      }

      return [updatedTitles, updatedNames];
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
    try {
      await updateProductOption(updateOptionData);
      alert("옵션 수정 완료");
      setUpdateState(0);
      refetchOptions();
    } catch (error) {
      console.error(error);
    }
  };

  const updateOptionTitle = async () => {
    try {
      await updateProductTitleOption(updateOptionTitleName);
      alert("옵션 타이틀 수정 완료");
      setUpdateState(0);
      refetchOptions();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>옵션 목록</h3>
      <button onClick={openModal}>옵션 추가</button>
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
          <div key={title.optionTitleId}>
            <h4>
              {title.titleName}
              <button
                onClick={() => {
                  setUpdateOptionTitleName((prevData) => ({
                    ...prevData,
                    optionTitleId: title.optionTitleId,
                    titleName: title.titleName,
                  }));
                  setUpdateState(2);
                }}
              >
                수정
              </button>
            </h4>
            {Array.isArray(optionNames) && optionNames.length > 0 ? (
              <div>
                {optionNames
                  .filter((name) => name.optionTitleId === title.optionTitleId)
                  .map((name) => (
                    <div
                      key={name.optionNameId}
                      style={{ display: "inline-block", marginRight: "10px" }}
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
                          setUpdateState(1);
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

      {updateState !== 0 && (
        <div>
          <div>
            <button onClick={() => setUpdateState(0)}>
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
        </div>
      )}
    </div>
  );
};

export default OptionManager;
