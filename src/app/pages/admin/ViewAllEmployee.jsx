import React, {useState} from 'react';
import styled from 'styled-components';
import {Backdrop, CircularProgress, Container, Divider, Grid, Typography} from "@material-ui/core";
import {useSnackbar} from "notistack";
import {backdropStyles, formFieldStyles} from "../../util/CommonStyles";
import EmployeeTableComp from '../../components/EmployeeTableComp';

const Card = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
`;

export const EmployeeAll = () => {
    const {enqueueSnackbar} = useSnackbar();
    const {backdrop} = backdropStyles();
    const {imageContainer, uploadButton, submitButtonContainer, submitButton} = formFieldStyles();

    const [loading, setLoading] = useState(false);

    return (<Container>
        <Backdrop className={backdrop} open={loading}>
            <CircularProgress color="inherit"/>
        </Backdrop>
        <Card>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h5">New Employee</Typography>
                </Grid>
                <Grid item xs={12} style={{marginBottom: '12px'}}>
                    <Divider variant="fullWidth"/>
                </Grid>
                <Grid item xs={12}>
                    <EmployeeTableComp/>
                </Grid>
            </Grid>
        </Card>
    </Container>);
};
