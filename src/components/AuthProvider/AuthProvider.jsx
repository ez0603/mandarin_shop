import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { authState } from "../../atoms/authAtom";
import { getPrincipalRequest } from "../../apis/api/principal";

const AuthProvider = ({ children }) => {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrincipal = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await getPrincipalRequest();
          setAuth({
            token,
            principal: response.data,
          });
        } catch (error) {
          console.error("Failed to fetch principal:", error);
          setAuth({
            token: null,
            principal: null,
          });
          localStorage.removeItem("token");
        }
      }
    };

    fetchPrincipal();
  }, [setAuth]);

  const login = (token, principal) => {
    setAuth({ token, principal });
    localStorage.setItem("token", token);
    navigate("/");
  };

  const logout = () => {
    setAuth({ token: null, principal: null });
    localStorage.removeItem("token");
    navigate("/login");
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
