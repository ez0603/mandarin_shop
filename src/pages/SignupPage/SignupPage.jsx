import React from "react";
import { Route, Routes } from "react-router-dom";
import TermsAndConditions from "./TACPage/TACPage";
import UserInfoPage from "./UserInfoPage/UserInfoPage";

function SignupPage() {
  return (
    <>
      <Routes>
        <Route path="/agreement" element={<TermsAndConditions />} />
        <Route path="/userInfo" element={<UserInfoPage />} />
      </Routes>
    </>
  );
}

export default SignupPage;
