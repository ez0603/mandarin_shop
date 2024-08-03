/**@jsxImportSource @emotion/react */
import { useQuery } from "react-query";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { searchAllCategoryRequest } from "../../../apis/api/categoty";
import logo from "../../../assets/img/logo.png";
import * as s from "./style";
import { GoPerson } from "react-icons/go";
import { MdOutlineShoppingBag } from "react-icons/md";
import { authState } from "../../../atoms/authAtom";

function Header(props) {
  const [categories, setCategories] = useState([]);
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();

  const categoryQuery = useQuery(["categoryQuery"], searchAllCategoryRequest, {
    onSuccess: (response) => {
      setCategories(() =>
        response.data.map((category) => {
          console.log(response.data);
          return {
            value: category.categoryId,
            label: category.categoryName,
          };
        })
      );
    },
    onError: (error) => {
      console.log(error);
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const handleIconClick = () => {
    if (auth.principal) {
      navigate("/myPage");
    } else {
      navigate("/login");
    }
  };

  console.log(categories);

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <ul css={s.list}>
          {categories.map((category) => (
            <li key={category.value} css={s.listItem}>
              {category.label}
            </li>
          ))}
        </ul>
        <div css={s.logoLayout}>
          <img src={logo} alt="" />
        </div>
        <div css={s.mypageLayout}>
          <p>Manager</p>
          <GoPerson size={30} onClick={handleIconClick} />
          <MdOutlineShoppingBag size={30} />
        </div>
      </div>
    </div>
  );
}

export default Header;
