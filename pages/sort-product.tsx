import React from "react";

interface SortProductProps {
  sortCriteria: string;
  setSortCriteria: (criteria: string) => void;
}

const SortProduct: React.FC<SortProductProps> = ({
  sortCriteria,
  setSortCriteria,
}) => {
  return (
    <select
      onChange={(e) => setSortCriteria(e.target.value)}
      value={sortCriteria}
    >
      <option value="default">Sort By</option>
      <option value="price">Price</option>
      <option value="popularity">Popularity</option>
      <option value="date">Date</option>
    </select>
  );
};

export default SortProduct;
