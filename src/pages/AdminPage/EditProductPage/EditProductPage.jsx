/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useNavigate, useParams } from "react-router-dom";
import useGetProducts from "../../../hooks/useGetProductDetail"; 
import { useEffect, useState } from "react";
import { getProductOption, registerOption, registerOptionTitle, updateProductOptionRequest, updateProductRequest } from "../../../apis/api/product";
import { useMutation, useQueryClient } from "react-query";
import useCategories from "../../../hooks/useCategories";

const EditProductPage = () => {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { productDetail, error } = useGetProducts(productId);
  const categories = useCategories();
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

  const [optionTitles, setOptionTitles] = useState([]);
  const [newOptionTitle, setNewOptionTitle] = useState("");
  const [newOption, setNewOption] = useState({
    optionTitleId: "",
    optionName: ""
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
    fetchProductOptions();
  }, [productId]);

  const fetchProductOptions = async () => {
    try {
      const response = await getProductOption({ productId });
      console.log('Fetched options response:', response); // 디버깅용 로그
      if (response.data) {
        setOptionTitles(response.data.optionTitles || []);
        console.log('Fetched options:', response.data.optionTitles); // 디버깅용 로그
      } else {
        console.log('No data in response'); // 디버깅용 로그
      }
    } catch (error) {
      console.error("Failed to fetch product options", error);
    }
  };

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

  const handleAddOptionTitle = async () => {
    try {
      await registerOptionTitle({ productId, titleName: newOptionTitle });
      setNewOptionTitle("");
      fetchProductOptions();
      alert("옵션 타이틀 추가 완료");
    } catch (error) {
      console.error("Failed to add option title", error);
      alert("옵션 타이틀 추가 실패");
    }
  };

  const handleAddOption = async () => {
    try {
      await registerOption({ productId, optionTitleId: newOption.optionTitleId, optionName: newOption.optionName });
      setNewOption({ optionTitleId: "", optionName: "" });
      fetchProductOptions();
      alert("옵션 추가 완료");
    } catch (error) {
      console.error("Failed to add option", error);
      alert("옵션 추가 실패");
    }
  };

  const handleUpdateOption = async (option) => {
    try {
      await updateProductOptionRequest(option);
      fetchProductOptions();
      alert("옵션 수정 완료");
    } catch (error) {
      console.error("Failed to update option", error);
      alert("옵션 수정 실패");
    }
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
              <div>
                <h3>옵션 타이틀 추가</h3>
                <input 
                  type="text" 
                  value={newOptionTitle} 
                  onChange={(e) => setNewOptionTitle(e.target.value)} 
                />
                <button onClick={handleAddOptionTitle}>옵션 타이틀 추가</button>
              </div>
              <div>
                <h3>옵션 추가</h3>
                <select 
                  value={newOption.optionTitleId} 
                  onChange={(e) => setNewOption((prev) => ({ ...prev, optionTitleId: e.target.value }))}
                >
                  <option value="">옵션 타이틀 선택</option>
                  {optionTitles.map((title) => (
                    <option key={title.optionTitleId} value={title.optionTitleId}>
                      {title.titleName}
                    </option>
                  ))}
                </select>
                <input 
                  type="text" 
                  value={newOption.optionName} 
                  onChange={(e) => setNewOption((prev) => ({ ...prev, optionName: e.target.value }))}
                />
                <button onClick={handleAddOption}>옵션 추가</button>
              </div>
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
        <div>
          <h3>옵션 목록</h3>
          {optionTitles.map((title) => (
            <div key={title.optionTitleId}>
              <h4>{title.titleName}</h4>
              {title.optionNames.map((name, idx) => (
                <div key={title.optionNameIds[idx]}>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => handleUpdateOption({ 
                      productId, 
                      optionTitleId: title.optionTitleId, 
                      optionNameId: title.optionNameIds[idx], 
                      optionName: e.target.value 
                    })}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;