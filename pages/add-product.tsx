import React, { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import { Product } from "@/types/product";
import { fetchProducts } from "@/utils/api";

const AddProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };
  return (
    <div>
      <h1>Add New Product</h1>
      <ProductForm onAddProduct={handleAddProduct} />
    </div>
  );
};

export default AddProductPage;
