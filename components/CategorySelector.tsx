import React from 'react';

interface Category {
  slug: string;
  name: string;
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex flex-col">
      {categories.map((category) => (
        <label key={category.slug} className="inline-flex items-center">
          <input
            type="radio"
            name="category"
            value={category.slug}
            checked={selectedCategory === category.slug}
            onChange={() => setSelectedCategory(category.slug)}
            className="form-radio text-indigo-600"
          />
          <span className="ml-2">{category.name}</span>
        </label>
      ))}
    </div>
  );
};

export default CategorySelector;
