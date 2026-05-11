import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CartContext } from '../CartProvider';

const API = 'http://localhost:9999';

const Detail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');

  const [reviewerName, setReviewerName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    axios.get(`${API}/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  const handleAddToCart = async () => {
    await addToCart(product);
    setMessage('Added to cart!');
    setTimeout(() => setMessage(''), 2000);
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || !comment.trim()) return;
    const newReview = {
      reviewerName,
      comment,
      rating: Number(rating),
      date: new Date().toISOString(),
    };
    const updated = {
      ...product,
      reviews: [...(product.reviews || []), newReview],
    };
    await axios.put(`${API}/products/${id}`, updated);
    setProduct(updated);
    setReviewerName('');
    setComment('');
    setRating(5);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      {message && <div className="alert-success">{message}</div>}

      <div className="detail-product">
        <h2>{product.title}</h2>
        <p>Category: {product.category}</p>
        <p>Price: ${product.price}</p>
        <button className="btn btn-primary" onClick={handleAddToCart}>
          Add To Cart
        </button>
      </div>

      <h3>Add Review</h3>
      <form className="review-form" onSubmit={handleAddReview}>
        <input
          type="text"
          placeholder="Your name"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          required
        />
        <textarea
          placeholder="Comment"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value={1}>1 Star</option>
          <option value={2}>2 Star</option>
          <option value={3}>3 Star</option>
          <option value={4}>4 Star</option>
          <option value={5}>5 Star</option>
        </select>
        <button type="submit" className="btn btn-success">
          Add Review
        </button>
      </form>

      <h3>Reviews</h3>
      <ul className="review-list">
        {(product.reviews || []).map((r, idx) => (
          <li key={idx} className="review-item">
            <div className="review-name">{r.reviewerName}</div>
            <div className="review-comment">{r.comment}</div>
            <div className="review-stars">
              {'⭐'.repeat(Number(r.rating) || 0)}
            </div>
          </li>
        ))}
        {(!product.reviews || product.reviews.length === 0) && (
          <li>No reviews yet.</li>
        )}
      </ul>
    </div>
  );
};

export default Detail;
