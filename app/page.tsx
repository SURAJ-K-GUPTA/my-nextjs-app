"use client";
import {Suspense} from "react";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import './globals.css';
import { fetchProducts, incrementSkip, resetSkip } from '../redux/productsSlice'; 
import { fetchCategories } from '../redux/categoriesSlice'; 
import { RootState, useAppDispatch } from '../redux/store'; 
import CategorySelector from '../components/CategorySelector'; 
import ProductCard from '../components/ProductCard'; 

const Home = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { categories } = useSelector((state: RootState) => state.categories);
  const { products, total, loading } = useSelector((state: RootState) => state.products);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch categories on starting
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Populate the state with URL query parameters on load
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || '';
    const searchFromUrl = searchParams.get('search') || '';
    
    setSelectedCategory(categoryFromUrl);
    setSearchQuery(searchFromUrl);

    // Fetch products based on both search and category
    dispatch(resetSkip());
    dispatch(fetchProducts({ category: categoryFromUrl, search: searchFromUrl }));
  }, [searchParams, dispatch]);

  // Update the URL when category or search changes
  useEffect(() => {
    const query: Record<string, string> = {}; // Replace `any` with `Record<string, string>`
    if (searchQuery) {
      query.search = searchQuery;
    }
    if (selectedCategory) {
      query.category = selectedCategory;
    }
  
    // Update URL query parameters (no page reload, shallow routing)
    router.push(`/?${new URLSearchParams(query).toString()}`);
  }, [selectedCategory, searchQuery, router]);
  

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Load more products (pagination)
  const loadMore = () => {
    dispatch(incrementSkip());
    dispatch(fetchProducts({ category: selectedCategory, search: searchQuery }));
  };

  // Reset both search query and category
  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('');
    router.push('/'); // Reset URL to base without query params
    dispatch(resetSkip());
    dispatch(fetchProducts({ category: '', search: '' })); // Reset the product list
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Reset Button */}
      <div className="mb-4">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={handleReset}
        >
          Reset Search & Category
        </button>
      </div>

      <div className="flex mb-4">
        {/* Categories */}
        <div className="w-1/4">
          <h2 className="text-lg font-semibold mb-2">Categories</h2>
          <CategorySelector
            categories={categories} // Pass categories as prop
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
          />
        </div>

        {/* Products */}
        <div className="w-3/4">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination - Load More Button */}
          {!loading && products.length < total && (
            <div className="mt-4">
              <button
                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                onClick={loadMore}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense>
      <Home/>
    </Suspense>
  )
}

export default Page
