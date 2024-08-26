/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";

function OptionRegister({ productId, onOptionAdd }) {
  const [optionName, setOptionName] = useState("");
  const [optionTitle, setOptionTitle] = useState("");

  const handleAddOption = () => {
    if (!optionTitle || !optionName) {
      alert("옵션 타이틀과 이름을 입력해 주세요.");
      return;
    }

    const newOption = {
      optionTitle,
      optionName,
    };

    // 로컬 스토리지에 옵션 저장
    const existingOptions = JSON.parse(localStorage.getItem("options")) || [];
    existingOptions.push(newOption);
    localStorage.setItem("options", JSON.stringify(existingOptions));

    // 상태 업데이트를 통해 옵션을 부모 컴포넌트로 전달
    onOptionAdd(newOption);

    // 입력 필드 초기화
    setOptionTitle("");
    setOptionName("");

    alert("옵션이 추가되었습니다.");
  };

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <div css={s.productLayout}>
          <div css={s.productBox}>
            <label>옵션 타이틀</label>
            <input
              value={optionTitle}
              onChange={(e) => setOptionTitle(e.target.value)}
              type="text"
            />
          </div>
          <div css={s.productBox}>
            <label>옵션 이름</label>
            <input
              value={optionName}
              onChange={(e) => setOptionName(e.target.value)}
              type="text"
            />
          </div>
          <button onClick={handleAddOption}>추가</button>
        </div>
      </div>
    </div>
  );
}

export default OptionRegister;
