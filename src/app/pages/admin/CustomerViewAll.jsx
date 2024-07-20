import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Backdrop, CircularProgress, Container, Divider, Grid, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { backdropStyles } from "../../util/CommonStyles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import customerService from "../../service/CustomerService";

const Card = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
`;

export const CustomerViewAll = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { backdrop } = backdropStyles();
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getAllCustomers();
    }, []);

    const getAllCustomers = () => {
        setLoading(true);
        customerService.getAllCustomer()
            .then((res) => {
                if (res.status === 200) {
                    // Mapping the response data
                    setRows(res.data.map(customer => ({
                        customer_id: customer.customerId, // Changed from adminId to customerId
                        created_date: customer.createdDate || "N/A",// Default to "N/A" if null
                        contact_no: customer.contactNo || "N/A", // Default to "N/A" if null
                        email_address: customer.emailAddress || "N/A", // Default to "N/A" if null
                        name: customer.name || "N/A", // Default to "N/A" if null
                        nic: customer.nic || "N/A", // Default to "N/A" if null
                        user_name: customer.userName || "N/A" // Default to "N/A" if null
                    })));
                    setLoading(false);
                } else {
                    enqueueSnackbar('Data Fetching Failed', { variant: 'error' });
                    setLoading(false);
                }
            })
            .catch(() => {
                enqueueSnackbar('Internal Server Error', { variant: 'error' });
                setLoading(false);
            });
    };

    return (
        <Container>
            <Backdrop className={backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Card>
                <Grid container spacing={2}>
                    <Grid item lg={12}>
                        <Typography variant="h5">Customer Detail</Typography>
                    </Grid>
                    <Grid item lg={12} style={{ marginBottom: '12px' }}>
                        <Divider variant="fullWidth" />
                    </Grid>
                    <Grid item lg={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Customer ID</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Created Date</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Contact No</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Email Address</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>NIC</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>User Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.customer_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">{row.customer_id}</TableCell>
                                            <TableCell>{row.created_date}</TableCell>
                                            <TableCell>{row.contact_no}</TableCell>
                                            <TableCell>{row.email_address}</TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.nic}</TableCell>
                                            <TableCell>{row.user_name}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
};
