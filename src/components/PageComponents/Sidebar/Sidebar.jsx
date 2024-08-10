/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../../atoms/authAtom";
import * as s from "./style";
import { MdPayment } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

function Sidebar() {
  const [isShow, setShow] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로를 가져옴
  const auth = useRecoilValue(authState);
  const { principal } = auth;

  const handleOpenButtonClick = () => {
    setShow(true);
    setButtonVisible(false);
  };

  const handleCloseButtonClick = () => {
    setShow(false);
    setTimeout(() => {
      setButtonVisible(true);
    }, 400);
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

  return (
    <div css={s.layout}>
      <div>
        <ul css={s.menuList}>
          <li css={s.menuItem}>
            <Link
              to="/admin/sales"
              css={[
                s.link,
                location.pathname === "/admin/sales" && s.activeLink,
              ]}
              onClick={handleSalesClick}
            >
              <MdPayment size={27} /> 매출 현황
            </Link>
          </li>
          <li css={s.menuItem}>
            <Link
              to="/admin/product"
              css={[
                s.link,
                (location.pathname === "/admin/product" ||
                  location.pathname.includes("/admin/product/edit")) &&
                  s.activeLink,
              ]}
              onClick={handleProductClick}
            >
              <FaShoppingCart size={27} />
              상품 관리
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
