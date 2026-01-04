import React, { memo } from 'react';
import './Cart.css';

const Cart = memo(({ cart, removeFromCart, updateQuantity, totals }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  if (cart.length === 0 && !isOpen) {
    return (
      <div className="cart-icon" onClick={() => setIsOpen(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <span className="cart-count">0</span>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-icon" onClick={() => setIsOpen(!isOpen)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        {totals.totalItems > 0 && (
          <span className="cart-count">{totals.totalItems}</span>
        )}
      </div>

      {isOpen && (
        <div className="cart-dropdown">
          <div className="cart-header">
            <h2>Shopping Cart</h2>
            <button className="close-cart-btn" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <h4>{item.title}</h4>
                      <p className="cart-item-price">₹{item.price.toFixed(2)}</p>
                    </div>
                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="quantity-btn"
                        >
                          −
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="quantity-btn"
                          disabled={item.quantity >= item.stock}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="cart-item-total">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-footer">
                <div className="cart-totals">
                  <div className="total-items">
                    Total Items: <strong>{totals.totalItems}</strong>
                  </div>
                  <div className="total-price">
                    Total Price: <strong>₹{totals.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
});

Cart.displayName = 'Cart';

export default Cart;

