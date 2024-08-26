/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useParams } from "react-router-dom";
import useGetProductsDetail from "../../../hooks/useGetProductDetail";
import { useMutation, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { updateProduct } from "../../../apis/api/product";
import ImageUpload from "../../../components/ProductComponents/ImageUpload/ImageUpload";
import OptionManager from "../../../components/ProductComponents/OptionComponents/OptionManager/OptionManager";
import useCategories from "../../../hooks/useCategories";
import CategorySelect from "../../../components/CategorySelect/CategorySelect";
import OptionSelect from "../../../components/OptionSelect/OptionSelect";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const EditProductPage = () => {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    productDetail,
    error: productError,
  } = useGetProductsDetail(productId);
  const categories = useCategories();
  const [isEditing, setIsEditing] = useState(false);
  const [initialState, setInitialState] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [productDetailState, setProductDetailState] = useState({
    productId,
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
        productId,
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
      setSelectedImage(productDetail.productImg);
    }
  }, [productDetail, productId]);

  const mutation = useMutation(updateProduct, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["productDetail", productId]);
      setIsEditing(false);
      alert("제품 수정 완료");
      window.location.reload();
    },
    onError: (error) => {
      alert(`Failed to update product: ${error.message}`);
    },
  });

  const handleImageUpload = (url) => {
    setProductDetailState((prevState) => ({
      ...prevState,
      productImg: url,
    }));
    setSelectedImage(url); // 로컬 상태에만 반영
    setIsEditing(true);
  };

  const handleEditClick = () => {
    setInitialState(productDetailState);
    setIsEditing(true);
  };

  const handleBackClick = () => {
    navigate("/admin/product");
  };

  const handleExitClick = () => {
    const hasChanges = JSON.stringify(productDetailState) !== JSON.stringify(initialState);
  
    if (hasChanges) {
      const confirmLeave = window.confirm(
        "수정된 내용이 저장되지 않았습니다. 그래도 나가시겠습니까?"
      );
      if (!confirmLeave) {
        return;
      }
    }

    setProductDetailState(initialState);
    setSelectedImage(initialState.productImg);
    setIsEditing(false);
  };
  

  const handleUpdateProductDetail = async () => {
    try {
      const updateData = {
        productId: productDetailState.productId,
        productName: productDetailState.productName,
        productPrice: productDetailState.productPrice,
        productImg: productDetailState.productImg, // 최종 이미지 URL이 서버에 저장됨
        productDescription: productDetailState.productDescription,
        categoryId: productDetailState.categoryId,
      };
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
    setIsEditing(true);
  };

  const handleCategorySelect = (category) => {
    setProductDetailState((prevState) => ({
      ...prevState,
      categoryId: category.value,
      categoryName: category.label,
    }));
    setIsEditing(true);
  };

  const handleOptionUpdate = (updatedOptionTitles, updatedOptionNames) => {
    setProductDetailState((prevState) => ({
      ...prevState,
      optionTitles: updatedOptionTitles,
      optionNames: updatedOptionNames,
    }));
    setIsEditing(true);
  };

  if (!productDetail) {
    return <div>Loading...</div>;
  }

  const handleOptionSelect = (selectedOption) => {
    console.log("Selected option:", selectedOption);
  };

  return (
    <div css={s.layout}>
      <div css={s.header}>
        <h1>
          <IoIosArrowBack size={35} onClick={handleBackClick} />
          <span className="tooltip2">뒤로가기</span>
          Product Information
        </h1>
      </div>

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
            <div css={s.buttonBox}>
              <button onClick={handleExitClick}>
                <IoIosArrowBack size={35} />
                <span css={s.tooltipStyle} className="tooltip">
                  뒤로가기
                </span>
              </button>
              <button onClick={handleUpdateProductDetail} css={s.editOkButton}>
                수정 완료
              </button>
            </div>
          ) : (
            <button onClick={handleEditClick} css={s.editButton}>
              수정 하기
            </button>
          )}
          {isEditing ? (
            <div css={s.inputBox}>
              <div css={s.input}>
                <div className="row">
                  <div className="cell">
                    <label className="product-name-label" htmlFor="productName">
                      상품명
                    </label>
                  </div>
                  <div className="cell">
                    <input
                      type="text"
                      name="productName"
                      value={productDetailState.productName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="cell">
                    <label htmlFor="productPrice">가격</label>
                  </div>
                  <div className="cell">
                    <input
                      type="text"
                      name="productPrice"
                      value={productDetailState.productPrice}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="cell">
                    <label htmlFor="categoryId">카테고리</label>
                  </div>
                  <div className="cell">
                    <CategorySelect
                      categories={categories}
                      onSelect={handleCategorySelect}
                      selectedCategory={categories.find(
                        (category) =>
                          category.value === productDetailState.categoryId
                      )}
                    />
                  </div>
                </div>

                <div className="row">
                  <label
                    className="product-description-label"
                    htmlFor="productDescription"
                  >
                    상세 설명
                  </label>
                  <textarea
                    name="productDescription"
                    value={productDetailState.productDescription}
                    onChange={handleChange}
                    className="full-width"
                  />
                </div>
              </div>
              <OptionManager
                productId={productId}
                optionTitles={productDetailState.optionTitles}
                optionNames={productDetailState.optionNames}
                setOptionList={handleOptionUpdate}
              />
            </div>
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
                  productDetail.optionTitles.length > 0 &&
                  productDetail.optionTitles.some(
                    (title) => title.titleName
                  ) ? (
                    productDetail.optionTitles.map(
                      (title) =>
                        title.titleName && (
                          <div
                            key={title.optionTitleId}
                            css={s.optionContainer}
                          >
                            <p>{title.titleName}</p>
                            <OptionSelect
                              options={productDetail.optionNames.filter(
                                (name) =>
                                  name.optionTitleId === title.optionTitleId &&
                                  name.optionName
                              )}
                              onSelect={handleOptionSelect}
                              selectedOption={null}
                            />
                          </div>
                        )
                    )
                  ) : (
                    <p>옵션이 존재하지 않습니다</p>
                  )}
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
