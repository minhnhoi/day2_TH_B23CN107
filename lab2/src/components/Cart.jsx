import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartProvider';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2 className="section-title">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      className="qty-input"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value, 10) || 1)
                      }
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p>
            <strong>Total: ${total.toFixed(2)}</strong>
          </p>

          <Link to="/checkout" className="btn btn-success">
            Checkout
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
