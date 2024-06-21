import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input'
import {useHistory} from "react-router-dom";
import logo from './logo2.png'
import book from './bookshop.jpg'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center"
                    style={{display: 'flex', justifyContent: 'center'}}>
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#1299E4',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: '4%',
        padding: '10%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundPosition: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        //marginTop: "10%",
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundSize: 'cover',
        height: '50px',
        backgroundPosition: 'center'
    },
    inputStyle: {
        width: "100%",
        height: "40px",
        backgroundColor: "white",
        borderRadius: "25px",
        paddingLeft: "20px",
        fontSize: 15,
        color: "black",
        placeholderColor: "black",
        [theme.breakpoints.down('sm')]: {
            fontSize: "2.5vw",
            marginBottom: "10px",
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: "3.6vw",
            marginBottom: "0px",
        },
    },
}));


export default function SignUp() {
    const classes = useStyles();
    // let history = useHistory();
    // const [username, setUsername] = useState();
    // const [password, setPassword] = useState();
    // const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        // setOpen(true);
    };

    const handleClose = () => {
        // setOpen(false);
    };

    function login() {
        console.log("check1", username)
        console.log("check2", password)
        if (username == "admin" && password == "admin") {
            // history.push("/dashboardsell");
        } else {
            handleClickOpen()
        }
    }

    return (
        <div>
            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                
                <Grid item xs={false} xs={4} sm={4} md={8} className={classes.image}>
                {/* <h1>Kumari Book shop</h1> */}
                <img src={book} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Logo" />
                </Grid>
                
                <Grid item xs={8} sm={8} md={4} component={Paper} elevation={6} square
                      style={{backgroundColor: " #212A32"}}>
                    <div className={classes.paper}>
                    <img src={logo} style={{ width: '50%', height: '70%', objectFit: 'cover' }} alt="Logo" />
                        <Typography component="h1" variant="h5"
                                    style={{color: "white", marginTop: "15%", fontWeight: 'bold', fontSize: "34px"}}>
                            Sign Up
                        </Typography>
                        <Typography style={{color: "white", fontSize: "13px", marginTop: "5%"}}>
                            Please enter your username and password
                        </Typography>
                        <form className={classes.form} noValidate style={{marginTop: "10%"}}>
                            <Input className={classes.inputStyle} placeholder="Username"
                                   onChange={(e) => setUsername(e.target.value)}
                                   inputProps={{'aria-label': 'description'}} disableUnderline/>
                            <br/>
                            <Input className={classes.inputStyle} placeholder="Password" style={{marginTop: "5%"}}
                                   onChange={(e) => setPassword(e.target.value)}
                                   inputProps={{'aria-label': 'description'}} disableUnderline/>
                                   <Input className={classes.inputStyle} placeholder="ConfirmPassword" style={{marginTop: "5%"}}
                                   onChange={(e) => setPassword(e.target.value)}
                                   inputProps={{'aria-label': 'description'}} disableUnderline/>
                            <div style={{justifyContent: 'center', display: 'flex'}}>
                                <Button style={{backgroundColor: "#1299E4"}}
                                        component="h1"
                                        variant="h5"
                                        type="submit"
                                        fullWidth
                                        // variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={() => login()}
                                >
                                    Sign Up
                                </Button>
                            </div>
                            <Link href="/signin" variant="body2"
                                  style={{color: "white", display: 'flex', justifyContent: 'center'}}>
                                {"Alredy have an account? SignIn now"}
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
