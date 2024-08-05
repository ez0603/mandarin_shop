import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { authState } from "../../atoms/authAtom";
import { getAdminPrincipalRequest, getUserPrincipalRequest } from "../../apis/api/principal";

const AuthProvider = ({ children }) => {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrincipal = async () => {
      const token = localStorage.getItem("AccessToken");
      if (token) {
        try {
          let response;
          
          // 사용자 프린시펄 요청
          try {
            response = await getUserPrincipalRequest(token);
            if (response && response.data) {
              setAuth({
                token,
                principal: response.data,
              });
              navigate("/user/home");
              return;
            }
          } catch (userError) {
            console.error("Failed to fetch user principal:", userError);
          }

          // 관리자 프린시펄 요청
          try {
            response = await getAdminPrincipalRequest(token);
            if (response && response.data) {
              setAuth({
                token,
                principal: response.data,
              });
              navigate("/admin/home");
              return;
            }
          } catch (adminError) {
            console.error("Failed to fetch admin principal:", adminError);
          }

          // 프린시펄 데이터를 찾지 못했을 경우
          throw new Error("No principal data found");

        } catch (error) {
          console.error("Failed to fetch principal:", error);
          setAuth({
            token: null,
            principal: null,
          });
          localStorage.removeItem("AccessToken");
          navigate("/auth/login");
        }
      }
    };

    fetchPrincipal();
  }, [setAuth, navigate]);

  const login = (token, principal) => {
    setAuth({ token, principal });
    localStorage.setItem("AccessToken", token);

    if (principal.roleId === 1) {
      navigate("/admin/home");
    } else if (principal.roleId === 2) {
      navigate("/user/home");
    } else {
      navigate("/"); // 기본 경로
    }
  };

  const logout = () => {
    setAuth({ token: null, principal: null });
    localStorage.removeItem("AccessToken");
    navigate("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthContext = React.createContext();

export const useLogin = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useLogin must be used within an AuthProvider");
  }
  return context.login;
};

export const useLogout = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useLogout must be used within an AuthProvider");
  }
  return context.logout;
};

export default AuthProvider;
