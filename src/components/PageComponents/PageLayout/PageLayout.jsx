import React from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../../../atoms/authAtom";
import Header from "../Header/Header";
import AdminHeader from "../AdminHeader/AdminHeader";
import UserHeader from "../UserHeader/UserHeader";

const PageLayout = ({ children }) => {
  const auth = useRecoilValue(authState);
  const { principal } = auth;

  const renderHeader = () => {
    if (!principal) {
      return <Header />;
    }
    if (principal.roleId === 1) {
      return <AdminHeader />;
    }
    if (principal.roleId === 2) {
      return <UserHeader />;
    }
  };

  return (
    <div>
      {renderHeader()}
      <main>{children}</main>
    </div>
  );
};

export default PageLayout;
