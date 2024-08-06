/**@jsxImportSource @emotion/react */
import * as s from "./style";

function ProductList({ productList }) {
  return (
    <div css={s.layout}>
      <div css={s.container}>
        {productList.map((product) => (
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
