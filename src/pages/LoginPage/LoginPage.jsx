/**@jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import { useInput } from "../../hooks/useInput";
import AuthPageInput from "../../components/AuthPage/AuthPageInput/AuthPageInput";
import * as s from "./style";

function LoginPage(props) {
  const [username, userNameChange] = useInput("username");
  const [password, passwordChange] = useInput("password");

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

          <button css={s.signinButton}>로그인</button>
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
          <Link to={"/auth/agreement"} css={s.link2}>
            가입하기
          </Link>
        </span>
      </div>
    </div>
  );
}

export default LoginPage;
