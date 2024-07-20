import {Container, Typography} from "@material-ui/core";
import React from "react";
import {useSnackbar} from "notistack";
import {backdropStyles} from "../../util/CommonStyles";

export const MyOrders = () => {

    const {enqueueSnackbar} = useSnackbar();
    const {backdrop} = backdropStyles();

    const [loading, setLoading] = React.useState(false);


    return (
        <Container>
            <Typography>My Orders</Typography>
        </Container>
    );
};