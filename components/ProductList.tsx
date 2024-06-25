import React, { useState, useEffect } from "react";
import { Product } from "@/types/product";
import styles from "../styles/ProductList.module.scss";
import { fetchProducts, deleteProduct } from '../utils/api';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    loadProducts();
  }

  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <div key={product.id} className={styles.productItem}>
          <h3>{product.name}</h3>
          <p>Brand: {product.brand}</p>
          <p>Model: {product.model}</p>
          <p>Color: {product.color}</p>
          <p>Price: ${product.price}</p>
          <button className={styles.deleteButton} onClick={() => handleDelete(product.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
