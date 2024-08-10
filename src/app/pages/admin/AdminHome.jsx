import React, {useEffect, useState} from 'react';
import {AppBar, Container, IconButton, Tab, Tabs, Toolbar, Typography,} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import logoImg from '../../../asset/img/logo2.png'
import {Outlet, useLocation, useNavigate} from 'react-router-dom';

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
        width: '100vw',
        // height: 'calc(100vh - 70px)',// Full screen width
        padding: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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
            case '/adm/order':
                setValue(2);
                break;
            case '/adm/customer':
                setValue(3);
                break;
            case '/adm/addEmployee':
                setValue(5);
                break;
            case '/adm/employee':
                setValue(4);
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
        navigate('/')
    };

    return (
        <>
            <AppBar className={appBar}>
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
                        <Tab label="Orders" onClick={() => navigate('/adm/order')} />
                        <Tab label="Customers" onClick={() => navigate('/adm/customer')} />
                        <Tab label="Employees" onClick={() => navigate('/adm/employee')} />
                        <Tab label="Add Employee" onClick={() => navigate('/adm/addEmployee')} />
                    </Tabs>
                    <div>
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