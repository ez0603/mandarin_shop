/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useNavigate, useParams } from "react-router-dom";
import useGetProductsDetail from "../../../hooks/useGetProductDetail";
import { useMutation, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { updateProduct } from "../../../apis/api/product";
import ImageUpload from "../../../components/ProductComponents/ImageUpload/ImageUpload";
import OptionManager from "../../../components/ProductComponents/OptionComponents/OptionManager/OptionManager";
import useCategories from "../../../hooks/useCategories";

const EditProductPage = () => {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    productDetail,
    error: productError,
    refetch: refetchProductDetail,
  } = useGetProductsDetail(productId);
  const categories = useCategories();
  const [isEditing, setIsEditing] = useState(false);
  const [initialState, setInitialState] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [productDetailState, setProductDetailState] = useState({
    productId: productId,
    productName: "",
    categoryId: "",
    categoryName: "",
    productPrice: "",
    productImg: "",
    productDescription: "",
    optionTitles: [],
    optionNames: [],
  });

  useEffect(() => {
    if (productDetail) {
      const initialData = {
        productId: productId,
        productName: productDetail.productName,
        categoryId: productDetail.categoryId,
        categoryName: productDetail.categoryName,
        productPrice: productDetail.productPrice,
        productImg: productDetail.productImg,
        productDescription: productDetail.productDescription,
        optionTitles: productDetail.optionTitles || [],
        optionNames: productDetail.optionNames || [],
      };
      setInitialState(initialData);
      setProductDetailState(initialData);
      setSelectedImage(productDetail.productImg); // 이미지 상태 초기화
    }
  }, [productDetail, productId]);

  const mutation = useMutation(updateProduct, {
    onSuccess: async (data) => {
      console.log("Update successful", data);
      await queryClient.invalidateQueries(["productDetail", productId]);
      setIsEditing(false);
      alert("제품 수정 완료");
      window.location.reload(); // 페이지 새로고침
    },
    onError: (error) => {
      console.error("Failed to update product", error);
      alert("Failed to update product: " + error.message);
    },
  });

  const handleImageUpload = (url) => {
    console.log("Image uploaded to:", url); // 디버그 로그 추가
    setProductDetailState((prevState) => ({
      ...prevState,
      productImg: url,
    }));
    setIsEditing(true); // 이미지 업로드 후 isEditing 상태를 유지하여 저장 버튼을 표시하도록 설정
  };

  const handleEditClick = () => {
    setInitialState(productDetailState); // 현재 상태를 초기 상태로 저장
    setIsEditing(true);
  };

  const handleExitClick = () => {
    setProductDetailState(initialState); // 초기 상태로 되돌림
    setSelectedImage(initialState.productImg); // 이미지 상태도 초기 상태로 되돌림
    setIsEditing(false);
  };

  const handleUpdateProductDetail = async () => {
    try {
      const updateData = {
        productId: productDetailState.productId,
        productName: productDetailState.productName,
        productPrice: productDetailState.productPrice,
        productImg: productDetailState.productImg,
        productDescription: productDetailState.productDescription,
        categoryId: productDetailState.categoryId,
      };

      console.log("Updating product with data:", updateData);
      await mutation.mutateAsync(updateData);
    } catch (error) {
      console.error("Error during mutation:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetailState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setIsEditing(true); // 다른 값이 변경될 때도 isEditing 상태를 유지하여 저장 버튼을 표시하도록 설정
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    const selectedCategory = categories.find(
      (category) => category.value === parseInt(value)
    );
    setProductDetailState((prevState) => ({
      ...prevState,
      categoryId: selectedCategory.value,
      categoryName: selectedCategory.label,
    }));
    setIsEditing(true); // 카테고리가 변경될 때도 isEditing 상태를 유지하여 저장 버튼을 표시하도록 설정
  };

  const handleOptionUpdate = (updatedOptionTitles, updatedOptionNames) => {
    setProductDetailState((prevState) => ({
      ...prevState,
      optionTitles: updatedOptionTitles,
      optionNames: updatedOptionNames,
    }));
    setIsEditing(true); // 옵션이 변경될 때도 isEditing 상태를 유지하여 저장 버튼을 표시하도록 설정
  };

  if (productError) {
    return <div>Error: {productError.message}</div>;
  }

  if (!productDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <div css={s.imageContainer}>
          <ImageUpload
            initialImage={selectedImage || productDetailState.productImg}
            onImageUpload={handleImageUpload}
            isEditing={isEditing} // isEditing 상태 전달
          />
        </div>
        <div css={s.productLayout}>
          {isEditing ? (
            <>
              <button onClick={handleExitClick}>취소</button>
              <button onClick={handleUpdateProductDetail}>수정 완료</button>
            </>
          ) : (
            <button onClick={handleEditClick}>수정 하기</button>
          )}
          {isEditing ? (
            <>
              <input
                type="text"
                name="productName"
                value={productDetailState.productName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="productPrice"
                value={productDetailState.productPrice}
                onChange={handleChange}
              />
              <textarea
                name="productDescription"
                value={productDetailState.productDescription}
                onChange={handleChange}
              />
              <select
                name="categoryId"
                value={productDetailState.categoryId}
                onChange={handleCategoryChange}
              >
                <option value="">카테고리 선택</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
              </select>
              <OptionManager
                productId={productId}
                optionTitles={productDetailState.optionTitles}
                optionNames={productDetailState.optionNames}
                setOptionList={handleOptionUpdate}
              />
            </>
          ) : (
            <>
              <p>Product Name: {productDetail.productName}</p>
              <p>Product Price: {productDetail.productPrice} 원</p>
              <p>Product Description: {productDetail.productDescription}</p>
              <p>Category: {productDetail.categoryName}</p>
              <div>
                <h4>Options:</h4>
                {productDetail.optionTitles &&
                  productDetail.optionTitles.map((title) => (
                    <div key={title.optionTitleId}>
                      <strong>{title.titleName}</strong>
                      <ul>
                        {productDetail.optionNames
                          .filter(
                            (name) => name.optionTitleId === title.optionTitleId
                          )
                          .map((name) => (
                            <li key={name.optionNameId}>{name.optionName}</li>
                          ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
