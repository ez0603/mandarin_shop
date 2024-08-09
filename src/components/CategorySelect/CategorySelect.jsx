/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from "react";
import * as s from "./style";

const CategorySelect = ({ categories, onSelect, selectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleSelect = (category) => {
    onSelect(category);
    setIsOpen(false);
  };

  return (
    <div css={s.customSelectContainer} ref={selectRef}>
      <button
        css={s.customSelectButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedCategory?.label || "카테고리 선택"}
      </button>
      {isOpen && (
        <div css={s.customSelectOptions} className={isOpen ? "open" : ""}>
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category.value}
                onClick={() => handleSelect(category)}
              >
                {category.label}
              </div>
            ))
          ) : (
            <div>카테고리가 존재하지 않습니다</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
