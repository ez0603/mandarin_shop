/** @jsxImportSource @emotion/react */
import * as s from "./style";

function OptionRegister({
  optionTitle,
  setOptionTitle,
  optionName,
  setOptionName,
  onOptionAdd
}) {
  const handleAddOption = () => {
    if (!optionTitle || !optionName) {
      alert("옵션 타이틀과 이름을 입력해 주세요.");
      return;
    }

    const newOption = {
      optionTitle,
      optionName
    };

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
