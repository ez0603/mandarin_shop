/**@jsxImportSource @emotion/react */


function ProductList({ productList }) {
  return (
    <div>
      {productList.map((product) => (
        <div key={product.product_id}>
          <div>
            <img src={product.productImg} alt="" />
          </div>
          <div>{product.productName}</div>
          <div>{product.productPrice}</div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
