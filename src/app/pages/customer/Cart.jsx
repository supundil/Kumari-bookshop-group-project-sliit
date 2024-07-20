import React, {useContext, useEffect, useState} from "react";
import {Backdrop, CardMedia, CircularProgress, Container, IconButton} from "@material-ui/core";
import {useSnackbar} from "notistack";
import {backdropStyles, cartStyles} from "../../util/CommonStyles";
import './styles/browseStyles.css';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import orderService from "../../service/OrderService";
import {AuthContext} from "../../context/AuthContext";

export const Cart = () => {

    const {authDto} = useContext(AuthContext);
    const {enqueueSnackbar} = useSnackbar();
    const {backdrop} = backdropStyles();
    const {
        totalAmount,
        itemDetails,
        itemDetailsContainer,
        listItem,
        headerItemAdded,
        header,
        root,
        totalLabel,
        headerItem,
        itemColumn,
        media,
        quantityControl,
        list,
        emptyCartMessage
    } = cartStyles();

    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState({
        oderId: 0,
        orderDetailDtoList: [],
        orderStatus: '',
        productCount: 0,
        username: '',
        totalCost: 0.00
    });

    useEffect(() => {
        getCart();
    }, [])

    function getCart() {
        setLoading(true);
        orderService.getCart(authDto.username).then((res) => {
            if (200 === res.status) {
                if (res.data) {
                    setCart(res.data);
                } else {
                    setCart({
                        oderId: 0,
                        orderDetailDtoList: [],
                        orderStatus: '',
                        productCount: 0,
                        username: '',
                        totalCost: 0.00
                    });
                }
                setLoading(false);
            } else {
                setLoading(false);
                enqueueSnackbar('Data Fetching Failed', {variant: 'error'});
            }
        }).catch((e) => {
            setLoading(false);
            if (e?.response?.data?.message) {
                enqueueSnackbar(e.response.data.message, {variant: 'error'});
            } else {
                enqueueSnackbar('Internal Server Error', {variant: 'error'});
            }
        });
    }

    const increaseItems = (detailId) => {
        setLoading(true);
        orderService.increaseProductQuantity(detailId).then((res) => {
            if (200 === res.status) {
                setLoading(false);
                getCart();
            } else {
                setLoading(false);
                enqueueSnackbar('Request Failed', {variant: 'error'});
            }
        }).catch((e) => {
            setLoading(false);
            if (e?.response?.data?.message) {
                enqueueSnackbar(e.response.data.message, {variant: 'error'});
            } else {
                enqueueSnackbar('Internal Server Error', {variant: 'error'});
            }
        });
    }

    const decreaseItems = (detailId) => {
        setLoading(true);
        orderService.decreaseProductQuantity(detailId).then((res) => {
            if (200 === res.status) {
                setLoading(false);
                getCart();
            } else {
                setLoading(false);
                enqueueSnackbar('Request Failed', {variant: 'error'});
            }
        }).catch((e) => {
            setLoading(false);
            if (e?.response?.data?.message) {
                enqueueSnackbar(e.response.data.message, {variant: 'error'});
            } else {
                enqueueSnackbar('Internal Server Error', {variant: 'error'});
            }
        });
    }

    const placeOrder = () => {
        setLoading(true);
        orderService.placeOrder(authDto.username).then((res) => {
            if (200 === res.status) {
                setLoading(false);
                getCart();
            } else {
                setLoading(false);
                enqueueSnackbar('Request Failed', {variant: 'error'});
            }
        }).catch((e) => {
            setLoading(false);
            if (e?.response?.data?.message) {
                enqueueSnackbar(e.response.data.message, {variant: 'error'});
            } else {
                enqueueSnackbar('Internal Server Error', {variant: 'error'});
            }
        });
    }

    return (
        <Container className={root}>
            <Backdrop className={backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            {0 === cart.oderId ?
                <div className={emptyCartMessage}>Cart empty, keep browsing.</div>
                : <>
                    <div className={header}>
                        <Typography variant="h6" className={headerItemAdded}>Added Items</Typography>
                        <Typography variant="h6" className={headerItem}>Price</Typography>
                        <Typography variant="h6" className={headerItem}>Quantity</Typography>
                        <Typography variant="h6" className={headerItem}>Total</Typography>
                    </div>
                    <div className={list}>
                        {cart.orderDetailDtoList.map(({
                                                          detailId,
                                                          image,
                                                          productName,
                                                          quantity,
                                                          sellingPrice,
                                                          totalPrice
                                                      }) => (
                            <div key={detailId} className={listItem}>
                                <div className={itemDetailsContainer}>
                                    <CardMedia
                                        className={media}
                                        image={image || "https://via.placeholder.com/400"}
                                        title={productName}
                                    />
                                    <Typography variant="body1" className={itemDetails}>{productName}</Typography>
                                </div>
                                <Typography variant="body1" className={itemColumn}>Rs. {sellingPrice}</Typography>
                                <div className={`${itemColumn} ${quantityControl}`}>
                                    <IconButton
                                        onClick={() => decreaseItems(detailId)}
                                        disabled={quantity === 1}
                                    >
                                        <RemoveIcon/>
                                    </IconButton>
                                    <Typography variant="body1">{quantity}</Typography>
                                    <IconButton onClick={() => increaseItems(detailId)}>
                                        <AddIcon/>
                                    </IconButton>
                                </div>
                                <Typography variant="body1" className={itemColumn}>Rs. {totalPrice}</Typography>
                            </div>
                        ))}
                    </div>
                    <Grid item xs={12} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'end',
                        marginTop: '20px'
                    }}>
                        <Grid item xs={12} sm={4}
                              style={{
                                  display: 'flex',
                                  alignItems: 'center',
                              }}
                        >
                            <Typography variant="h6" className={totalLabel}>Total Amount:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}
                              style={{
                                  display: 'flex',
                                  alignItems: 'center',
                              }}
                        >
                            <Typography variant="h6" className={totalAmount}>Rs. {cart.totalCost}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'end',
                        marginTop: '30px'
                    }}>
                        <Grid item xs={12} sm={3}
                              style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                              }}
                        >
                            <Button variant="contained" color="primary" onClick={placeOrder}>Place Order</Button>
                        </Grid>
                    </Grid>
                </>}
        </Container>
    );
};