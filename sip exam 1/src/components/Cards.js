import React from 'react';

const ProductCard = ({ imageUrl, title, price, onAddToCart, onBuyNow }) => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={imageUrl} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Price: ${price}</p>
        <button className="btn btn-primary mr-2" onClick={onAddToCart}>Add to Cart</button>
        <button className="btn btn-success" onClick={onBuyNow}>Buy Now</button>
      </div>
    </div>
  );
};

export default ProductCard;
