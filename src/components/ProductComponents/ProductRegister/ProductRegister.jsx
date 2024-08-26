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
  const [productDescription, setProductDescription] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(true);

  const handleImageUpload = (url) => {
    setSelectedImage(url);
  };

  const displayedImage = selectedImage || noImg;

  const handleCategorySelect = (category) => {
    setCategoryId(category.value); 
  };

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <div css={s.imgBox}>
          <ImageUpload
            initialImage={displayedImage} // noImg가 기본 이미지로 표시됨
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
                type="text"
              />
            </div>
            <div css={s.productBox}>
              <label>상품 가격</label>
              <input
                onChange={(e) => setProductPrice(e.target.value)}
                type="text"
              />
            </div>
          </div>
          <div css={s.descriptionBox}>
            <label>상품 설명</label>
            <textarea
              onChange={(e) => setProductDescription(e.target.value)}
              rows="7"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductRegister;
