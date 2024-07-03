import React, { useState } from "react";
import { Product } from "@/types/product";
import styles from "@/styles/ProductForm.module.scss";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
  const { t } = useTranslation("common");
  const [product, setProduct] = useState<Partial<Product>>({});
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Formdaki degisiklikleri yonetmeye yarar.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Tum gerekli alanlarin doldurulup doldurulmadigini kontrol eder ve eksik alan varsa hata mesajı doner.
  const validateForm = () => {
    if (
      !product.name ||
      !product.brand ||
      !product.model ||
      !product.color ||
      !product.price
    ) {
      return t("all_fields_required");
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
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
        setError(null);
      });
  };

  // Islemi geri alma fonksiyonu
  const handleBack = () => {
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.productForm}>
      <input
        name="name"
        value={product.name || ""}
        onChange={handleChange}
        placeholder={t("name")}
      />
      <input
        name="brand"
        value={product.brand || ""}
        onChange={handleChange}
        placeholder={t("brand")}
      />
      <input
        name="model"
        value={product.model || ""}
        onChange={handleChange}
        placeholder={t("model")}
      />
      <input
        name="color"
        value={product.color || ""}
        onChange={handleChange}
        placeholder={t("color")}
      />
      <input
        name="price"
        type="number"
        value={product.price || ""}
        onChange={handleChange}
        placeholder={t("price")}
      />
      <input
        name="imageUrl"
        value={product.imageUrl || ""}
        onChange={handleChange}
        placeholder={t("image_url")}
      />
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.buttons}>
        <button type="button" onClick={handleBack}>
          {t("back")}
        </button>
        <button type="submit">{t("save")}</button>
      </div>
    </form>
  );
};

export default ProductForm;
