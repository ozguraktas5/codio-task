import React from "react";
import ProductList from "@/components/ProductList";
import { ThemeProvider } from "@/components/ThemeContext";
import "../styles/globals.scss";

const HomePage: React.FC = () => {
  return (
    <ThemeProvider>
      <ProductList />
    </ThemeProvider>
  );
};

export default HomePage;
