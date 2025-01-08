import NavBar from "../features/navbar/navbar";
import ProductList from "../features/product-list/components/ProductList";
import { Link } from "react-router-dom";
import Footer from "../features/common/Footer";

function Home() {
  return (
    <div>
      <NavBar>
        <ProductList></ProductList>
      </NavBar>
      <Footer></Footer>
    </div>
  );
}

export default Home;
