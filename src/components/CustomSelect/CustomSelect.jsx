/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from "react";
import * as s from "./style";

const CustomSelect = ({ options, onSelect, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  // 옵션이 null인 경우를 체크합니다.
  const filteredOptions = options.filter(option => option.optionName !== null);

  return (
    <div css={s.customSelectContainer} ref={selectRef}>
      <button
        css={s.customSelectButton}
        onMouseEnter={() => setHoveredOption(selectedOption)}
        onMouseLeave={() => setHoveredOption(null)}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {hoveredOption?.optionName || selectedOption?.optionName || "옵션 보기"}
      </button>
      <div css={s.customSelectOptions} className={isOpen ? "open" : ""}>
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <div
              key={option.optionNameId}
              onMouseEnter={() => setHoveredOption(option)}
              onMouseLeave={() => setHoveredOption(null)}
              onClick={() => handleSelect(option)}
            >
              {option.optionName}
            </div>
          ))
        ) : (
          <div>옵션이 존재하지 않습니다</div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
