import React, {useContext, useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Chip} from "@mui/material";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {useSnackbar} from "notistack";
import {backdropStyles, cartStyles} from "../../util/CommonStyles";
import {Backdrop, CircularProgress} from "@material-ui/core";
import orderService from "../../service/OrderService";
import {AuthContext} from "../../context/AuthContext";

const TAX_RATE = 0.07;

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return {desc, qty, unit, price};
}

function subtotal(items) {
    return items.map(({price}) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
    createRow('Paperclips (Box)', 100, 1.15),
    createRow('Paper (Case)', 10, 45.99),
    createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function MyOrderDetailComp() {
    const {authDto} = useContext(AuthContext);
    const {enqueueSnackbar} = useSnackbar();
    const {emptyCartMessage} = cartStyles();
    const {backdrop} = backdropStyles();

    const [loading, setLoading] = React.useState(false);
    const [orderWrapper, setOrderWrapper] = useState([]);

    useEffect(() => {
        getAllOrders();
    }, [])

    const getAllOrders = () => {
        setLoading(true);
        orderService.getAllOrders(authDto.username).then((res) => {
            if (200 === res.status) {
                setOrderWrapper(res.data);
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

    const getChipColor = (status) => {
        if ('PENDING' === status) {
            return '#e6e600';
        } else if ('SUBMITTED' === status) {
            return '#1299E4';
        } else if ('CONFIRMED' === status) {
            return '#00cc00';
        } else if ('PAID' === status) {
            return '#991f00';
        } else if ('REJECTED' === status) {
            return '#ff0000';
        }
    }

    const getOrderList = () => {
        return orderWrapper.map(({orderStatus, createdDate, orderDetailDtoList, totalCost, oderId}) => (
            <TableContainer component={Paper} key={"cusOrder"+oderId+totalCost}>
                <Table sx={{minWidth: 700}} aria-label="spanning table">
                    <TableBody>
                        <TableRow>
                            <TableCell align="left" style={{display: 'flex', flexDirection: 'row'}}>
                                <Grid alignItems={"center"} justifyContent={"center"}>
                                    <Typography variant="overline" style={{fontSize: '14px', fontWeight: 'bold'}}>Order
                                        Status : </Typography>
                                </Grid>
                                <Grid alignItems={"center"} justifyContent={"center"} style={{display: 'flex'}}>
                                    <Chip label={orderStatus} style={{
                                        backgroundColor: getChipColor(orderStatus),
                                        color: '#ffffff',
                                        borderRadius: '8px',
                                        marginLeft: '6px'
                                    }}/>
                                </Grid>
                            </TableCell>
                            <TableCell align="left" style={{display: 'flex', flexDirection: 'row'}}>
                                <Grid alignItems={"center"} justifyContent={"center"}>
                                    <Typography variant="overline" style={{fontSize: '14px', fontWeight: 'bold'}}>Order
                                        placed on : </Typography>
                                </Grid>
                                <Grid alignItems={"center"} justifyContent={"center"} style={{display: 'flex'}}>
                                    <Typography variant="body1" style={{
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        marginLeft: '6px'
                                    }}>{createdDate}</Typography>
                                </Grid>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography variant="overline" style={{
                                fontSize: '13px',
                                fontWeight: 'bold'
                            }}>Name</Typography></TableCell>
                            <TableCell align="right"><Typography variant="overline" style={{
                                fontSize: '13px',
                                fontWeight: 'bold'
                            }}>Qty.</Typography></TableCell>
                            <TableCell align="right"><Typography variant="overline" style={{
                                fontSize: '13px',
                                fontWeight: 'bold'
                            }}>Price</Typography></TableCell>
                            <TableCell align="right"><Typography variant="overline" style={{
                                fontSize: '13px',
                                fontWeight: 'bold'
                            }}>Sum</Typography></TableCell>
                        </TableRow>
                        {orderDetailDtoList.map(({detailId, productName, quantity, sellingPrice, totalPrice}) => (
                            <TableRow key={detailId}>
                                <TableCell>{productName}</TableCell>
                                <TableCell align="right">{quantity}</TableCell>
                                <TableCell align="right">{sellingPrice}</TableCell>
                                <TableCell align="right">{ccyFormat(totalPrice)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell rowSpan={3}/>
                            <TableCell colSpan={2}><Typography variant="overline" style={{
                                fontSize: '13px',
                                fontWeight: 'bold'
                            }}>Subtotal</Typography></TableCell>
                            <TableCell align="right">{ccyFormat(totalCost)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}><Typography variant="overline" style={{
                                fontSize: '13px',
                                fontWeight: 'bold'
                            }}>Total</Typography></TableCell>
                            <TableCell align="right">{ccyFormat(totalCost)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>))
    }

    return (
        <>
            <Backdrop className={backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            {orderWrapper.length
                ? getOrderList()
                : <div className={emptyCartMessage}>No orders, keep browsing.</div>}
        </>
    );
}