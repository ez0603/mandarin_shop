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
  inserProduct,
  categoryName,
  handleRecommendChange,
}) {
  const [productName, setProductName] = useState();
  const [productPrice, setProductPrice] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(true);

  const handleImageUpload = (url) => {
    setSelectedImage(url);
  };

  // 이미지가 없을 때 noImg를 기본 이미지로 설정
  const displayedImage = selectedImage || noImg;

  const handleCategorySelect = (category) => {
    setCategoryId(category.value); // 선택된 카테고리의 값을 setCategoryId로 업데이트
  };

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <div css={s.textContainer}>
          <label>카테고리 선택</label>
          <div css={s.category}>
            <CategorySelect
              categories={categories}
              onSelect={handleCategorySelect}
              selectedCategory={categories.find(
                (cat) => cat.value === categoryId
              )}
            />
          </div>

          <div>
            <label>상품 이름</label>
            <input
              onChange={(e) => setProductName(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <label>상품 가격</label>
            <input
              onChange={(e) => setProductPrice(e.target.value)}
              type="text"
            />
          </div>
        </div>

        <div css={s.imgBox}>
          <ImageUpload
            initialImage={displayedImage} // noImg가 기본 이미지로 표시됨
            onImageUpload={handleImageUpload}
            isEditing={isEditing}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductRegister;
