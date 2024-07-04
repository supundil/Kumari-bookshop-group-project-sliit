import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import OrdersIcon from '@material-ui/icons/Assignment';
import CartIcon from '@material-ui/icons/ShoppingCart';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import logoImg from '../../../asset/img/logo2.png'
import { Outlet, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
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
        marginTop: theme.spacing(8),
        width: '100vw', // Full screen width
        padding: theme.spacing(3),
    },
}));

export const CustomerHome = () => {
    const {appBar, content, logo, logoContainer, toolbar} = useStyles();
    const navigate = useNavigate();

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
                    <div>
                        <IconButton color="inherit" onClick={() => navigate('/orders')}>
                            <OrdersIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={() => navigate('/cart')}>
                            <CartIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={() => navigate('/')}>
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