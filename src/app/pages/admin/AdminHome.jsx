import React, {useEffect, useState} from 'react';
import {AppBar, Toolbar, Typography, IconButton, Container, Tab, Tabs} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import logoImg from '../../../asset/img/logo2.png'
import {Outlet, useLocation, useNavigate} from 'react-router-dom';

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

export const AdminHome = () => {
    const {appBar, content, logo, logoContainer, toolbar} = useStyles();
    const navigate = useNavigate();

    const [value, setValue] = useState(0);
    const location = useLocation();

    useEffect(() => {
        switch(location.pathname) {
            case '/adm/':
                setValue(0);
                break;
            case '/adm/addProduct':
                setValue(1);
                break;
            default:
                setValue(0);
        }
    }, [location]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                        <Tab label="Products" onClick={() => navigate('/adm/')} />
                        <Tab label="Add Product" onClick={() => navigate('/adm/addProduct')} />
                        <Tab label="Orders" onClick={() => navigate('/adm/')} />
                        <Tab label="Customers" onClick={() => navigate('/adm/')} />
                        <Tab label="Employees" onClick={() => navigate('/adm/')} />
                        <Tab label="Add Employee" onClick={() => navigate('/adm/')} />
                    </Tabs>
                    <div>
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