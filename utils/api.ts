import { Product } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL!);
  const data = await response.json();
  return data.map((product: any) => ({
    ...product,
    popularity: product.popularity || 0,
    createdAt: product.createdAt || new Date().toISOString(),
  }));
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

export const addProduct = async (product: Partial<Product>): Promise<void> => {
  await fetch(API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
};

export const updateProduct = async (
  id: number,
  product: Partial<Product>
): Promise<void> => {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
};

export const deleteProduct = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
