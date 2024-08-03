import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useQueryClient } from "react-query";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";

function AuthRoute() {
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");
  console.log(principalData);

  useEffect(() => {
    if (!!principalData) {
      alert("잘못된 접근입니다. (토큰이 있음)");
      window.location.replace("/");
    }
  }, [principalData]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup/*" element={<SignupPage />} />
    </Routes>
  );
}

export default AuthRoute;
