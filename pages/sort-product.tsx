import useTranslation from "next-translate/useTranslation";
import React from "react";

interface SortProductProps {
  sortCriteria: string;
  setSortCriteria: (criteria: string) => void;
}

const SortProduct: React.FC<SortProductProps> = ({
  sortCriteria,
  setSortCriteria,
}) => {
  const { t } = useTranslation('common');
  return (
    <select
      onChange={(e) => setSortCriteria(e.target.value)}
      value={sortCriteria}
    >
      <option value="default">{t("sortby")}</option>
      <option value="price">{t("price")}</option>
      <option value="popularity">{t("popularity")}</option>
      <option value="date">{t("date")}</option>
    </select>
  );
};

export default SortProduct;
