import {Navigate, Route,} from 'react-router-dom';
import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

export function PrivateRoute( {component:Component, isAdminRoute, ...rest} ) {

    const {authDto} = useContext(AuthContext);

    const isAuthorized = () => {
        return isAdminRoute ? authDto.isAdmin : authDto.isCustomer;
    }

    return (
        <Route
            {...rest}
            render={props => {
                return isAuthorized()
                    ? <Component {...props} />
                    : <Navigate replace to="/"/>
            }}
        />
    )
}

export default PrivateRoute;
