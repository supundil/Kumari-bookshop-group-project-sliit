import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';
import {Container} from "@material-ui/core";

const ProductGrid = () => {

    const products = [
        { id: 1, image: 'https://via.placeholder.com/300', title: 'Product 1', description: 'Description for product 1.', price: '29.99' },
        { id: 2, image: 'https://via.placeholder.com/300', title: 'Product 2', description: 'Description for product 2.', price: '39.99' },
        { id: 3, image: 'https://via.placeholder.com/300', title: 'Product 3', description: 'Description for product 3.', price: '49.99' },
        { id: 4, image: 'https://via.placeholder.com/300', title: 'Product 4', description: 'Description for product 4.', price: '59.99' },
        { id: 5, image: 'https://via.placeholder.com/300', title: 'Product 5', description: 'Description for product 5.', price: '69.99' },
        { id: 6, image: 'https://via.placeholder.com/300', title: 'Product 6', description: 'Description for product 6.', price: '79.99' },
        { id: 7, image: 'https://via.placeholder.com/300', title: 'Product 7', description: 'Description for product 7.', price: '89.99' },
        { id: 8, image: 'https://via.placeholder.com/300', title: 'Product 8', description: 'Description for product 8.', price: '99.99' },
    ];

    return (
        <Container>
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        image={product.image}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        id={product.id}
                    />
                ))}
            </div>
        </Container>
    );
};

export default ProductGrid;
