import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useTranslation from 'next-translate/useTranslation';
import { Product } from "@/types/product";
import styles from "../styles/ProductList.module.scss";
import { fetchProducts, deleteProduct } from "../utils/api";
import SortProduct from "@/pages/sort-product";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const ProductList: React.FC = () => {
  const { t } = useTranslation('common');
  const [products, setProducts] = useState<Product[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>("default");
  const router = useRouter();

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (sortCriteria !== "default") {
      sortProducts(sortCriteria);
    }
  }, [sortCriteria, products]);

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

  const sortProducts = (criteria: string) => {
    const sortedProducts = [...products];
    if (criteria === "price") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (criteria === "popularity") {
      sortedProducts.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    } else if (criteria === "date") {
      sortedProducts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    setProducts(sortedProducts);
  };

  return (
    <div>
      <h1>{t('title')}</h1>
      <LanguageSwitcher />
      <SortProduct
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
      />
      <div className={styles.productList}>
        {products.map((product) => (
          <div key={product.id} className={styles.productItem}>
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
            )}
            <h3>{product.name}</h3>
            <p>{t('brand')}: {product.brand}</p>
            <p>{t('model')}: {product.model}</p>
            <p>{t('color')}: {product.color}</p>
            <p>{t('price')}: ${product.price}</p>
            <p>{t('popularity')}: {product.popularity}</p>
            <p>
              {t('created_at')}:
              {new Date(product.createdAt).toLocaleDateString("tr-TR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>

            <button
              className={styles.editButton}
              onClick={() => handleEdit(product.id)}
            >
              {t('edit')}
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(product.id)}
            >
              {t('delete')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
