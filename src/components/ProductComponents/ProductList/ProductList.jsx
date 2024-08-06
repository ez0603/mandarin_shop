/**@jsxImportSource @emotion/react */
import * as s from "./style";

function ProductList({ productList }) {
  return (
    <div css={s.layout}>
      {productList.map((product) => (
        <div key={product.product_id}>
          <div>
            <img src={product.productImg} alt="" />
          </div>
          <div css={s.product}>
            <span>{product.productName}</span>
            <span>{product.productPrice}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
