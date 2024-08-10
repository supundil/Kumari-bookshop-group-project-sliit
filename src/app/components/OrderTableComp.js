import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from "prop-types";
import {cartStyles, formFieldStyles} from "../util/CommonStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Chip} from "@mui/material";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core";
import orderService from "../service/OrderService";
import {useSnackbar} from "notistack";

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

const StyledButton = withStyles(() => ({
    root: {
        borderColor: '#fc2c03',
        color: '#fc2c03',
        '&:hover': {
            borderColor: '#fc2c03',
            backgroundColor: '#FF5935',
            color: '#ffffff',
        },
    },
}))(Button);

const OrderTableComp = ({orderList, status, setLoading, getAllSubmittedOrders, getAllConfirmedOrders}) => {
    const {emptyCartMessage} = cartStyles();
    const {updateButton} = formFieldStyles();
    const {enqueueSnackbar} = useSnackbar();

    const confirmOrder = (orderId) => {
        setLoading(true);
        orderService.confirmCustomerOrder(orderId).then((res) => {
            if (200 === res.status) {
                enqueueSnackbar('Confirmed Successfully', {variant: 'success'});
                getAllSubmittedOrders();
                setLoading(false);
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

    const rejectOrder = (orderId) => {
        setLoading(true);
        orderService.rejectCustomerOrder(orderId).then((res) => {
            if (200 === res.status) {
                enqueueSnackbar('Rejected Successfully', {variant: 'success'});
                getAllSubmittedOrders();
                setLoading(false);
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

    const paidOrder = (orderId) => {
        setLoading(true);
        orderService.paidCustomerOrder(orderId).then((res) => {
            if (200 === res.status) {
                enqueueSnackbar('Payment Confirmed Successfully', {variant: 'success'});
                getAllConfirmedOrders();
                setLoading(false);
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

    const checkEmpty = () => {
        return orderList.length;
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
        return orderList.map(({createdDate, orderStatus, orderDetailDtoList, totalCost, oderId, username}) => (
            <Paper variant="outlined" key={"cusOrder" + oderId + totalCost}
                   style={{marginBottom: '16px'}}>
                <Grid xs={12} style={{display: 'flex', flexDirection: 'row', padding: '12px 12px 8px 12px'}}>
                    <Grid xs={3} alignItems={"center"} justifyContent={"center"}
                          style={{textAlign: 'end', paddingRight: '12px'}}>
                        <Typography variant="overline"
                                    style={{fontSize: '14px', fontWeight: 'bold', width: 'max-content'}}>Customer
                            : </Typography>
                    </Grid>
                    <Grid xs={3} alignItems={"center"} justifyContent={"flex-start"} style={{display: 'flex'}}>
                        <Typography variant="body1" style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            marginLeft: '6px'
                        }}>{username}</Typography>
                    </Grid>
                    <Grid xs={3} alignItems={"center"} justifyContent={"center"}
                          style={{textAlign: 'end', paddingRight: '12px'}}>
                    </Grid>
                    <Grid xs={3} alignItems={"center"} justifyContent={"flex-start"} style={{display: 'flex'}}>
                    </Grid>
                </Grid>
                <Grid xs={12} style={{display: 'flex', flexDirection: 'row', padding: '12px 12px 8px 12px'}}>
                    <Grid xs={3} alignItems={"center"} justifyContent={"center"}
                          style={{textAlign: 'end', paddingRight: '12px'}}>
                        <Typography variant="overline"
                                    style={{fontSize: '14px', fontWeight: 'bold', width: 'max-content'}}>Order
                            Status : </Typography>
                    </Grid>
                    <Grid xs={3} alignItems={"center"} justifyContent={"flex-start"} style={{display: 'flex'}}>
                        <Chip label={orderStatus} style={{
                            backgroundColor: getChipColor(orderStatus),
                            color: '#ffffff',
                            borderRadius: '8px',
                            marginLeft: '6px'
                        }}/>
                    </Grid>
                    <Grid xs={3} alignItems={"center"} justifyContent={"center"}
                          style={{textAlign: 'end', paddingRight: '12px'}}>
                        <Typography variant="overline" style={{fontSize: '14px', fontWeight: 'bold'}}>Order
                            placed on : </Typography>
                    </Grid>
                    <Grid xs={3} alignItems={"center"} justifyContent={"flex-start"} style={{display: 'flex'}}>
                        <Typography variant="body1" style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            marginLeft: '6px'
                        }}>{createdDate}</Typography>
                    </Grid>
                </Grid>
                <Table sx={{minWidth: 700}} aria-label="spanning table">
                    <TableBody>
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
                <Grid xs={12} style={{display: 'flex', flexDirection: 'row', padding: '12px 12px 8px 12px'}}>
                    <Grid xs={3} alignItems={"center"} justifyContent={"center"}
                          style={{textAlign: 'end', paddingRight: '12px'}}>
                    </Grid>
                    <Grid xs={3} alignItems={"center"} justifyContent={"flex-start"} style={{display: 'flex'}}>
                    </Grid>
                    <Grid xs={3} alignItems={"center"} justifyContent={"center"}
                          style={{textAlign: 'end', paddingRight: '12px'}}>
                        {status === "Submitted" &&
                            <StyledButton variant="outlined"
                                          color="primary"
                                          type="button"
                                          className={updateButton}
                                          onClick={() => rejectOrder(oderId)}
                            >
                                Reject
                            </StyledButton>
                        }
                    </Grid>
                    <Grid xs={3} alignItems={"center"} justifyContent={"flex-start"} style={{display: 'flex'}}>
                        {status === "Submitted" &&
                            <Button variant="contained"
                                    color="primary"
                                    type="button"
                                    style={{backgroundColor: '#56fc03'}}
                                    className={updateButton}
                                    onClick={() => confirmOrder(oderId)}
                            >
                                Confirm
                            </Button>
                        }
                        {status === "Confirmed" &&
                            <Button variant="contained"
                                    color="primary"
                                    type="button"
                                    style={{backgroundColor: '#991f00'}}
                                    className={updateButton}
                                    onClick={() => paidOrder(oderId)}
                            >
                                Confirm Payment
                            </Button>
                        }
                    </Grid>
                </Grid>
            </Paper>))
    }

    return checkEmpty() ? getOrderList() : <div className={emptyCartMessage}>No {status} orders.</div>;
}

OrderTableComp.propTypes = {
    orderList: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
    setLoading: PropTypes.func.isRequired,
    getAllSubmittedOrders: PropTypes.func.isRequired,
    getAllConfirmedOrders: PropTypes.func.isRequired,
};

export default OrderTableComp;