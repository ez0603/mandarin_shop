/** @jsxImportSource @emotion/react */
import * as s from "./style";
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
    <div css={s.layout}>
      {renderHeader()}
      {children}
    </div>
  );
};

export default PageLayout;
