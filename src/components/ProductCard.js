import React, { memo } from 'react';
import './ProductCard.css';

const ProductCard = memo(({ product, cartItem, addToCart }) => {
  const isOutOfStock = product.stock === 0;
  const inCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.title}
            className="product-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
            }}
          />
        ) : (
          <div className="product-image-placeholder">
            No Image
          </div>
        )}
        {isOutOfStock && (
          <div className="out-of-stock-badge">Out of Stock</div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-category">{product.category}</div>
        <div className="product-price">₹{product.price.toFixed(2)}</div>
        <div className="product-stock">
          {isOutOfStock ? (
            <span className="stock-out">Out of Stock</span>
          ) : (
            <span className="stock-in">In Stock ({product.stock} available)</span>
          )}
        </div>
        {inCart > 0 && (
          <div className="in-cart-indicator">
            {inCart} in cart
          </div>
        )}
        <button
          className={`add-to-cart-btn ${isOutOfStock ? 'disabled' : ''}`}
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;

