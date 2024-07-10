import React from 'react';

const ExpenseFilter = ({ filterItem }) => {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue !== "") {
      filterItem(selectedValue);
    }
  };

  return (
    <select className="form-select mb-3" onChange={handleChange}>
      <option disabled defaultValue="">Filter Category</option>
      <option value="Utilities">Utilities</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Food">Food</option>
      <option value="Clothing">Clothing</option>
    </select>
  );
};

export default ExpenseFilter;






