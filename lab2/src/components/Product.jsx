import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = 'http://localhost:9999';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    axios.get(`${API}/products`).then((res) => setProducts(res.data || []));
  }, []);

  const visible = useMemo(() => {
    let list = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    switch (sortBy) {
      case 'title-asc':
        list = [...list].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        list = [...list].sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return list;
  }, [products, search, sortBy]);

  return (
    <div>
      <h2 className="section-title">PRODUCT LIST</h2>

      <div className="controls-row">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">-- Sort By --</option>
          <option value="title-asc">Title A → Z</option>
          <option value="title-desc">Title Z → A</option>
          <option value="price-asc">Price Low → High</option>
          <option value="price-desc">Price High → Low</option>
        </select>
      </div>

      <div className="product-grid">
        {visible.map((p) => (
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
        {visible.length === 0 && <p>No products match your search.</p>}
      </div>
    </div>
  );
};

export default Product;
