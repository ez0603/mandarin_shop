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
    if (!newOption.optionTitleId || !newOption.optionName) {
      alert("옵션 타이틀과 옵션 이름을 모두 입력해 주세요.");
      return;
    }

    if (window.confirm("옵션을 추가하시겠습니까?")) {
      try {
        const newOptionEntry = {
          optionNameId: Date.now(),
          optionName: newOption.optionName,
          optionTitleId: newOption.optionTitleId,
          color: selectedColor,
        };
        setOptionList((prevTitles, prevNames) => {
          return [prevTitles, [...prevNames, newOptionEntry]];
        });
        setNewOption({ optionTitleId: "", optionName: "" });
        setSelectedColor("#000000"); // 색상 초기화
        await insertOption(productId, newOption.optionTitleId, newOption.optionName, selectedColor);
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
      return [prevTitles, updatedOptionNames];
    });
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
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
        <div>
          <h4>색상 선택</h4>
          <input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
          />
        </div>
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
                    <div key={`${name.optionNameId}-${name.optionName}`} style={{ display: "flex", alignItems: "center", padding: '5px', margin: '5px 0' }}>
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
                        <div
                          style={{
                            backgroundColor: name.color,
                            width: "20px",
                            height: "20px",
                            marginLeft: "10px",
                            border: "1px solid black",
                          }}
                        />
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
