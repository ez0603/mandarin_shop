import { useState, useEffect } from "react";
import useGetOptionTitle from "../../../../hooks/useGetOptionTitle";
import OptionRegisterModal from "../OptionRegisterModal/OptionRegisterModal"; // 모달 컴포넌트 가져오기
import * as s from "./style";

const OptionManager = ({ productId, optionTitles, optionNames, setOptionList }) => {
  const [selectedOptions, setSelectedOptions] = useState({}); // 각 옵션 타이틀에 대해 선택된 옵션 상태
  const [optionModal, setOptionModal] = useState(false); // 모달 표시 상태

  const {
    titleOptions,
    error: titleOptionsError,
    refetch: refetchOptions,
  } = useGetOptionTitle(productId);

  useEffect(() => {
    refetchOptions();
  }, [refetchOptions]);

  const handleOptionChange = (titleId, e) => {
    const { value } = e.target;
    setSelectedOptions((prev) => ({
      ...prev,
      [titleId]: value,
    }));
  };

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
      
      if (!prevTitles.some(title => title.optionTitleId === newOptionTitle.optionTitleId)) {
        updatedTitles.push(newOptionTitle);
      }

      return [updatedTitles, updatedNames];
    });
    refetchOptions(); // 옵션 목록을 다시 불러와서 최신 상태로 유지
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
          productName="Product Name" // 필요에 따라 수정
          onOptionAdded={handleOptionAdded}
        />
      )}
      {Array.isArray(optionTitles) && optionTitles.length > 0 ? (
        optionTitles.map((title) => (
          <div key={`${title.optionTitleId}-${title.titleName}`}>
            <h4>{title.titleName}</h4>
            {Array.isArray(optionNames) && optionNames.length > 0 ? (
              <select
                value={selectedOptions[title.optionTitleId] || ""}
                onChange={(e) => handleOptionChange(title.optionTitleId, e)}
              >
                <option value="">옵션 선택</option>
                {optionNames
                  .filter((name) => name.optionTitleId === title.optionTitleId)
                  .map((name) => (
                    <option key={name.optionNameId} value={name.optionName}>
                      {name.optionName}
                    </option>
                  ))}
              </select>
            ) : (
              <p>옵션이 없습니다</p>
            )}
          </div>
        ))
      ) : (
        <p>옵션이 없습니다</p>
      )}
   
    </div>
  );
};

export default OptionManager;