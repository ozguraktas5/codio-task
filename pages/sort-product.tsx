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
      <option value="Default">Sort</option>
      <option value="Price">Price</option>
      <option value="Popularity">Popularity</option>
      <option value="Date">Date</option>
    </select>
  );
};

export default SortProduct;
