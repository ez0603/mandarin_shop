/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { agreedState } from "../../../atoms/agreedStateAtom";
import { useNavigate, useSearchParams } from "react-router-dom";
import Agreement from "../../../components/AuthPage/Agreement/Agreement";
import { marketingTerms, serviceTerms } from "./terms";

function TACPage() {
  const [agreed, setAgreed] = useRecoilState(agreedState);
  const [isAgreedRequired, setIsAgreedRequired] = useState(false);
  const [check, setCheck] = useState({
    "이용약관 동의 (필수)": false,
    "마켓팅 동의 (선택)": false,
    "만 14세 이상 동의 (필수)": false,
    전체동의: false,
  });
  const navigator = useNavigate();

  useEffect(() => {
    const allChecked = Object.values(check)
      .slice(0, -1)
      .every((value) => value);
    const requiredChecked =
      check["이용약관 동의 (필수)"] && check["만 14세 이상 동의 (필수)"];
    setCheck((prev) => ({ ...prev, 전체동의: allChecked }));
    setIsAgreedRequired(requiredChecked);
    setAgreed(allChecked || requiredChecked);
  }, [check]);

  const handleNextClick = () => {
    if (!check["이용약관 동의 (필수)"] || !check["만 14세 이상 동의 (필수)"]) {
      alert("필수 항목에 동의해야 합니다.");
      return;
    } else {
      navigator("/auth/signup/userInfo");
    }
  };

  return (
    <div css={s.pageLayout}>
      <div css={s.header}>
        <h1>약관동의</h1>
      </div>
      <div css={s.pageContainer}>
        <div css={s.agreeBox}>
          <div css={s.container}>
            <div css={s.agree}>
              <Agreement
                title={"전체동의"}
                setCheck={setCheck}
                check={check}
                isAllChecked={check["전체동의"]}
                noToggle
              />
              <Agreement
                title={"만 14세 이상 동의 (필수)"}
                setCheck={setCheck}
                check={check}
                noToggle
              />
              <Agreement
                title={"이용약관 동의 (필수)"}
                content={serviceTerms}
                setCheck={setCheck}
                check={check}
              />
              <Agreement
                title={"마켓팅 동의 (선택)"}
                content={marketingTerms}
                setCheck={setCheck}
                check={check}
              />
            </div>
          </div>
        </div>
        <div css={s.buttonBox}>
          <button onClick={handleNextClick} css={s.button(isAgreedRequired)}>
            동의 후 넘어가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default TACPage;
