import { useState, useEffect } from "react";
import useInsertOption from "../../../hooks/useInsertOption";
import useInsertOptionTitle from "../../../hooks/useInsertOptionTitle";
import useGetTitleOption from "../../../hooks/useGetTitleOption";
import * as s from "./style";

const OptionManager = ({ productId, optionTitles, optionNames, setOptionList }) => {
  const [newOptionTitle, setNewOptionTitle] = useState("");
  const [newOption, setNewOption] = useState({
    optionTitleId: "",
    optionName: "",
  });
  const [showColorPicker, setShowColorPicker] = useState(false); // 색상 선택기 표시 상태
  const [selectedColor, setSelectedColor] = useState("#000000"); // 선택된 색상 상태 추가

  const { insertOption, error: insertOptionError } = useInsertOption();
  const { insertOptionTitle, error: insertOptionTitleError, refresh: refreshTitle } = useInsertOptionTitle();
  const { titleOptions, error: titleOptionsError, refetch: refetchOptions } = useGetTitleOption(productId);

  useEffect(() => {
    if (refreshTitle) {
      refetchOptions();
    }
  }, [refreshTitle, refetchOptions]);

  const handleAddOptionTitle = async () => {
    if (!newOptionTitle) {
      alert("옵션 타이틀을 입력해 주세요.");
      return;
    }
    if (window.confirm("옵션 타이틀을 추가하시겠습니까?")) {
      try {
        const newTitle = {
          optionTitleId: Date.now(),
          titleName: newOptionTitle,
        };
        setOptionList((prevTitles, prevNames) => ([...prevTitles, newTitle], prevNames));
        setNewOptionTitle("");
        await insertOptionTitle(productId, newOptionTitle);
        await refetchOptions();
      } catch (error) {
        console.error("Failed to add option title", error);
        alert("옵션 타이틀 추가 실패");
      }
    }
  };

  const handleAddOption = async () => {
    if (!newOption.optionTitleId || (!newOption.optionName && !showColorPicker)) {
      alert("옵션 타이틀과 옵션 이름 또는 색상을 모두 입력해 주세요.");
      return;
    }

    const optionName = showColorPicker ? selectedColor : newOption.optionName;

    if (window.confirm("옵션을 추가하시겠습니까?")) {
      try {
        const newOptionEntry = {
          optionNameId: Date.now(),
          optionName: optionName,
          optionTitleId: newOption.optionTitleId,
          color: showColorPicker ? selectedColor : null, // 색상 선택기가 표시된 경우 색상 추가
        };
        console.log('New Option Entry:', newOptionEntry); // 디버깅용 콘솔 로그
        setOptionList((prevTitles, prevNames) => {
          console.log('Updated Option Names:', [...prevNames, newOptionEntry]); // 상태 업데이트 확인용 로그
          return [prevTitles, [...prevNames, newOptionEntry]];
        });
        setNewOption({ optionTitleId: "", optionName: "" });
        setShowColorPicker(false); // 색상 선택기 숨기기
        setSelectedColor("#000000"); // 색상 초기화
        await insertOption(productId, newOption.optionTitleId, optionName);
        await refetchOptions();
      } catch (error) {
        console.error("Failed to add option", error);
        alert("옵션 추가 실패");
      }
    }
  };

  const handleUpdateOption = (updatedOption) => {
    setOptionList((prevTitles, prevNames) => {
      const updatedOptionNames = prevNames.map((option) =>
        option.optionNameId === updatedOption.optionNameId ? updatedOption : option
      );
      console.log('Updated Option Names:', updatedOptionNames); // 상태 업데이트 확인용 로그
      return [prevTitles, updatedOptionNames];
    });
  };

  return (
    <div>
      <div>
        <h3>옵션 타이틀 추가</h3>
        <input
          type="text"
          value={newOptionTitle}
          onChange={(e) => setNewOptionTitle(e.target.value)}
        />
        <button onClick={handleAddOptionTitle}>옵션 타이틀 추가</button>
      </div>
      <div>
        <h3>옵션 추가</h3>
        <select
          value={newOption.optionTitleId}
          onChange={(e) =>
            setNewOption((prev) => ({
              ...prev,
              optionTitleId: e.target.value,
            }))
          }
        >
          <option value="">옵션 타이틀 선택</option>
          {Array.isArray(titleOptions) && titleOptions.length > 0 ? (
            titleOptions.map((title, index) => (
              <option
                key={`${title.optionTitleId}-${index}-${title.titleName}`}
                value={title.optionTitleId}
              >
                {title.titleName}
              </option>
            ))
          ) : (
            <option disabled>옵션 타이틀을 불러올 수 없습니다</option>
          )}
        </select>
        {!showColorPicker && (
          <input
            type="text"
            value={newOption.optionName}
            onChange={(e) =>
              setNewOption((prev) => ({
                ...prev,
                optionName: e.target.value,
              }))
            }
          />
        )}
        <label>
          <input
            type="checkbox"
            checked={showColorPicker}
            onChange={() => setShowColorPicker(!showColorPicker)}
          />
          색상 선택
        </label>
        {showColorPicker && (
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          />
        )}
        <button onClick={handleAddOption}>옵션 추가</button>
      </div>
      <div>
        <h3>옵션 목록</h3>
        {Array.isArray(optionTitles) && optionTitles.length > 0 ? (
          optionTitles.map((title) => (
            <div key={`${title.optionTitleId}-${title.titleName}`}>
              <h4>{title.titleName}</h4>
              {Array.isArray(optionNames) && optionNames.length > 0 ? (
                optionNames
                  .filter((name) => name.optionTitleId === title.optionTitleId)
                  .map((name) => (
                    <div key={`${name.optionNameId}-${name.optionName}`} style={{ backgroundColor: name.color || 'transparent', padding: '5px', margin: '5px 0' }}>
                      <input
                        type="text"
                        value={name.optionName}
                        onChange={(e) =>
                          handleUpdateOption({
                            ...name,
                            optionName: e.target.value,
                          })
                        }
                      />
                      {name.color && (
                        <span style={{ color: name.color, marginLeft: '10px' }}>
                          {name.color}
                        </span>
                      )}
                    </div>
                  ))
              ) : (
                <p>옵션이 없습니다</p>
              )}
            </div>
          ))
        ) : (
          <p>옵션이 없습니다</p>
        )}
      </div>
    </div>
  );
};

export default OptionManager;
