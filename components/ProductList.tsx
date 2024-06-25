import React, { useState, useEffect } from "react";
import { Product } from "@/types/product";
import styles from "../styles/ProductList.module.scss";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <div key={product.id} className={styles.productItem}>
          <h3>{product.name}</h3>
          <p>Brand: {product.brand}</p>
          <p>Model: {product.model}</p>
          <p>Color: {product.color}</p>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
