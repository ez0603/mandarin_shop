/**@jsxImportSource @emotion/react */
import { Link, useNavigate } from "react-router-dom";
import { useInput } from "../../../hooks/useInput";
import AuthPageInput from "../../../components/AuthPage/AuthPageInput/AuthPageInput";
import * as s from "./style";
import { useMutation } from "react-query";
import { signinRequest } from "../../../apis/api/signin";  // signinRequest를 올바르게 임포트

function LoginPage(props) {
  const [username, userNameChange] = useInput("username");
  const [password, passwordChange] = useInput("password");
  const navigate = useNavigate();

  const loginMutation = useMutation(signinRequest, {
    onSuccess: (response) => {
      console.log("API response:", response); // 응답 데이터를 콘솔에 출력합니다.

      // 응답 데이터에 토큰이 있는지 확인합니다.
      if (response.data && response.data !== '') {  // data가 빈 문자열이 아닌 경우
        const accessToken = response.data;  // accessToken을 응답에서 가져옵니다.
        localStorage.setItem("AccessToken", accessToken);
        navigate("/");  // 로그인 성공 시 루트 경로로 이동합니다.
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");  // 로그인 실패 시 알림을 표시합니다.
      }
    },
    onError: (error) => {
      console.error("Error:", error);
      // 서버에서 받은 에러 메시지를 출력하거나 기본 에러 메시지를 표시합니다.
      const errorMessage = error.response?.data?.message || "로그인에 실패했습니다. 다시 시도해주세요.";
      alert(errorMessage);  // 요청 에러 시 알림을 표시합니다.
    }
  });

  const handleClick = () => {
    loginMutation.mutate({
      username: username,
      password: password,
    });
  };

  return (
    <div css={s.loginLayout}>
      <div css={s.loginContainer}>
        <div css={s.header}>
          <h1>LogIn </h1>
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

          <button css={s.signinButton} onClick={handleClick}>로그인</button>
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
