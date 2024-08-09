import React, {useEffect, useState} from 'react';
import {AppBar, Toolbar, Typography, IconButton, Container, Tab, Tabs} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CartIcon from '@material-ui/icons/ShoppingCart';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import logoImg from '../../../asset/img/logo2.png'
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import httpService from "../../service/HttpService";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative !important',
        zIndex: theme.zIndex.drawer + 1,
        height: '70px',
        width: '100vw'
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        marginRight: theme.spacing(2),
        height: 40,
    },
    content: {
        // marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        width: '100vw', // Full screen width
        padding: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
}));

export const CustomerHome = () => {
    const {appBar, content, logo, logoContainer, toolbar} = useStyles();
    const navigate = useNavigate();

    const [value, setValue] = useState(0);
    const location = useLocation();

    useEffect(() => {
        switch(location.pathname) {
            case '/cus/':
                setValue(0);
                break;
            case '/cus/my-orders':
                setValue(1);
                break;
            default:
                setValue(false);
        }
    }, [location]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const logout = () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('isAdmin');
        httpService.getAxiosClient().interceptors.request.clear();
        navigate('/')
    };

    return (
        <>
            <AppBar position="fixed" className={appBar}>
                <Toolbar className={toolbar}>
                    <div className={logoContainer}>
                        <img src={logoImg} alt="Company Logo" className={logo} />
                        <Typography variant="h6" noWrap>
                            Kumari Book Shop
                        </Typography>
                    </div>
                    <Tabs
                        value={value}
                        onChange={(event, value) => handleChange(event, value)}
                        indicatorColor="secondary"
                        textColor="inherit"
                    >
                        <Tab label="Browse" onClick={() => navigate('/cus/')} />
                        <Tab label="My Orders" onClick={() => navigate('/cus/my-orders')} />
                    </Tabs>
                    <div>
                        <IconButton color="inherit" onClick={() => navigate('/cus/cart')}>
                            <CartIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={logout}>
                            <LogoutIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Container className={content}>
                <Outlet />
            </Container>
        </>
    );
};