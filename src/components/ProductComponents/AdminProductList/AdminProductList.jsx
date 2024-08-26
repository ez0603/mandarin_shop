/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "./style";
import {
  getProductRequest,
  getProductCategoryRequest,
  deleteProductRequest,
} from "../../../apis/api/product";
import useCategories from "../../../hooks/useCategories";

function AdminProductList() {
  const [productList, setProductList] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [filteredProductList, setFilteredProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [productsPerPage] = useState(5); // 페이지 당 보여줄 상품 개수
  const categories = useCategories();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductRequest();
        const uniqueProducts = removeDuplicates(response.data);
        setProductList(uniqueProducts);
        setFilteredProductList(uniqueProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  // 중복 제거 함수
  const removeDuplicates = (products) => {
    const uniqueProducts = [];
    const productIds = new Set();

    products.forEach((product) => {
      if (!productIds.has(product.productId)) {
        uniqueProducts.push(product);
        productIds.add(product.productId);
      }
    });

    return uniqueProducts;
  };

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

  const handleEdit = () => {
    if (selectedProducts.length !== 1) {
      alert("수정은 하나의 제품만 가능합니다.");
      return;
    }
    navigate(`/admin/product/edit/${selectedProducts[0]}`);
  };

  const handleDelete = async () => {
    if (selectedProducts.length === 0) {
      alert("삭제할 제품을 선택하세요.");
      return;
    }

    const confirmDelete = window.confirm(
      "선택된 모든 제품을 삭제하시겠습니까?"
    );

    if (confirmDelete) {
      try {
        for (const id of selectedProducts) {
          await deleteProductRequest(id);
        }
        alert("제품이 삭제되었습니다.");

        const response = await getProductRequest();
        const uniqueProducts = removeDuplicates(response.data);
        setProductList(uniqueProducts);
        setFilteredProductList(uniqueProducts);
        setSelectedProducts([]);
        setIsAllSelected(false);
      } catch (error) {
        console.error("제품 삭제 실패:", error);
        alert("제품 삭제에 실패했습니다.");
      }
    }
  };

  const handleCategoryClick = async (categoryId) => {
    setSelectedCategory(categoryId);
    try {
      let response;
      if (categoryId) {
        response = await getProductCategoryRequest(categoryId);
      } else {
        response = await getProductRequest();
      }
      const uniqueProducts = removeDuplicates(response.data);
      setFilteredProductList(uniqueProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFilteredProductList(productList);
  }, [productList]);

  // 페이지네이션을 위한 인덱스 계산
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProductList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredProductList.length / productsPerPage);

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <div css={s.category}>
          <ul css={s.list}>
            {categories.map((category) => (
              <li
                key={category.value}
                css={[
                  s.listItem,
                  selectedCategory === category.value && s.selectedListItem, // 선택된 카테고리에 스타일 적용
                ]}
                onClick={() => handleCategoryClick(category.value)}
              >
                {category.label}
              </li>
            ))}
          </ul>
        </div>
        <div css={s.headerContainer}>
          <div css={s.headerItem}>
          </div>
          <div>
            <button css={s.selectAllCheckbox} onClick={handleSelectAllChange}>
              전체 선택
            </button>
            <button onClick={handleEdit}>
              수정
            </button>
            <button  onClick={handleDelete}>
              삭제
            </button>
          </div>
        </div>
        {currentProducts.map((product) => (
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
          </div>
        ))}
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminProductList;
