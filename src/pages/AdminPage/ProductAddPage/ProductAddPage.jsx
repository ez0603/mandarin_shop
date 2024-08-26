/** @jsxImportSource @emotion/react */
import { useParams } from "react-router-dom";
import * as s from "./style";
import { useState } from "react";
import ProductRegister from "../../../components/ProductComponents/ProductRegister/ProductRegister";
import useCategories from "../../../hooks/useCategories";
import useInsertProduct from "../../../hooks/useInsertProduct";
import useCategoryInsert from "../../../hooks/useCategoryInsert";
import OptionRegister from "../../../components/ProductComponents/OptionComponents/OptionRegister/OptionRegister";

function ProductAddPage(props) {
  const { productId } = useParams();
  const [categoryId, setCategoryId] = useState(0);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImg, setProductImg] = useState("");
  const [options, setOptions] = useState([]); // 추가된 옵션을 관리하는 상태
  const categories = useCategories();
  const { insertProduct } = useInsertProduct(categories);
  const { categoryName } = useCategoryInsert();

  const handleSaveProduct = async () => {
    const missingFields = [];

    if (!productName) missingFields.push("상품명");
    if (!categoryId) missingFields.push("카테고리");
    if (!productPrice) missingFields.push("상품 가격");
    if (!productDescription) missingFields.push("상품 설명");
    if (!productImg) missingFields.push("상품 이미지");

    if (missingFields.length > 0) {
      alert(`${missingFields.join(", ")}를 입력해주세요.`);
      return;
    }

    const productData = {
      productName,
      categoryId,
      productPrice: parseFloat(productPrice),
      productImg,
      productDescription,
    };

    try {
      await insertProduct(productData);
      alert("상품이 저장되었습니다.");
    } catch (error) {
      console.error("상품 저장 실패:", error);
      alert("상품 저장 중 오류가 발생했습니다.");
    }
  };

  const handleOptionAdd = (newOption) => {
    setOptions([...options, newOption]); // 새 옵션을 기존 옵션 배열에 추가
  };

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <div css={s.header}>
          <button css={s.saveButton} onClick={handleSaveProduct}>
            저장
          </button>
        </div>
        <div css={s.content}>
          <div css={s.productLayout}>
            <ProductRegister
              categories={categories}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              productName={productName}
              setProductName={setProductName}
              productPrice={productPrice}
              setProductPrice={setProductPrice}
              productDescription={productDescription}
              setProductDescription={setProductDescription}
              productImg={productImg}
              setProductImg={setProductImg}
            />
          </div>
          <div css={s.optionLayout}>
            <div css={s.optionInsert}>
              <OptionRegister
                productId={productId}
                onOptionAdd={handleOptionAdd}
              />
            </div>
            <div css={s.optionList}>
              {options.length > 0 ? (
                <ul>
                  {options.map((option, index) => (
                    <li key={index}>
                      {option.optionTitle}: {option.optionName}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>추가된 옵션이 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductAddPage;
