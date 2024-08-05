import { useState } from "react";
import { Link } from "react-router-dom";
import AuthPageInput from "../../../components/AuthPage/AuthPageInput/AuthPageInput";
import { userSigninRequest } from "../../../apis/api/signin";
import * as s from "./style";
import { useInput } from "../../../hooks/useInput";
import instance from "../../../apis/utils/instance";
import { useLogin } from "../../../components/AuthProvider/AuthProvider"; // useLogin 훅 사용
import { getUserPrincipalRequest } from "../../../apis/api/principal";

function LoginPage() {
  const [username, userNameChange] = useInput();
  const [password, passwordChange] = useInput();
  const login = useLogin(); // useLogin 훅 사용

  const handleSigninClick = () => {
    userSigninRequest({
      username,
      password,
    })
      .then((response) => {
        console.log("Signin response:", response);
        const accessToken = response.data;
        if (!accessToken) {
          console.log("AccessToken is null or empty");
          window.alert("로그인에 실패했습니다. 다시 시도해주세요.");
          return;
        }
        // 로컬 스토리지에 토큰 저장
        localStorage.setItem("AccessToken", accessToken);
        console.log("AccessToken 저장 완료:", localStorage.getItem("AccessToken"));

        // Axios 기본 헤더 설정
        instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        window.alert("성공적으로 로그인 되었습니다.");

        // 프린시펄 정보 가져오기
        const fetchPrincipal = async () => {
          try {
            let response;
            response = await getUserPrincipalRequest(accessToken);
            if (response && response.data) {
              // login 함수 호출
              login(accessToken, response.data);
            } else {
              throw new Error("No data in response");
            }
          } catch (error) {
            console.error("Failed to fetch principal:", error);
            window.alert("로그인에 실패했습니다. 다시 시도해주세요.");
          }
        };

        fetchPrincipal();
      })
      .catch((error) => {
        console.log("Signin error:", error);
        const errorMessage = error.response?.data || "로그인에 실패했습니다. 다시 시도해주세요.";
        window.alert(`로그인 실패: ${errorMessage}`);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSigninClick();
    }
  };

  return (
    <div css={s.loginLayout}>
      <div css={s.loginContainer}>
        <div css={s.header}>
          <h1>LogIn</h1>
        </div>
        <div css={s.input}>
          <AuthPageInput
            type={"text"}
            name={"username"}
            placeholder={"아이디"}
            value={username}
            onChange={userNameChange}
          />
          <AuthPageInput
            type={"password"}
            name={"password"}
            placeholder={"비밀번호"}
            value={password}
            onChange={passwordChange}
          />
          <button
            css={s.signinButton}
            onClick={handleSigninClick}
            onKeyPress={handleKeyPress}
          >
            로그인
          </button>
          <div css={s.search}>
            <Link to={"/auth/search/username"} css={s.link}>
              아이디 찾기
            </Link>
            <Link to={"/auth/search/password"} css={s.link}>
              비밀번호 찾기
            </Link>
          </div>
        </div>
      </div>
      <div css={s.singUpBox}>
        <span css={s.singUp}>
          <p>계정이 없으신가요 ?</p>
          <Link to={"/auth/signup/agreement"} css={s.link2}>
            가입하기
          </Link>
        </span>
      </div>
    </div>
  );
}

export default LoginPage;
