/**@jsxImportSource @emotion/react */
import * as s from "./style";
import { QueryClient } from "react-query";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import { authState } from "../../../atoms/authAtom";
import { IoSettingsOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import instance from "../../../apis/utils/instance";
import Sidebar from "../Sidebar/Sidebar";

function AdminHeader(props) {
  const auth = useRecoilValue(authState);
  const { principal } = auth;
  const navigate = useNavigate();
  const queryClient = new QueryClient(); // QueryClient 인스턴스 생성

  const handleLogoClick = () => {
    if (principal?.roleId === 1) {
      navigate("/admin/home");
    } else {
      window.alert("접근 권한이 없습니다.");
    }
  };

  const handleProductClick = () => {
    if (principal?.roleId === 1) {
      navigate("/admin/product");
    } else {
      window.alert("접근 권한이 없습니다.");
    }
  };

  const handleSalesClick = () => {
    if (principal?.roleId === 1) {
      navigate("/admin/sales");
    } else {
      window.alert("접근 권한이 없습니다.");
    }
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("AccessToken");
    // 요청 시 낚아채서 해당 함수 실행
    instance.interceptors.request.use((config) => {
      config.headers.Authorization = null;
      return config;
    });
    queryClient.invalidateQueries("principalQuery");
    window.alert("성공적으로 로그아웃 되었습니다.");
    window.location.href = "/";
  };

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <div css={s.headerContent}>
          <div css={s.logoLayout} onClick={handleLogoClick}>
            <img src={logo} alt="Logo" />
          </div>
          <div css={s.mypageAndCategory}>
            <div css={s.mypageLayout}>
              <div css={s.iconWithText} onClick={handleLogoutClick}>
                <GoPerson size={30} />
                <span>로그아웃</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
