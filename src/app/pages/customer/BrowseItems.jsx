import {Backdrop, CircularProgress, Container} from "@material-ui/core";
import React, {useEffect} from "react";
import {useSnackbar} from "notistack";
import {backdropStyles} from "../../util/CommonStyles";
import productService from "../../service/ProductService";
import CustomerProductCard from "./CustomerProductCard";
import './styles/browseStyles.css';

export const BrowseItems = () => {

    const {enqueueSnackbar} = useSnackbar();
    const {backdrop} = backdropStyles();

    const [loading, setLoading] = React.useState(false);
    const [productList, setProductList] = React.useState([]);

    useEffect(() => {
        getAllProducts();
    }, [])

    function getAllProducts() {
        setLoading(true);
        productService.getAllActiveProducts().then((res) => {
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
            <div className="customer-product-grid">
                {productList.map(product => (
                    <CustomerProductCard
                        key={product.code}
                        image={product.imageBase64}
                        title={product.name}
                        price={product.sellingPrice}
                        qty={product.quantity}
                        id={product.productId}
                    />
                ))}
            </div>
        </Container>
    );
};