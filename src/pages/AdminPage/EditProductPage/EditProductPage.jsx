/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useNavigate, useParams } from "react-router-dom";
import useGetProducts from "../../../hooks/useGetProductDetail"; // 경로를 실제 위치로 수정
import { useEffect, useState } from "react";
import { updateProductRequest } from "../../../apis/api/product";
import { useMutation, useQueryClient } from "react-query";
import useCategories from "../../../hooks/useCategories";

const EditProductPage = () => {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { productDetail, error } = useGetProducts(productId);
  const categories = useCategories(); // 카테고리 목록을 가져오는 훅
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [productDetailState, setProductDetailState] = useState({
    productId: productId,
    productName: "",
    categoryId: "",
    categoryName: "",
    productPrice: "",
    productImg: "",
    productDescription: "",
    optionList: []
  });

  const [updateOptionData, setUpdateOptionData] = useState({
    productId: productId,
    optionNameId: "",
    optionName: "",
    optionTitleId: "",
    titleName: "",
  });

  const [updateOptionTitleName, setUpdateOptionTitleName] = useState({
    productId: productId,
    optionTitleId: 0,
    titleName: "",
  });

  useEffect(() => {
    if (productDetail) {
      setProductDetailState({
        productId: productId,
        productName: productDetail.productName,
        categoryId: productDetail.categoryId,
        categoryName: productDetail.categoryName,
        productPrice: productDetail.productPrice,
        productImg: productDetail.productImg,
        productDescription: productDetail.productDescription,
        optionList: productDetail.optionList || []
      });
    }
  }, [productDetail, productId]);

  useEffect(() => {
    console.log('Categories:', categories); // 카테고리 데이터가 제대로 로드되었는지 확인
  }, [categories]);

  const mutation = useMutation(updateProductRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries(['productDetail', productId]);
      setIsEditing(false);
      alert("제품 수정 완료");
    },
    onError: (error) => {
      console.error("Failed to update product", error);
      alert("Failed to update product: " + error.message);
    }
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!productDetail || !categories.length) {
    return <div>Loading...</div>;
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setProductDetailState((prevState) => ({
        ...prevState,
        productImg: URL.createObjectURL(e.target.files[0])
      }));
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateProductDetail = async () => {
    try {
      await updateProductRequest(productDetailState);
      alert("제품 수정 완료");
      navigate(`/admin/product/edit/${productId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetailState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    const selectedCategory = categories.find(category => category.value === parseInt(value));
    setProductDetailState((prevState) => ({
      ...prevState,
      categoryId: selectedCategory.value,
      categoryName: selectedCategory.label
    }));
  };

  const handleOptionName = (e) => {
    const newOptionName = e.target.value;
    setUpdateOptionData((prevData) => ({
      ...prevData,
      optionName: newOptionName,
    }));
  };

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <div css={s.imageContainer}>
          <img 
            src={selectedImage || productDetailState.productImg} 
            alt="Product" 
            css={s.productImage} 
          />
          <input 
            type="file" 
            css={s.fileInput} 
            onChange={handleImageChange} 
          />
        </div>
        <div css={s.productLayout}>
          {isEditing ? (
            <button onClick={handleUpdateProductDetail}>수정 완료</button>
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
                {categories && categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
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