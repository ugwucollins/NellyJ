import { lazy } from "react";

const AllProducts = lazy(() => import("../ProductContent/AllProducts"));

const Products = () => {
  return (
    <div>
      <AllProducts />
    </div>
  );
};

export default Products;
