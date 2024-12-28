import NavBar from "../features/navbar/navbar";
import ProductDetail from "../features/product-list/components/ProductDetail";
function ProductDetailPage() {
  return (
    <div>
      <NavBar>
        <ProductDetail></ProductDetail>
      </NavBar>
    </div>
  );
}

export default ProductDetailPage;
