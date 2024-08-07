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
  const { insertOption, error: insertOptionError } = useInsertOption();
  const { insertOptionTitle, error: insertOptionTitleError, refresh } = useInsertOptionTitle();
  const { titleOptions, error: titleOptionsError } = useGetTitleOption(productId);

  useEffect(() => {
    if (refresh) {
      // 옵션 타이틀을 추가한 후 새로 고침할 때 필요한 로직 추가
    }
  }, [refresh]);

  const handleAddOptionTitle = async () => {
    if (!newOptionTitle) {
      alert("옵션 타이틀을 입력해 주세요.");
      return;
    }
    try {
      await insertOptionTitle(productId, newOptionTitle);
      const newTitle = {
        optionTitleId: Date.now(), // 유일한 키로 대체
        titleName: newOptionTitle,
      };
      const updatedOptionTitles = [...optionTitles, newTitle];
      setNewOptionTitle("");
      setOptionList(updatedOptionTitles, optionNames);
    } catch (error) {
      console.error("Failed to add option title", error);
      alert("옵션 타이틀 추가 실패");
    }
  };

  const handleAddOption = async () => {
    if (!newOption.optionTitleId || !newOption.optionName) {
      alert("옵션 타이틀과 옵션 이름을 모두 입력해 주세요.");
      return;
    }
    try {
      await insertOption(productId, newOption.optionTitleId, newOption.optionName);
      const newOptionEntry = {
        optionNameId: Date.now(),
        optionName: newOption.optionName,
        optionTitleId: newOption.optionTitleId,
      };
      const updatedOptionNames = [...optionNames, newOptionEntry];
      setNewOption({ optionTitleId: "", optionName: "" });
      setOptionList(optionTitles, updatedOptionNames);
    } catch (error) {
      console.error("Failed to add option", error);
      alert("옵션 추가 실패");
    }
  };

  const handleUpdateOption = (updatedOption) => {
    const updatedOptionNames = optionNames.map((option) =>
      option.optionNameId === updatedOption.optionNameId ? updatedOption : option
    );
    setOptionList(optionTitles, updatedOptionNames);
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
                    <div key={`${name.optionNameId}-${name.optionName}`}>
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
