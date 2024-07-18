import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Card} from "@mui/material";
import Grid from "@material-ui/core/Grid";
import {Divider} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";


function createData(id, name, address, nic, userName, createDate, modifiedDate, status) {
    return {
        id, name, nic, createDate, other: [{
            address: address, userName: userName, modifiedDate: modifiedDate, status: status,
        }],
    };
}


function Row(props) {
    let navigate = useNavigate();
    const {row} = props;
    const [open, setOpen] = React.useState(false);


    const handleEdit = () => {
        navigate("/adm/addEmployee")
    };

    return (<React.Fragment>
        <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
            <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                </IconButton>
            </TableCell>

            <TableCell>{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.nic}</TableCell>
            <TableCell>{row.createDate}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Card>
                        <Grid container style={{ flexWrap: 'wrap', flexDirection: 'column' }}>
                            <Box sx={{margin: 3}}>
                                <Typography variant="h6" gutterBottom component="div">
                                    <h4>= = = = = = = = Other Detail = = = = = = = = = = </h4>
                                </Typography>
                                {row.other.map((otherDetail, index) => (<Box key={index} sx={{marginBottom: 2}}>
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
                                    <br/>
                                    <Divider sx={{marginTop: 10}}/>
                                    <br/>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box sx={{ display: 'flex', gap: 2 ,alignItems:"right"}}>
                                                <Button type="button" onClick={handleEdit} variant="contained" color="primary" startIcon={<EditIcon />}>
                                                    Edit
                                                </Button>
                                                <Button type="button" onClick={handleEdit} variant="contained" color="primary" startIcon={<EditIcon />}>
                                                    View
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <br/>
                                    <Divider sx={{marginTop: 5}}/>
                                </Box>))}
                            </Box>
                        </Grid>
                    </Card>

                </Collapse>
            </TableCell>
        </TableRow>
    </React.Fragment>);
}

const rows = [createData(1, 'thathsara', '123 Main St', 'NIC123456', 'john_doe', '2022-01-01', '2022-01-05', 'INACTIVE'), createData(2, 'ravishka', '456 Elm St', 'NIC654321', 'jane_smith', '2022-01-02', '2022-01-06', 'ACTIVE'), createData(3, 'shana', '789 Oak St', 'NIC789123', 'alice_johnson', '2022-01-03', '2022-01-07', 'INACTIVE'), createData(4, 'viki', '101 Pine St', 'NIC456789', 'bob_brown', '2022-01-04', '2022-01-08', 'ACTIVE'), createData(5, 'ravinsu', '202 Maple St', 'NIC321654', 'charlie_davis', '2022-01-05', '2022-01-09', 'INACTIVE'),];


export default function EmployeeTableComp() {
    return (<TableContainer component={Paper}>
        <Table aria-label="collapsible table">
            <TableHead>
                <TableRow>
                    <TableCell/>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Nic No</TableCell>
                    <TableCell>Created Date</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (<Row key={row.id} row={row}/>))}
            </TableBody>
        </Table>
    </TableContainer>);
}
