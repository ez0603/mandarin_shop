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
      await refetchProductDetail(); // 최신 데이터로 다시 가져오기
    },
    onError: (error) => {
      console.error("Failed to update product", error);
      alert("Failed to update product: " + error.message);
    },
  });

  const handleImageUpload = (url) => {
    setProductDetailState((prevState) => ({
      ...prevState,
      productImg: url,
    }));
    setSelectedImage(url); // 이미지 상태 업데이트
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
      console.log("Updating product with data:", productDetailState);
      await mutation.mutateAsync(productDetailState);
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
  };

  const handleOptionUpdate = (updatedOptionTitles, updatedOptionNames) => {
    setProductDetailState((prevState) => ({
      ...prevState,
      optionTitles: updatedOptionTitles,
      optionNames: updatedOptionNames,
    }));
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
