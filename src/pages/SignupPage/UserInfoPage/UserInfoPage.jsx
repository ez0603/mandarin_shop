/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useMemo, useState } from "react";
import AuthPageInput from "../../../components/AuthPage/AuthPageInput/AuthPageInput";
import { useInput } from "../../../hooks/useInput";
import { adminSignupRequest } from "../../../apis/api/signup";
import { useMutation } from "react-query";
import {
  sendAuthMailRequest,
  verifyCodeRequest,
} from "../../../apis/api/sendAuthMail";
import { useNavigate } from "react-router-dom";

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

function UserInfoPage() {
  const [customerName, customerNameChange, customerNameMessage] = useInput("customerName");
  const [
    username,
    userNameChange,
    usernameMessage,
    setUsernameValue,
    setUsernameMessage,
  ] = useInput("username");
  const [password, passwordChange, passwordMessage] = useInput("password");
  const [checkPassword, checkPasswordChange] = useInput("checkPassword");
  const [checkPasswordMessage, setCheckPasswordMessage] = useState(null);
  const [email, emailChange, emailMessage] = useInput("email");
  const [
    phone,
    phoneChange,
    phoneMessage,
    setCompanyNumberValue,
    setPhoneMessage,
  ] = useInput("phone");
  const [
    address,
    addressChange,
    addressMessage,
    setCompanyAddressValue,
    setAddressMessage,
  ] = useInput("address");
  const [authCode, authCodeChange, authCodeMessage] = useInput("authCode");

  const [emailButton, setEmailButton] = useState(false);
  const [isStoreInfo, setIsStoreInfo] = useState(false);
  const [isEmailAuthCode, setIsEmailAuthCode] = useState(false);

  const [second, setSecond] = useState(180);

  const navigate = useNavigate();

  // 모든 필드가 채워졌는지 확인하는 함수
  const allFieldsFilled = () => {
    return (
      customerName && username && password && checkPassword && email && authCode
    );
  };

  // 인증코드 타이머
  const time = useMemo(() => {
    let timer;
    if (isEmailAuthCode) {
      timer = setInterval(() => {
        setSecond((prevSecond) => {
          if (prevSecond === 0) {
            clearInterval(timer);
            return 0;
          }
          return prevSecond - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [second]);

  // 비밀번호 체크
  useEffect(() => {
    if (!checkPassword || !password) {
      setCheckPasswordMessage(() => null);
      return;
    }

    if (checkPassword === password) {
      setCheckPasswordMessage(() => {
        return {
          type: "success",
          text: "",
        };
      });
    } else {
      setCheckPasswordMessage(() => {
        return {
          type: "error",
          text: "비밀번호가 일치하지 않습니다.",
        };
      });
    }
  }, [checkPassword, password]);

  // 메일 버튼 활성화
  useEffect(() => {
    if (
      emailMessage?.type === "error" ||
      emailMessage?.type === null ||
      emailMessage?.type === undefined
    ) {
      setEmailButton(false);
    } else if (emailMessage?.type === "success") {
      setEmailButton(true);
    }
  }, [emailMessage]);

  // 인증 메일 전송
  const mailAuthentication = useMutation({
    mutationKey: "mailAuthentication",
    mutationFn: sendAuthMailRequest,
    onSuccess: (response) => {
      setSecond(() => 180);
      setIsEmailAuthCode(() => true);
      alert("인증 코드가 전송되었습니다. 이메일을 확인해주세요.");
    },
    onError: (error) => {
      console.log(error);
      alert("인증 코드 전송에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const handleMailSend = (email) => {
    if (window.confirm("이 메일로 인증번호를 발송할까요?")) {
      mailAuthentication.mutate(email);
    }
  };

  // 인증 코드 전송
  const verifyCode = useMutation({
    mutationKey: "verifyCode",
    mutationFn: verifyCodeRequest,
    onSuccess: (response) => {
      alert(response.data);
    },
    onError: (error) => {
      alert(error.response.data);
    },
  });

  const handleCodeSend = () => {
    verifyCode.mutate({
      email: email,
      authCode: authCode,
    });
  };

  // 다음
  const isOpenStroeInfo = () => {
    const checkFlags = [
      usernameMessage?.type,
      passwordMessage?.type,
      checkPasswordMessage?.type,
      customerNameMessage?.type,
      emailMessage?.type,
      authCodeMessage?.type,
    ];

    if (
      checkFlags.includes("error")
    ) {
      alert("가입 정보를 다시 확인하세요.");
      return;
    }
    setIsStoreInfo(true);
  };

  // 뒤로 가기
  const isCloseStroeInfo = () => {
    setIsStoreInfo(false);
  };

  // 회원가입 버튼
  const handleSignupSubmit = () => {
    const checkFlags = [
      phoneMessage?.type,
      addressMessage?.type,
    ];
  
    if (checkFlags.includes("error")) {
      alert("매장 정보를 다시 확인하세요.");
      return;
    }
  
    adminSignupRequest({
      customerName,
      username,
      password,
      email,
      phone: parseInt(phone),
      address,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          alert("회원가입이 완료되었습니다. 로그인 해주세요.");
          navigate("/auth/login");
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 409) { // Conflict status code for duplicate entries
            alert("회원가입 실패: " + (error.response.data.message || JSON.stringify(error.response.data)));
          } else {
            alert("회원가입 오류: " + (error.response.data.message || JSON.stringify(error.response.data)));
          }
        } else {
          alert("회원가입 오류: 서버와의 통신에 실패했습니다.");
        }
      });
  };
  
  return (
    <div css={s.layout}>
      <div css={s.container}>
        <div css={s.containerBox}>
          <div css={s.header}>
            <h1>ID 생성</h1>
          </div>
          {!isStoreInfo ? (
            <>
              <div css={s.inputContainer}>
                <AuthPageInput
                  type={"text"}
                  name={"customerName"}
                  placeholder={"성명"}
                  value={customerName}
                  onChange={customerNameChange}
                  message={customerNameMessage}
                />
                <AuthPageInput
                  type={"text"}
                  name={"username"}
                  placeholder={"아이디"}
                  value={username}
                  onChange={userNameChange}
                  message={usernameMessage}
                />
                <AuthPageInput
                  type={"password"}
                  name={"password"}
                  placeholder={"비밀번호"}
                  value={password}
                  onChange={passwordChange}
                  message={passwordMessage}
                />
                <AuthPageInput
                  type={"password"}
                  name={"checkPassword"}
                  placeholder={"비밀번호 확인"}
                  value={checkPassword}
                  onChange={checkPasswordChange}
                  message={checkPasswordMessage}
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
                  css={s.authentiCation(emailButton)}
                  disabled={!emailButton}
                  onClick={() => handleMailSend(email)}
                >
                  인증 코드 보내기
                </button>

                <AuthPageInput
                  type={"text"}
                  name={"authCode"}
                  placeholder={"인증코드"}
                  value={authCode}
                  onChange={authCodeChange}
                  message={authCodeMessage}
                  disabled={!isEmailAuthCode}
                />
                <h4>남은 인증 시간 {formatTime(second)}</h4>
                <button
                  css={s.authentiCation(isEmailAuthCode)}
                  disabled={!isEmailAuthCode}
                  onClick={() => handleCodeSend()}
                >
                  인증하기
                </button>
              </div>

              <button
                css={s.signinButton(allFieldsFilled())}
                onClick={isOpenStroeInfo}
              >
                다음
              </button>
            </>
          ) : (
            <>
              <div css={s.nextInput}>
                <AuthPageInput
                  type={"text"}
                  name={"customerName"}
                  placeholder={"성명"}
                  value={customerName}
                  onChange={customerNameChange}
                  message={customerNameMessage}
                  disabled
                />
                <AuthPageInput
                  type={"text"}
                  name={"username"}
                  placeholder={"아이디"}
                  value={username}
                  onChange={userNameChange}
                  message={usernameMessage}
                  disabled
                />
                <AuthPageInput
                  type={"password"}
                  name={"password"}
                  placeholder={"비밀번호"}
                  value={password}
                  onChange={passwordChange}
                  message={passwordMessage}
                  disabled
                />
                <AuthPageInput
                  type={"password"}
                  name={"checkPassword"}
                  placeholder={"비밀번호 확인"}
                  value={checkPassword}
                  onChange={checkPasswordChange}
                  message={checkPasswordMessage}
                  disabled
                />
                <AuthPageInput
                  type={"text"}
                  name={"email"}
                  placeholder={"이메일"}
                  value={email}
                  onChange={emailChange}
                  message={emailMessage}
                  disabled
                />
              </div>

              <div css={s.nextInput}>
                <AuthPageInput
                  type={"number"}
                  name={"phone"}
                  placeholder={"휴대폰번호"}
                  value={phone}
                  onChange={phoneChange}
                  message={phoneMessage}
                />
                <AuthPageInput
                  type={"text"}
                  name={"address"}
                  placeholder={"주소"}
                  value={address}
                  onChange={addressChange}
                  message={addressMessage}
                />
              </div>

              <button css={s.signinButton(true)} onClick={isCloseStroeInfo}>
                뒤로가기
              </button>

              <button css={s.signinButton(true)} onClick={handleSignupSubmit}>
                회원가입하기
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserInfoPage;
