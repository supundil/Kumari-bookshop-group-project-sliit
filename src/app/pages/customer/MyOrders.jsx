import {Container, Divider, Grid, Typography} from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import MyOrderDetailComp from "./MyOrderDetailComp";

const Card = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
`;

export const MyOrders = () => {


    return (
        <Container>
            <Card>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Your Orders</Typography>
                    </Grid>
                    <Grid item xs={12} style={{marginBottom: '12px'}}>
                        <Divider variant="fullWidth"/>
                    </Grid>
                    <Grid item xs={12}>
                        <MyOrderDetailComp/>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
};