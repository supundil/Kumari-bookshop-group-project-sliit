import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    customer_id, created_date, modified_date, contact_no, email_address,
    name, nic, password, record_status, user_name
) {
    return {
        customer_id, created_date, modified_date, contact_no, email_address,
        name, nic, password, record_status, user_name
    };
}

const rows = [
    createData('C001', '2023-01-01', '2023-02-01', '1234567890', 'customer1@example.com', 'Customer One', '123456789V', 'password123', 'ACTIVE', 'customer1'),
    createData('C002', '2023-01-02', '2023-02-02', '0987654321', 'customer2@example.com', 'Customer Two', '987654321V', 'password456', 'INACTIVE', 'customer2'),
    // Add more customer data as needed
];

export default function CustomerTableComp() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell sx={{ fontWeight: 'bold' }}>Customer ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Created Date</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Modified Date</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Contact No</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Email Address</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>NIC</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Password</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Record Status</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>User Name</TableCell>
                    </TableRow>
                </TableHead>
                <br/>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.customer_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">{row.customer_id}</TableCell>
                            <TableCell>{row.created_date}</TableCell>
                            <TableCell>{row.modified_date}</TableCell>
                            <TableCell>{row.contact_no}</TableCell>
                            <TableCell>{row.email_address}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.nic}</TableCell>
                            <TableCell>{row.password}</TableCell>
                            <TableCell>{row.record_status}</TableCell>
                            <TableCell>{row.user_name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
