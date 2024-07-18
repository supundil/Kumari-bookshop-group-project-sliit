import React, {useState} from 'react';
import styled from 'styled-components';
import {Backdrop, CircularProgress, Container, Divider, Grid, Typography} from "@material-ui/core";
import {useSnackbar} from "notistack";
import {backdropStyles, formFieldStyles} from "../../util/CommonStyles";
import CustomerTableComp from '../../components/CustomerTableComp';

const Card = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
`;

export const CustomerViewAll = () => {
    const {backdrop} = backdropStyles();

    const [loading, setLoading] = useState(false);

    return (<Container>
        <Backdrop className={backdrop} open={loading}>
            <CircularProgress color="inherit"/>
        </Backdrop>
        <Card>
            <Grid container spacing={2}>
                <Grid item lg={12}>
                    <Typography variant="h5">Customer Detail</Typography>
                </Grid>
                <Grid item lg={12} style={{marginBottom: '12px'}}>
                    <Divider variant="fullWidth"/>
                </Grid>
                <Grid item lg={12}>
                    <CustomerTableComp/>
                </Grid>
            </Grid>
        </Card>
    </Container>);
};
