/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useState } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import noImg from "../../../assets/img/noImg.png";
import CategorySelect from "../../CategorySelect/CategorySelect";
function ProductRegister({
  categories,
  categoryId,
  setCategoryId,
  productName, // 부모 컴포넌트에서 전달된 상태를 사용
  setProductName, // 부모 컴포넌트에서 전달된 setter 함수를 사용
  productPrice,
  setProductPrice,
  productDescription,
  setProductDescription,
  productImg,
  setProductImg,
  inventoryQuantity,
  setInventoryQuantity,
}) {
  const [isEditing, setIsEditing] = useState(true);

  const handleImageUpload = (url) => {
    setProductImg(url);
  };

  const displayedImage = productImg || noImg; // 여기에 올바르게 설정된 productImg를 사용

  const handleCategorySelect = (category) => {
    setCategoryId(category.value);
  };

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <div css={s.imgBox}>
          <ImageUpload
            initialImage={displayedImage}
            onImageUpload={handleImageUpload}
            isEditing={isEditing}
          />
        </div>
        <div css={s.textContainer}>
          <div css={s.categoryBox}>
            <label>카테고리</label>
            <div css={s.category}>
              <CategorySelect
                categories={categories}
                onSelect={handleCategorySelect}
                selectedCategory={categories.find(
                  (cat) => cat.value === categoryId
                )}
              />
            </div>
          </div>
          <div css={s.productLayout}>
            <div css={s.productBox}>
              <label>상품명</label>
              <input
                onChange={(e) => setProductName(e.target.value)}
                value={productName} 
                type="text"
              />
            </div>
            <div css={s.productBox}>
              <label>가격</label>
              <input
                onChange={(e) => setProductPrice(e.target.value)}
                value={productPrice} 
                type="text"
              />
            </div>
            <div css={s.productBox}>
              <label>수량</label>
              <input
                onChange={(e) => setInventoryQuantity(e.target.value)}
                value={inventoryQuantity}
                type="number"
              />
            </div>
          </div>
          <div css={s.descriptionBox}>
            <label>상품 설명</label>
            <textarea
              onChange={(e) => setProductDescription(e.target.value)}
              value={productDescription} // 부모 컴포넌트에서 전달된 값을 사용
              rows="4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductRegister;
