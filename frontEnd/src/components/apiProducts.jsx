import React, { useEffect, useState } from "react";
import Product from "./Product";
import {
  getEntities,
  createEntity,
  updateEntity,
  deleteEntity,
} from "../api/apiService";

const ApiProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getEntities("products/get-products");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  console.log(products);
  return (
    <div>
      <Product products={products} />
    </div>
  );
};

export default ApiProductList;
