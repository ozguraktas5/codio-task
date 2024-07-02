import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Product } from "@/types/product";
import styles from "@/styles/ProductForm.module.scss";
import { fetchProductById, updateProduct } from "@/utils/api";
import useTranslation from "next-translate/useTranslation";

const EditProduct: React.FC = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Partial<Product>>({});

  useEffect(() => {
    if (id) {
      loadProduct(id as string);
    }
  }, [id]);

  const loadProduct = async (id: string) => {
    const data = await fetchProductById(Number(id));
    setProduct(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProduct(Number(id), product);
    router.push("/");
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className={styles.all}>
      <h1>{t("edit_product")}</h1>
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
        <div className={styles.buttons}>
          <button onClick={handleBack}>{t("back")}</button>
          <button type="submit">{t("save")}</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
