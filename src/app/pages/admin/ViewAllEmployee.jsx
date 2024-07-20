import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Backdrop, CircularProgress, Container, Divider, Grid, Typography} from "@material-ui/core";
import {enqueueSnackbar, useSnackbar} from "notistack";
import {backdropStyles} from "../../util/CommonStyles";
import employeeService from "../../service/EmployeeService";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Button from "@material-ui/core/Button";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate} from "react-router-dom";

const Card = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
`;

const Row = ({ row }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate("/adm/empUpdate", { state: { row } });
    };

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.nic}</TableCell>
                <TableCell>{row.createDate}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Card>
                            <Grid container style={{ flexWrap: 'wrap', flexDirection: 'column' }}>
                                <Box sx={{ margin: 3 }}>
                                    <Typography variant="h6" gutterBottom component="div">
                                        <h4>= = = = = = = = Other Detail = = = = = = = = = = </h4>
                                    </Typography>
                                    {row.other.map((otherDetail, index) => (
                                        <Box key={index} sx={{ marginBottom: 2 }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="body1"><strong>User Name :
                                                        - </strong> {"  " + otherDetail.userName}</Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="body1"><strong>Address :
                                                        - </strong> {"  " + otherDetail.address}</Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="body1"><strong>Modify Date :
                                                        - </strong> {"  " + otherDetail.modifiedDate}</Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="body1"><strong>Status :
                                                        - </strong> {"  " + otherDetail.status}</Typography>
                                                </Grid>
                                            </Grid>
                                            <br />
                                            <Divider sx={{ marginTop: 10 }} />
                                            <br />
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Box sx={{ display: 'flex', gap: 2, alignItems: "right" }}>
                                                        <Button type="button" onClick={handleEdit} variant="contained" color="primary" startIcon={<EditIcon />}>
                                                            Edit
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                            <br />
                                            <Divider sx={{ marginTop: 5 }} />
                                        </Box>
                                    ))}
                                </Box>
                            </Grid>
                        </Card>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export const EmployeeAll = () => {
    const { backdrop } = backdropStyles();
    const [loading, setLoading] = useState(false);
    const [employeeList, setEmployeeList] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getAllEmployees();
    }, []);

    function getAllEmployees() {
        setLoading(true);
        employeeService.getAllEmployee().then((res) => {
            if (res.status === 200) {
                setEmployeeList(res.data.map(employee => createData(
                    employee.adminId, employee.name, employee.address, employee.nic, employee.userName, employee.createdDate, employee.modifiedDate, "ACTIVE"
                )));
                setLoading(false);
            } else {
                enqueueSnackbar('Data Fetching Failed', { variant: 'error' });
                setLoading(false);
            }
        }).catch(() => {
            enqueueSnackbar('Internal Server Error', { variant: 'error' });
            setLoading(false);
        });
    }

    function createData(id, name, address, nic, userName, createDate, modifiedDate, status) {
        return {
            id: id ?? "N/A",
            name: name ?? "N/A",
            nic: nic ?? "N/A",
            createDate: createDate ?? "N/A",
            other: [{
                address: address ?? "N/A",
                userName: userName ?? "N/A",
                modifiedDate: modifiedDate ?? "N/A",
                status: status ?? "N/A",
            }],
        };
    }

    return (
        <Container>
            <Backdrop className={backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Card>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h5">New Employee</Typography>
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '12px' }}>
                        <Divider variant="fullWidth" />
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell sx={{ fontWeight: 'bold' }}>Id</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Nic No</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Created Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {employeeList.map((row) => (
                                        <Row key={row.id} row={row} />
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
