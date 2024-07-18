import React, { useState } from 'react';
import styled from 'styled-components';
import {Backdrop, CircularProgress, Container, Divider, MenuItem, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import employeeDefaultImg from "../../../asset/img/product-placeholder.png";
import {backdropStyles, formFieldStyles} from "../../util/CommonStyles";
import Typography from "@material-ui/core/Typography";
import {useSnackbar} from "notistack";


const Card = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
`;

export const AddEmployee = () => {
    const {enqueueSnackbar} = useSnackbar();
    const {backdrop} = backdropStyles();
    const {field, imageContainer, uploadButton, submitButtonContainer, submitButton} = formFieldStyles();

    const [loading, setLoading] = React.useState(false);
    const [formValues, setFormValues] = useState({
        name: '',
        address: '',
        nic: '',
        userName: '',
        password: '',
    });
    const [employeeImageURL, setEmployeeImageUrlUrl] = useState(null);
    const [empImage, setEmployeeImageImage] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    const validateName = (name) => name !== undefined && name.length >= 4;

    const validateAddress = (address) => address !== undefined && address.length >= 4;

    const validateNic = (nic) => nic !== undefined && nic !== '';

    const validateUserName = (userName) => {
        const userNamePattern = /^[a-zA-Z0-9]{4,}$/;
        return userName !== undefined && userNamePattern.test(userName);
    };

    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*\d)[a-zA-Z\d]{6,}$/;
        return password !== undefined && passwordPattern.test(password);
    };

    const validateForm = () => {
        const errors = {};
        if (!validateName(formValues.name)) errors.name = 'Must be at least 4 characters.';
        if (!validateNic(formValues.nic)) errors.nic = 'NIC Cannot Be Empty';
        if (!validateAddress(formValues.address)) errors.address = 'Must be at least 4 characters.';
        if (!validateUserName(formValues.userName)) errors.userName = 'Username must be at least 4 characters and contain no special characters';
        if (!validatePassword(formValues.password)) errors.password = 'Password must be at least 6 characters, contain no special characters, and have at least one number';
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
            if (undefined !== empImageImage && null != empImageImage) {
                const formData = new FormData();

            } else {
                enqueueSnackbar('Please upload an image', {variant: 'warning'});
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    const handleImageUpload = (e) => {
        if (e.target.files.length) {
            console.log("File", e.target.files);
            setEmployeeImageUrlUrl(URL.createObjectURL(e.target.files[0]));
            setEmployeeImageImage(e.target.files[0]);
        }
    };

    return (
        <Container>
            <Backdrop className={backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Card>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h5">New Employee</Typography>
                    </Grid>
                    <Grid item xs={12} style={{marginBottom: '12px'}}>
                        <Divider variant="fullWidth" />
                    </Grid>
                </Grid>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} className={imageContainer}>
                            <div>
                                {empImage ? (
                                    <img src={employeeImageURL} alt="Emplyee" style={{ width: '100%' }} />
                                ) : (
                                    <img src={employeeDefaultImg} alt="Emplyee" style={{ width: '100%' }} />
                                )}
                                <Button variant="outlined" component="label" className={uploadButton}>
                                    Upload Emplyee Image
                                    <input type="file" hidden onChange={handleImageUpload} />
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <Grid container spacing={2} style={{height: '60%'}}>
                                <Grid item xs={12} >
                                    <TextField
                                        className={field}
                                        variant="outlined"
                                        label="Emplyee Full Name"
                                        rows={2}
                                        fullWidth
                                        size="small"
                                        name="name"
                                        value={formValues.name}
                                        onChange={handleInputChange}
                                        error={!!formErrors.name}
                                        helperText={formErrors.name}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        className={field}
                                        variant="outlined"
                                        label="Address"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        size="small"
                                        name="Address"
                                        value={formValues.address}
                                        onChange={handleInputChange}
                                        error={!!formErrors.address}
                                        helperText={formErrors.address}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        className={field}
                                        variant="outlined"
                                        label="NIC Number"
                                        type="text"
                                        fullWidth
                                        size="small"
                                        name="nic"
                                        value={formValues.nic}
                                        onChange={handleInputChange}
                                        error={!!formErrors.nic}
                                        helperText={formErrors.nic}
                                        InputProps={{ inputProps: { min: 0 } }}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        className={field}
                                        variant="outlined"
                                        label="User Name"
                                        type="email"
                                        fullWidth
                                        size="small"
                                        name="quantity"
                                        value={formValues.userName}
                                        onChange={handleInputChange}
                                        error={!!formErrors.userName}
                                        helperText={formErrors.userName}
                                        InputProps={{ inputProps: { min: 0 } }}
                                    />
                                    <TextField
                                        className={field}
                                        variant="outlined"
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        size="small"
                                        name="buyingPrice"
                                        value={formValues.password}
                                        onChange={handleInputChange}
                                        error={!!formErrors.password}
                                        helperText={formErrors.password}
                                        InputProps={{ inputProps: { min: 0.00, step: 0.01 } }}
                                    />
                                </Grid>

                            </Grid>
                            <Grid item xs={12} className={submitButtonContainer}>
                                <Button variant="contained"
                                        color="primary"
                                        type="button"
                                        className={submitButton}
                                        onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Container>
    );
};