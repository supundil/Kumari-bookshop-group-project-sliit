import React from 'react';
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {Divider} from "@material-ui/core";
import './styles/browseStyles.css';

const CustomerProductCard = ({ image, title, price, qty, id }) => {
    let navigate = useNavigate();

    const getQty = () => {
        if (parseFloat(qty) === 0) {
            return <span style={{fontSize: '16px', color: 'rgba(252, 44, 3, 0.8)'}}>Out of stock</span>
        } else {
            return <span>{qty} <span style={{fontSize: '16px', color: '#56fc03'}}>in stock</span></span>;
        }
    }

    return (
        <div className="customer-product-card">
            <div className="customer-product-img-container">
                <img src={image} alt={title} className="customer-product-image" />
            </div>
            <Divider variant="middle" />
            <div className="customer-product-details">
                <h2 className="customer-product-title">{title}</h2>
                <p className="customer-product-price">Rs. {price}</p>
                <div className="customer-product-qty">{getQty()}</div>
                <button className="customer-product-button" onClick={() => navigate('browse/'+id)}>View</button>
            </div>
        </div>
    );
};

CustomerProductCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    qty: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
};

export default CustomerProductCard;
