import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Backdrop, CircularProgress, Container, Divider, Grid, Tab, Tabs, Typography} from "@material-ui/core";
import {backdropStyles} from "../../util/CommonStyles";
import OrderTableComp from '../../components/OrderTableComp';
import Paper from "@mui/material/Paper";
import orderService from "../../service/OrderService";
import {useSnackbar} from "notistack";

const Card = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
`;

export const OrderDetail = () => {
    const {backdrop} = backdropStyles();
    const {enqueueSnackbar} = useSnackbar();

    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(0);
    const [status, setStatus] = useState('Submitted');
    const [orderWrapper, setOrderWrapper] = useState([]);

    useEffect(() => {
        getAllSubmittedOrders();
    }, [])

    const getAllSubmittedOrders = () => {
        setLoading(true);
        orderService.getAllSubmittedOrders().then((res) => {
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

    const getAllConfirmedOrders = () => {
        setLoading(true);
        orderService.getAllConfirmedOrders().then((res) => {
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

    const getAllPaidOrders = () => {
        setLoading(true);
        orderService.getAllPaidOrders().then((res) => {
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

    const getAllRejectedOrders = () => {
        setLoading(true);
        orderService.getAllRejectedOrders().then((res) => {
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

    const handleChange = (newValue) => {
        const index = parseInt(newValue);
        if (0 === index) {
            getAllSubmittedOrders();
            setStatus('Submitted');
        } else if (1 === index) {
            getAllConfirmedOrders();
            setStatus('Confirmed');
        } else if (2 === index) {
            getAllPaidOrders();
            setStatus('Paid');
        } else if (3 === index) {
            getAllRejectedOrders();
            setStatus('Rejected');
        }
        setValue(index);
    }

    return (<Container>
        <Backdrop className={backdrop} open={loading}>
            <CircularProgress color="inherit"/>
        </Backdrop>
        <Card>
            <Grid container spacing={1}>

                <Grid item xs={12} style={{marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                    <Paper square elevation={2} style={{backgroundColor: '#F5F7FA'}}>
                        <Tabs
                            value={value}
                            onChange={(event, value) => handleChange(value)}
                            indicatorColor="primary"
                            textColor="inherit"
                            centered
                        >
                            <Tab id={"submittedOrders"} label="Submitted" style={{color: '#373738', fontWeight: 'bold'}}/>
                            <Tab id={"confirmedOrders"} label="Confirmed" style={{color: '#373738', fontWeight: 'bold'}}/>
                            <Tab id={"paidOrders"} label="Paid" style={{color: '#373738', fontWeight: 'bold'}}/>
                            <Tab id={"rejectedOrders"} label="Rejected" style={{color: '#373738', fontWeight: 'bold'}}/>
                        </Tabs>
                    </Paper>
                </Grid>
                <Grid item xs={12} style={{marginBottom: '12px'}}>
                    <Divider variant="fullWidth"/>
                </Grid>
                <Grid item xs={12} id={"orderContainer"}>
                    <OrderTableComp
                        orderList={orderWrapper}
                        status={status}
                        setLoading={setLoading}
                        getAllConfirmedOrders={getAllConfirmedOrders}
                        getAllSubmittedOrders={getAllSubmittedOrders}/>
                </Grid>
            </Grid>
        </Card>
    </Container>);
};
