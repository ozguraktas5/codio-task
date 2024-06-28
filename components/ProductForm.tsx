import React, { useState } from "react";
import { Product } from "@/types/product";
import styles from "@/styles/ProductForm.module.scss";

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
  const [product, setProduct] = useState<Partial<Product>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(process.env.NEXT_PUBLIC_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        onAddProduct(data);
        setProduct({});
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.productForm}>
      <input
        name="name"
        value={product.name || ""}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="brand"
        value={product.brand || ""}
        onChange={handleChange}
        placeholder="Brand"
      />
      <input
        name="model"
        value={product.model || ""}
        onChange={handleChange}
        placeholder="Model"
      />
      <input
        name="color"
        value={product.color || ""}
        onChange={handleChange}
        placeholder="Color"
      />
      <input
        name="price"
        type="number"
        value={product.price || ""}
        onChange={handleChange}
        placeholder="Price"
      />
      <input
        name="imageUrl"
        value={product.imageUrl || ""}
        onChange={handleChange}
        placeholder="Image URL"
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
