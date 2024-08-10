import React, {useContext, useState} from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {useNavigate} from "react-router-dom";
import logo from '../../asset/img/logo2.png'
import book from '../../asset/img/bookshop.jpg'
import {Copyright} from "../components/Copyright";
import {backdropStyles, textFieldStyles, useStyles} from "../util/CommonStyles";
import {Backdrop, CircularProgress, IconButton, InputAdornment, TextField} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {useSnackbar} from "notistack";
import authService from "../service/auth/AuthService";
import {AuthContext} from "../context/AuthContext";
import httpService from "../service/HttpService";

export default function SignInSide() {
    let navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const {setAuthDto} = useContext(AuthContext);
    const {form, image, paper, root, submit} = useStyles();
    const {field} = textFieldStyles();
    const {backdrop} = backdropStyles();

    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        username: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({});

    const validateUsername = (username) => /^(?=.*\d)[a-zA-Z0-9]{6,}$/.test(username);

    const validatePassword = (password) => /^(?=.*\d).{8,}$/.test(password);

    const validateForm = () => {
        const errors = {};
        if (!validateUsername(formValues.username)) errors.username = 'Invalid username.';
        if (!validatePassword(formValues.password)) errors.password = 'Invalid password.';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (validateForm()) {
            authService.login(formValues).then((res) => {
                if (200 === res.status) {
                    if (res.data.token) {
                        sessionStorage.setItem('accessToken', res.data.token);
                        sessionStorage.setItem('username', res.data.username);
                        sessionStorage.setItem('isAdmin', JSON.stringify(res.data.isAdmin));
                        const auth = {
                            token: res.data.token,
                            username: res.data.username,
                            isAdmin: JSON.parse(res.data.isAdmin) || false
                        };
                        setAuthDto(auth);
                        httpService.configure(auth, window);
                        if (res.data.isAdmin) {
                            navigate('/adm/');
                        } else {
                            navigate('/cus/');
                        }
                    } else {
                        setLoading(false);
                        enqueueSnackbar('Internal Server Error', {variant: 'error'});
                    }
                } else {
                    setLoading(false);
                    enqueueSnackbar('Internal Server Error', {variant: 'error'});
                }
            }).catch((err) => {
                setLoading(false);
                enqueueSnackbar(err.response.data.message, {variant: 'error'});
            });
        } else {
            setLoading(false);
        }
    };

    return (
        <div>
            <Backdrop className={backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Grid container component="main" className={root}>
                <CssBaseline/>
                <Grid item  xs={4} sm={4} md={8} className={image}>
                <img src={book} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Logo" />
                </Grid>
                <Grid item xs={8} sm={8} md={4} component={Paper} elevation={6} square
                      style={{backgroundColor: " #212A32"}}>
                    <div className={paper}>
                    <img src={logo} style={{ width: '50%', height: '70%', objectFit: 'cover' }} alt="Logo" />
                        <Typography component="h1" variant="h5"
                                    style={{color: "white", marginTop: "15%", fontWeight: 'bold', fontSize: "34px"}}>
                            Sign in
                        </Typography>
                        <Typography style={{color: "white", fontSize: "13px", marginTop: "5%"}}>
                            Please enter your username and password
                        </Typography>
                        <form className={form} noValidate style={{marginTop: "10%"}}>
                            <TextField
                                className={field}
                                variant="outlined"
                                placeholder="Username"
                                fullWidth
                                name="username"
                                value={formValues.username}
                                onChange={handleInputChange}
                                error={!!formErrors.username}
                                helperText={formErrors.username}
                            />
                            <TextField
                                className={field}
                                variant="outlined"
                                placeholder="Password"
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formValues.password}
                                onChange={handleInputChange}
                                error={!!formErrors.password}
                                helperText={formErrors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                onMouseDown={(event) => event.preventDefault()}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <div style={{justifyContent: 'center', display: 'flex'}}>
                                <Button style={{backgroundColor: "#1299E4"}}
                                        component="h1"
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={submit}
                                        onClick={handleSubmit}
                                >
                                    Sign In
                                </Button>
                            </div>
                            <Link onClick={() => navigate('/signup')} variant="body2"
                                  style={{color: "white", display: 'flex', justifyContent: 'center', cursor: 'pointer'}}>
                                {"Don't have an account? SignUp now"}
                            </Link>
                            <Box mt={5}>
                                <Copyright/>
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </div>

    );
}
