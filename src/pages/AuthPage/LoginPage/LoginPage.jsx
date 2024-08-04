/**@jsxImportSource @emotion/react */
import { Link, useNavigate } from "react-router-dom";
import { useInput } from "../../../hooks/useInput";
import AuthPageInput from "../../../components/AuthPage/AuthPageInput/AuthPageInput";
import * as s from "./style";
import { useMutation } from "react-query";
import { signinRequest } from "../../../apis/api/signin";  

function LoginPage(props) {
  const [username, userNameChange] = useInput("username");
  const [password, passwordChange] = useInput("password");
  const navigate = useNavigate();

  const loginMutation = useMutation(signinRequest, {
    onSuccess: (response) => {
      console.log("API response:", response); 

      if (response.data && response.data !== '') {  
        const accessToken = response.data;  
        localStorage.setItem("AccessToken", accessToken);
        navigate("/");  
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");  
      }
    },
    onError: (error) => {
      console.error("Error:", error);
      const errorMessage = error.response?.data?.message || "로그인에 실패했습니다. 다시 시도해주세요.";
      alert(errorMessage);
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
