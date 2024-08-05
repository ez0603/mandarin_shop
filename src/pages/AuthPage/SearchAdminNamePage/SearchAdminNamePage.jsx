/** @jsxImportSource @emotion/react */
import * as s from "./style";
import AuthPageInput from "../../../components/AuthPage/AuthPageInput/AuthPageInput";
import { useInput } from "../../../hooks/useInput";
import { searchAdminnameByEmailRequest } from "../../../apis/api/account";
import { useMutation } from "react-query";
import { useState, useEffect } from "react";
import { MdPeopleAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function SearchAdminNamePage() {
  const [customerName, customerNameChange, customerNameMessage] = useInput("adminName");
  const [email, emailChange, emailMessage] = useInput("email");
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFormValid(customerName.trim() !== "" || email.trim() !== "");
  }, [customerName, email]);

  const searchAdminnameByEmailMutation = useMutation({
    mutationKey: "searchAdminnameByEmailRequest",
    mutationFn: searchAdminnameByEmailRequest,
    retry: 0,
    onSuccess: (response) => {
      console.log(response.data);
      if (response.data === false) {
        alert("해당 사용자가 존재하지 않습니다");
        return;
      }
      alert("해당 메일로 계정이름을 전송하였습니다.");
      navigate("/auth/login/admin"); 
    },
    onError: (error) => {
      alert(error.response.data);
    },
  });

  const handleEmailSendClick = () => {
    if (window.confirm("메일은 전송하겠습니까?")) {
      searchAdminnameByEmailMutation.mutate({
        name: customerName,
        email: email,
      });
    }
  };

  return (
    <div css={s.userNameLayout}>
      <div css={s.userNameContainer}>
        <div css={s.header}>
          <span>
            <MdPeopleAlt size={80} color="#757575" />
          </span>
          <h1>관리자 ID 찾기</h1>
          <h3>
            관리자의 이름, 이메일 주소을 입력하시면 이메일로 관리자 ID를 알려드립니다.
          </h3>
        </div>
        <div css={s.input}>
          <AuthPageInput
            type={"text"}
            name={"customerName"}
            placeholder={"관리자 이름"}
            value={customerName}
            onChange={customerNameChange}
            message={customerNameMessage}
          />
          <AuthPageInput
            type={"text"}
            name={"email"}
            placeholder={"이메일"}
            value={email}
            onChange={emailChange}
            message={emailMessage}
          />
          <button
            onClick={handleEmailSendClick}
            css={s.button(isFormValid)}
            disabled={!isFormValid}
          >
            메일 전송
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchAdminNamePage;
