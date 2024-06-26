import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Product } from "@/types/product";
import styles from "../styles/ProductList.module.scss";
import { fetchProducts, deleteProduct } from "../utils/api";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

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
  };

  const handleEdit = (id: number) => {
    router.push(`/edit-product?id=${id}`);
  };

  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <div key={product.id} className={styles.productItem}>
          <h3>{product.name}</h3>
          <p>Brand: {product.brand}</p>
          <p>Model: {product.model}</p>
          <p>Color: {product.color}</p>
          <p>Price: ${product.price}</p>
          <button
            className={styles.editButton}
            onClick={() => handleEdit(product.id)}
          >
            Edit
          </button>
          <button
            className={styles.deleteButton}
            onClick={() => handleDelete(product.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
