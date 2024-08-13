import React, { useState } from 'react';
import styled from 'styled-components';
import { Backdrop, CircularProgress, Container, Divider, TextField, Grid, Button, Typography } from '@material-ui/core';
import employeeDefaultImg from '../../../asset/img/2672335.jpg';
import { backdropStyles, formFieldStyles } from '../../util/CommonStyles';
import { useSnackbar } from 'notistack';
import employeeService from "../../service/EmployeeService";

const Card = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
`;

export const AddEmployee = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { backdrop } = backdropStyles();
    const { field, imageContainer, uploadButton, submitButtonContainer, submitButton } = formFieldStyles();

    const [loading, setLoading] = useState(false);
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
                console.log(formValues)
            const formData = new FormData();
            formData.append('adminDto', JSON.stringify(formValues));
                employeeService.save(formData).then((res) => {
                    if (200 === res.status) {
                        enqueueSnackbar('Successfully Saved', {variant: 'success'});
                        setFormValues({
                            name: '',
                            address: '',
                            nic: '',
                            userName: '',
                            password: '',
                        });
                        setEmployeeImageImage(null);
                        setEmployeeImageUrlUrl(null);
                        setLoading(false);
                    } else {
                        setLoading(false);
                        enqueueSnackbar('Request Failed', {variant: 'error'});
                    }
                }).catch((e) => {
                    setLoading(false);
                    if (e?.response?.data?.message) {
                        enqueueSnackbar(e.response.data.message, {variant: 'error'});
                    } else {
                        enqueueSnackbar('Internal Server Error', {variant: 'error'});
                    }
                });
        } else {
            setLoading(false);
        }
    };

    const handleImageUpload = (e) => {
        if (e.target.files.length) {
            setEmployeeImageUrlUrl(URL.createObjectURL(e.target.files[0]));
            setEmployeeImageImage(e.target.files[0]);
        }
    };

    return (
        <Container>
            <Backdrop className={backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Card>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h5">New Employee</Typography>
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '12px' }}>
                        <Divider variant="fullWidth" />
                    </Grid>
                </Grid>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} className={imageContainer}>
                            <div>
                                {empImage ? (
                                    <img src={employeeImageURL} alt="Employee" style={{ width: '100%' }} />
                                ) : (
                                    <img src={employeeDefaultImg} alt="Employee" style={{ width: '100%' }} />
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2} style={{ height: '60%' }}>
                                <Grid item xs={12}>
                                    <TextField
                                        className={field}
                                        variant="outlined"
                                        label="Employee Full Name"
                                        fullWidth
                                        multiline
                                        size="small"
                                        name="name"
                                        value={formValues.name}
                                        onChange={handleInputChange}
                                        error={!!formErrors.name}
                                        helperText={formErrors.name}
                                        id={"txtEmpName"}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        className={field}
                                        variant="outlined"
                                        label="Address"
                                        multiline
                                        fullWidth
                                        size="small"
                                        name="address"
                                        value={formValues.address}
                                        onChange={handleInputChange}
                                        error={!!formErrors.address}
                                        helperText={formErrors.address}
                                        id={"txtEmpAddress"}
                                    />
                                </Grid>
                                <Grid item xs={12}>
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
                                        id={"txtEmpNIC"}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        className={field}
                                        variant="outlined"
                                        label="User Name"
                                        type="text"
                                        fullWidth
                                        size="small"
                                        name="userName"
                                        value={formValues.userName}
                                        onChange={handleInputChange}
                                        error={!!formErrors.userName}
                                        helperText={formErrors.userName}
                                        InputProps={{ inputProps: { min: 0 } }}
                                        id={"txtEmpUsername"}
                                    />
                                    <TextField
                                        className={field}
                                        variant="outlined"
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        size="small"
                                        name="password"
                                        value={formValues.password}
                                        onChange={handleInputChange}
                                        error={!!formErrors.password}
                                        helperText={formErrors.password}
                                        InputProps={{ inputProps: { min: 0.00, step: 0.01 } }}
                                        id={"txtEmpPassword"}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className={submitButtonContainer}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    className={submitButton}
                                    onClick={handleSubmit}
                                    id={"btnAddEmp"}
                                >
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
