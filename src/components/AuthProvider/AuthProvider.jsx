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
      console.log("Token from localStorage in AuthProvider:", token);
      if (token) {
        try {
          let response;
          response = await getUserPrincipalRequest(token);
          if (response && response.data) {
            setAuth({
              token,
              principal: response.data,
            });
          } else {
            throw new Error("No data in response");
          }
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
    console.log("Token saved to localStorage:", localStorage.getItem("AccessToken"));
    navigate("/user/home");
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
