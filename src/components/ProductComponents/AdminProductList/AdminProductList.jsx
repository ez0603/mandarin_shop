/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "./style";
import {
  getProductRequest,
  getProductCategoryRequest,
} from "../../../apis/api/product";
import useCategories from "../../../hooks/useCategories";

function AdminProductList() {
  const [productList, setProductList] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [filteredProductList, setFilteredProductList] = useState([]);
  const categories = useCategories();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductRequest();
        setProductList(response.data);
        setFilteredProductList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(productId)) {
        return prevSelectedProducts.filter((id) => id !== productId);
      } else {
        return [...prevSelectedProducts, productId];
      }
    });
  };

  const handleSelectAllChange = () => {
    if (isAllSelected) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(productList.map((product) => product.productId));
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleEdit = (productId) => {
    if (!selectedProducts.includes(productId)) {
      setSelectedProducts([productId]);
    }
    navigate(`/product/edit/${productId}`);
  };

  const handleDelete = (productId) => {
    if (!selectedProducts.includes(productId)) {
      setSelectedProducts([productId]);
    }
    navigate(`/product/delete/${productId}`);
  };

  const handleCategoryClick = async (categoryId) => {
    try {
      let response;
      if (categoryId) {
        response = await getProductCategoryRequest(categoryId);
      } else {
        response = await getProductRequest();
      }
      setFilteredProductList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFilteredProductList(productList);
  }, [productList]);

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <div css={s.category}>
          <ul css={s.list}>
            {categories.map((category) => (
              <li
                key={category.value}
                css={s.listItem}
                onClick={() => handleCategoryClick(category.value)}
              >
                {category.label}
              </li>
            ))}
          </ul>
        </div>
        <div css={s.headerContainer}>
          <div css={s.headerItem}>
            <span>상품명</span>
            <span>가격</span>
          </div>
          <button
            css={s.selectAllCheckbox}
            onClick={handleSelectAllChange}
            checked={isAllSelected}
          >
            전체 선택
          </button>
        </div>
        {filteredProductList.map((product) => (
          <div
            key={product.productId}
            css={[
              s.productContainer,
              selectedProducts.includes(product.productId) &&
                s.selectedProductContainer,
            ]}
          >
            <input
              type="checkbox"
              css={s.checkbox}
              onChange={() => handleCheckboxChange(product.productId)}
              checked={selectedProducts.includes(product.productId)}
            />
            <div css={s.imgBox}>
              <img src={product.productImg} alt="" css={s.imgStyle} />
            </div>
            <div css={s.productBox}>
              <span css={s.productItem}>{product.productName}</span>
              <span css={s.productItem}>{product.productPrice} 원</span>
            </div>
            <div css={s.buttonBox}>
              <button onClick={() => handleEdit(product.productId)}>
                수정
              </button>
              <button onClick={() => handleDelete(product.productId)}>
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProductList;
