import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import logo from '../../asset/img/logo2.png'
import book from '../../asset/img/bookshop.jpg'
import {Copyright} from "../components/Copyright";
import {backdropStyles, textFieldStyles, useStyles} from "../util/CommonStyles";
import {useNavigate} from "react-router-dom";
import {Backdrop, CircularProgress, IconButton, InputAdornment, TextField} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import customerService from "../service/CustomerService";
import {useSnackbar} from "notistack";

export default function SignUp() {
    let navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const {form, image, paper, root, submit} = useStyles();
    const {field} = textFieldStyles();
    const {backdrop} = backdropStyles();

    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        name: '',
        nic: '',
        userName: '',
        emailAddress: '',
        contactNo: '',
        password: '',
        confirmPassword: '',
    });
    const [formErrors, setFormErrors] = useState({});

    const validateFullName = (name) => name !== undefined && name.length >= 4;

    const validateNic = (nic) => nic !== undefined && /^(\d{9}[xX|vV]|\d{12})$/.test(nic);

    const validateUsername = (username) => username !== undefined && /^(?=.*\d)[a-zA-Z0-9]{6,}$/.test(username);

    const validateEmail = (email) => email !== undefined && /\S+@\S+\.\S+/.test(email);

    const validateContactNo = (contactNo) => contactNo !== undefined && /^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/.test(contactNo);

    const validatePassword = (password) => password !== undefined && /^(?=.*\d).{8,}$/.test(password);

    const validateConfirmPassword = (confirmPassword) => confirmPassword === formValues.password;

    const validateForm = () => {
        const errors = {};
        if (!validateFullName(formValues.name)) errors.name = 'Must be at least 4 characters.';
        if (!validateNic(formValues.nic)) errors.nic = 'Invalid NIC.';
        if (!validateUsername(formValues.userName)) errors.userName = 'Must be at least 6 characters and contain at least 1 number.';
        if (!validateEmail(formValues.emailAddress)) errors.emailAddress = 'Invalid email address.';
        if (!validateContactNo(formValues.contactNo)) errors.contactNo = 'Invalid contact number.';
        if (!validatePassword(formValues.password)) errors.password = 'Must be at least 8 characters and contain at least 1 number.';
        if (!validateConfirmPassword(formValues.confirmPassword)) errors.confirmPassword = 'Passwords do not match.';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (validateForm()) {
            customerService.register(formValues).then((res) => {
                if (200 === res.status) {
                    enqueueSnackbar('Successfully Registered', {variant: 'success', onExited: () => navigate('/')});
                } else {
                    setLoading(false);
                    enqueueSnackbar('Request Failed', {variant: 'error'});
                }
            }).catch(() => {
                setLoading(false);
                enqueueSnackbar('Internal Server Error', {variant: 'error'});
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
                <Grid item xs={4} sm={4} md={8} className={image}>
                    <img src={book} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt="Logo"/>
                </Grid>
                <Grid item xs={8} sm={8} md={4} component={Paper} elevation={6} square
                      style={{backgroundColor: " #212A32"}}>
                    <div className={paper}>
                        <img src={logo} style={{width: '50%', height: '70%', objectFit: 'cover'}} alt="Logo"/>
                        <Typography component="h1" variant="h5"
                                    style={{color: "white", marginTop: "6%", fontWeight: 'bold', fontSize: "34px"}}>
                            Sign Up
                        </Typography>
                        <Typography style={{color: "white", fontSize: "13px", marginTop: "4%"}}>
                            Please enter your username and password
                        </Typography>
                        <form className={form} style={{marginTop: "8%"}}>
                            <TextField
                                className={field}
                                variant="outlined"
                                placeholder="Full Name"
                                fullWidth
                                name="name"
                                value={formValues.name}
                                onChange={handleInputChange}
                                error={!!formErrors.name}
                                helperText={formErrors.name}
                            />
                            <TextField
                                className={field}
                                variant="outlined"
                                placeholder="NIC"
                                fullWidth
                                name="nic"
                                value={formValues.nic}
                                onChange={handleInputChange}
                                error={!!formErrors.nic}
                                helperText={formErrors.nic}
                            />
                            <TextField
                                className={field}
                                variant="outlined"
                                placeholder="Username"
                                fullWidth
                                name="userName"
                                value={formValues.userName}
                                onChange={handleInputChange}
                                error={!!formErrors.userName}
                                helperText={formErrors.userName}
                            />
                            <TextField
                                className={field}
                                variant="outlined"
                                placeholder="Email"
                                fullWidth
                                name="emailAddress"
                                value={formValues.emailAddress}
                                onChange={handleInputChange}
                                error={!!formErrors.emailAddress}
                                helperText={formErrors.emailAddress}
                            />
                            <TextField
                                className={field}
                                variant="outlined"
                                placeholder="Contact Number"
                                fullWidth
                                name="contactNo"
                                value={formValues.contactNo}
                                onChange={handleInputChange}
                                error={!!formErrors.contactNo}
                                helperText={formErrors.contactNo}
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
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                className={field}
                                variant="outlined"
                                placeholder="Confirm Password"
                                fullWidth
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formValues.confirmPassword}
                                onChange={handleInputChange}
                                error={!!formErrors.confirmPassword}
                                helperText={formErrors.confirmPassword}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                onMouseDown={(event) => event.preventDefault()}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <div style={{justifyContent: 'center', display: 'flex'}}>
                                <Button style={{backgroundColor: "#1299E4"}}
                                        component="h1"
                                        variant="contained"
                                        type="button"
                                        fullWidth
                                        color="primary"
                                        className={submit}
                                        onClick={handleSubmit}
                                >
                                    Sign Up
                                </Button>
                            </div>
                            <Link onClick={() => navigate('/')} variant="body2"
                                  style={{
                                      color: "white",
                                      display: 'flex',
                                      justifyContent: 'center',
                                      cursor: 'pointer'
                                  }}>
                                {"Already have an account? SignIn now"}
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
