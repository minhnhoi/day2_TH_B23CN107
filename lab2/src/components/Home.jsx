import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = 'http://localhost:9999';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    axios.get(`${API}/products`).then((res) => setProducts(res.data || []));
  }, []);

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered =
    category === 'all'
      ? products
      : products.filter((p) => p.category === category);

  const headingText = category === 'all' ? 'ALL PRODUCTS' : `${category.toUpperCase()} PRODUCTS`;

  return (
    <div className="home-wrapper">
      <aside className="sidebar">
        <h4>Categories</h4>
        {categories.map((c) => (
          <button
            key={c}
            className={`cat-btn ${category === c ? 'active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </aside>

      <div className="main-area">
        <h2 className="section-title">{headingText}</h2>
        <div className="product-grid">
          {filtered.map((p) => (
            <div key={p.id} className="product-card">
              <h5>{p.title}</h5>
              <p>Category: {p.category}</p>
              <p>Price: ${p.price}</p>
              <p>Total Reviews: {p.reviews ? p.reviews.length : 0}</p>
              <Link to={`/detail/${p.id}`} className="btn btn-primary">
                Detail
              </Link>
            </div>
          ))}
          {filtered.length === 0 && <p>No products found.</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;
