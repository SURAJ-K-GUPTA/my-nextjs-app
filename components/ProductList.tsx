import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { RootState } from '../redux/store';

const ProductList: React.FC = () => {
  const { products, loading, total } = useSelector((state: RootState) => state.products);

  return (
    <div>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!loading && products.length < total && (
        <div className="mt-4">
          <button
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
