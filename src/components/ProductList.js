import React, { memo } from 'react';
import './ProductList.css';
import ProductCard from './ProductCard';

const ProductList = memo(({ products, cart, addToCart }) => {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <h2>No products found</h2>
        <p>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map(product => {
        const cartItem = cart.find(item => item.id === product.id);
        return (
          <ProductCard
            key={product.id}
            product={product}
            cartItem={cartItem}
            addToCart={addToCart}
          />
        );
      })}
    </div>
  );
});

ProductList.displayName = 'ProductList';

export default ProductList;

