/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useLogin } from "../../../components/AuthProvider/AuthProvider";
import { useInput } from "../../../hooks/useInput";
import AuthPageInput from "../../../components/AuthPage/AuthPageInput/AuthPageInput";
import { Link, useNavigate } from "react-router-dom";
import { adminSigninRequest } from "../../../apis/api/signin";
import instance from "../../../apis/utils/instance";
import { getAdminPrincipalRequest } from "../../../apis/api/principal";
import { useSetRecoilState } from "recoil";
import { authState } from "../../../atoms/authAtom";

function AdminLoginPage(props) {
  const [adminName, adminNameChange] = useInput();
  const [adminPassword, adminPasswordChange] = useInput();
  const login = useLogin();
  const navigate = useNavigate();
  const setAuthState = useSetRecoilState(authState);

  const handleSigninClick = () => {
    const requestData = { adminName, adminPassword };

    adminSigninRequest(requestData)
      .then((response) => {
        console.log("Signin response:", response);
        const accessToken = response.data.accessToken || response.data.token || response.data;
        if (!accessToken) {
          console.log("AccessToken is null or empty");
          window.alert("로그인에 실패했습니다. 다시 시도해주세요.");
          return;
        }

        localStorage.setItem("AccessToken", accessToken);
      
        instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        window.alert("성공적으로 로그인 되었습니다.");

        const fetchPrincipal = async () => {
          try {
            const adminResponse = await getAdminPrincipalRequest(accessToken);
            if (adminResponse && adminResponse.data) {
              console.log("Admin principal response:", adminResponse.data);
              // authState 설정
              setAuthState({
                token: accessToken,
                principal: adminResponse.data,
              });
              login(accessToken, adminResponse.data);

              // 관리자 페이지로 이동
              navigate("/admin/home");
            } else {
              throw new Error("Admin data not found");
            }
          } catch (error) {
            window.alert("로그인에 실패했습니다. 다시 시도해주세요.");
          }
        };

        fetchPrincipal();
      })
      .catch((error) => {
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
          <h1>Admin LogIn</h1>
        </div>
        <div css={s.input}>
          <AuthPageInput
            type={"text"}
            name={"adminName"}
            placeholder={"아이디"}
            value={adminName}
            onChange={adminNameChange}
          />
          <AuthPageInput
            type={"password"}
            name={"adminPassword"}
            placeholder={"비밀번호"}
            value={adminPassword}
            onChange={adminPasswordChange}
          />
          <button
            css={s.signinButton}
            onClick={handleSigninClick}
            onKeyPress={handleKeyPress}
          >
            로그인
          </button>
          <div css={s.search}>
            <Link to={"/auth/search/adminName"} css={s.link}>
              아이디 찾기
            </Link>
            <Link to={"/auth/search/adminPassword"} css={s.link}>
              비밀번호 찾기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
