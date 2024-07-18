import React, {useEffect} from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';
import {Backdrop, CircularProgress, Container} from "@material-ui/core";
import {useSnackbar} from "notistack";
import {backdropStyles} from "../../util/CommonStyles";
import productService from "../../service/ProductService";

const ProductGrid = () => {

    const {enqueueSnackbar} = useSnackbar();
    const {backdrop} = backdropStyles();

    const [loading, setLoading] = React.useState(false);
    const [productList, setProductList] = React.useState([]);

    useEffect(() => {
        getAllProducts();
    }, [])

    function getAllProducts() {
        setLoading(true);
        productService.getAllProducts().then((res) => {
            if (200 === res.status) {
                setProductList(res.data);
                setLoading(false);
            } else {
                setLoading(false);
                enqueueSnackbar('Data Fetching Failed', {variant: 'error'});
            }
        }).catch(() => {
            setLoading(false);
            enqueueSnackbar('Internal Server Error', {variant: 'error'});
        });
    }

    return (
        <Container>
            <Backdrop className={backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <div className="product-grid">
                {productList.map(product => (
                    <ProductCard
                        key={product.code}
                        image={product.imageBase64}
                        title={product.name}
                        description={product.code}
                        price={product.quantity}
                        id={product.productId}
                    />
                ))}
            </div>
        </Container>
    );
};

export default ProductGrid;
