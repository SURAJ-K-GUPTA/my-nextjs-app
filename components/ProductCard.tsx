import React from 'react';

const ProductCard = ({ product }: { product: any }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.title}</h3>
        <p className="text-gray-500">{product.description}</p>
        <div className="mt-2 text-indigo-600 font-semibold">${product.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
