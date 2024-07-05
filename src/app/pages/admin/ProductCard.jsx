// ProductCard.jsx

import React from 'react';
import './ProductCard.css';

const ProductCard = ({ image, title, description, price }) => {
    return (
        <div className="product-card">
            <img src={image} alt={title} className="product-image" />
            <div className="product-details">
                <h2 className="product-title">{title}</h2>
                <p className="product-description">{description}</p>
                <div className="product-price">${price}</div>
                <button className="product-button">Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductCard;
