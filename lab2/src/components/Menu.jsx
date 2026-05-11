import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CartContext } from '../CartProvider';

const Menu = () => {
  const { cartCount } = useContext(CartContext);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="app-navbar">
      <div className="nav-left">
        <NavLink to="/" className={isHome ? 'active-home' : ''}>
          HOME
        </NavLink>
        <NavLink to="/make-up">MAKE UP PRODUCTS</NavLink>
      </div>
      <NavLink to="/cart" className="cart-link">
        <span role="img" aria-label="cart">🛒</span>
        <span className="cart-count">({cartCount})</span>
      </NavLink>
    </nav>
  );
};

export default Menu;
