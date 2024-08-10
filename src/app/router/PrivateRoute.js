import {Navigate} from 'react-router-dom';
import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Backdrop, CircularProgress} from "@material-ui/core";
import {backdropStyles} from "../util/CommonStyles";

export function PrivateRoute( { children, isAdminRoute, ...rest } ) {

    const {authDto} = useContext(AuthContext);
    const {backdrop} = backdropStyles();

    if (!authDto) {
        return (
            <Backdrop className={backdrop} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    const isAuthorized = authDto.username !== '';
    const isValidRoute = isAdminRoute ? authDto.isAdmin : true;

    if (!isAuthorized) {
        return <Navigate to="/" replace />;
    }

    if (!isValidRoute) {
        return <Navigate to="/" replace />;
    }

    return children;
}
