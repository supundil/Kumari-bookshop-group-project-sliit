import React, {useContext, useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Chip} from "@mui/material";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {useSnackbar} from "notistack";
import {backdropStyles, cartStyles, formFieldStyles} from "../../util/CommonStyles";
import {Backdrop, CircularProgress} from "@material-ui/core";
import orderService from "../../service/OrderService";
import {AuthContext} from "../../context/AuthContext";
import Button from "@material-ui/core/Button";

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

export default function MyOrderDetailComp() {
    const {authDto} = useContext(AuthContext);
    const {enqueueSnackbar} = useSnackbar();
    const {emptyCartMessage} = cartStyles();
    const {backdrop} = backdropStyles();
    const {updateButton} = formFieldStyles();

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


    const fetchData = () => {
        if (authDto.username) {
            const url = `http://localhost:8080/api/v1/order-service/get-bill/${authDto.username}`;

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.ok) {
                        return response.blob(); // Convert response to Blob (PDF)
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                })
                .then(blob => {
                    // Create a URL for the Blob object and create a link element to trigger the download
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `Invoice_${authDto.username}.pdf`); // Set filename for download
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    window.URL.revokeObjectURL(url); // Clean up URL object
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };



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
            <Paper variant="outlined" key={"cusOrder"+oderId+totalCost} style={{marginBottom: '16px'}}>
                <Table sx={{minWidth: 700}} aria-label="spanning table">
                    <TableBody>
                        <TableRow>
                            <TableCell align="left" style={{display: 'flex', flexDirection: 'row'}}>
                                <Grid >
                                    <Typography variant="overline" style={{fontSize: '14px', fontWeight: 'bold'}}>Order
                                        Status : </Typography>
                                </Grid>
                                <Grid style={{display: 'flex'}}>
                                    <Chip label={orderStatus} style={{
                                        backgroundColor: getChipColor(orderStatus),
                                        color: '#ffffff',
                                        borderRadius: '8px',
                                        marginLeft: '6px'
                                    }}/>
                                </Grid>
                            </TableCell>
                            <TableCell align="left" style={{display: 'flex', flexDirection: 'row'}}>
                                <Grid>
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
                        {orderDetailDtoList && orderDetailDtoList.map(({detailId, productName, quantity, sellingPrice, totalPrice}) => (
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
                    <Grid xs={3}
                          style={{textAlign: 'end', paddingRight: '12px'}}>
                    </Grid>
                    <Grid xs={3} style={{display: 'flex'}}>
                    </Grid>
                    <Grid xs={3}
                          style={{textAlign: 'end', paddingRight: '12px'}}>

                    </Grid>
                    {orderStatus === "CONFIRMED" && <Grid xs={3} style={{display: 'flex'}}>
                        <Button id={"downloadBill"} variant="contained"
                                color="primary"
                                type="button"
                                style={{backgroundColor: '#03c2fc'}}
                                className={updateButton}
                                onClick={fetchData}
                        >
                            Download Bill
                        </Button>
                    </Grid>}
                </Grid>
            </Paper>))
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