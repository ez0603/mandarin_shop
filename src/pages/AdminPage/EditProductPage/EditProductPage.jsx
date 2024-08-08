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
import CustomSelect from "../../../components/CustomSelect/CustomSelect";

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

  const handleOptionSelect = (selectedOption) => {
    // Handle the selection of an option
    console.log("Selected option:", selectedOption);
  };

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <div css={s.imageContainer}>
          <ImageUpload
            initialImage={selectedImage || productDetailState.productImg}
            onImageUpload={handleImageUpload}
            isEditing={isEditing}
          />
        </div>
        <div css={s.productLayout}>
          {isEditing ? (
            <>
              <button onClick={handleExitClick}>취소</button>
              <button onClick={handleUpdateProductDetail}>수정 완료</button>
            </>
          ) : (
            <button onClick={handleEditClick} css={s.editButton}>
              수정 하기
            </button>
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
            <div css={s.productBox}>
              <div css={s.product}>
                <table css={s.table}>
                  <tbody>
                    <tr>
                      <th>상품명</th>
                      <td>{productDetail.productName}</td>
                    </tr>
                    <tr>
                      <th>가격</th>
                      <td>{productDetail.productPrice} 원</td>
                    </tr>
                    <tr>
                      <th>상세 설명</th>
                      <td>{productDetail.productDescription}</td>
                    </tr>
                    <tr>
                      <th>카테고리</th>
                      <td>{productDetail.categoryName}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h4 css={s.optionTitle}>Options</h4>
                <div css={s.optionLayout}>
                  {productDetail.optionTitles &&
                    productDetail.optionTitles.map((title) => (
                      <div key={title.optionTitleId} css={s.optionContainer}>
                        <p>{title.titleName}</p>
                        <CustomSelect
                          options={productDetail.optionNames.filter(
                            (name) => name.optionTitleId === title.optionTitleId
                          )}
                          onSelect={handleOptionSelect}
                          selectedOption={null} // 선택된 옵션이 있다면 여기에 전달
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
