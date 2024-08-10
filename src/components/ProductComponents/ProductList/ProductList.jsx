/**@jsxImportSource @emotion/react */
import * as s from "./style";

function ProductList({ productList }) {
  // 중복된 product_id를 제거한 새로운 배열 생성
  const uniqueProductList = productList.filter(
    (product, index, self) =>
      index === self.findIndex((p) => p.product_id === product.product_id)
  );

  return (
    <div css={s.layout}>
      <div css={s.container}>
        {uniqueProductList.map((product) => (
          <div key={product.product_id}>
            <div css={s.imgBox}>
              <img src={product.productImg} alt="" css={s.imgStyle} />
            </div>
            <div css={s.product}>
              <span>{product.productName}</span>
              <span>{product.productPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
