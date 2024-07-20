import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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
        padding: '0 12%',
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
        // height: "40px",
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

export const textFieldStyles = makeStyles(() => ({
    field: {
        margin: '10px 0 !important',
        '& .MuiInputBase-root': {
            backgroundColor: 'white',
            borderRadius: 16,
            height: 40,
            padding: '0 14px',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: '2px solid #ccc',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'yellow', // Border color when focused
            },
        },
        '& .MuiOutlinedInput-input': {
            padding: '10px 14px', // Adjust padding to fit the new height
        },
    },
}));

export const formFieldStyles = makeStyles(() => ({
    field: {
        margin: '10px 0 !important',
        '& .MuiInputBase-root': {
            backgroundColor: 'white',
            borderRadius: 10,
            // height: 40,
            // padding: '0 14px',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: '2px solid #ccc',
            },
            '&.Mui-focused fieldset': {
                // borderColor: 'yellow', // Border color when focused
            },
        },
    },
    imageContainer: {
        textAlign: 'center',
    },
    uploadButton: {
        marginTop: 10,
    },
    submitButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        height: '40%',
    },
    submitButton: {
        width: '50%',
    },
    updateButton: {
        width: '80%',
    },
    updateBtnContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export const backdropStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: '10000 !important',
        color: '#fff',
    },
}));

export const cartStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: theme.spacing(3),
        background: '#fff',
        borderRadius: '10px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(2, 0),
        borderBottom: '1px solid #ccc',
    },
    headerItem: {
        textAlign: 'center',
        flex: 1,
    },
    headerItemAdded: {
        textAlign: 'center',
        flex: 2,
    },
    list: {
        marginTop: theme.spacing(2),
    },
    listItem: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2, 0),
        borderBottom: '1px solid #ccc',
    },
    media: {
        height: 50,
        width: 50,
        objectFit: 'cover',
        borderRadius: '5px',
        marginRight: theme.spacing(2),
    },
    itemDetailsContainer: {
        display: 'flex',
        alignItems: 'center',
        flex: 2,
    },
    itemDetails: {
        textAlign: 'left',
    },
    itemColumn: {
        flex: 1,
        textAlign: 'center',
    },
    quantityControl: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    total: {
        marginTop: theme.spacing(2),
        textAlign: 'right',
    },
    totalAmountContainer: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'flex-end',
    },
    totalLabel: {
        flex: 1,
        textAlign: 'center',
    },
    totalAmount: {
        flex: 1,
        textAlign: 'center',
        marginLeft: theme.spacing(2),
    },
}));