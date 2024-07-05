import React from 'react';
import './ProductCard.css';
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

const ProductCard = ({ image, title, description, price, id }) => {
    let navigate = useNavigate();

    return (
        <div className="product-card">
            <img src={image} alt={title} className="product-image" />
            <div className="product-details">
                <h2 className="product-title">{title}</h2>
                <p className="product-description">{description}</p>
                <div className="product-price">${price}</div>
                <button className="product-button" onClick={() => navigate('products/'+id)}>View</button>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default ProductCard;
