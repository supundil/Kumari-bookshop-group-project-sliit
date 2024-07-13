import React, { useState } from 'react';
import styled from 'styled-components';
import {Backdrop, CircularProgress, Container, Divider, MenuItem, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import productImg from "../../../asset/img/product-placeholder.png";
import {backdropStyles, formFieldStyles} from "../../util/CommonStyles";
import Typography from "@material-ui/core/Typography";
import {useSnackbar} from "notistack";
import productService from "../../service/ProductService";
import {useEffect} from "react";

const Card = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
`;

export const AddProduct = () => {
    const {enqueueSnackbar} = useSnackbar();
    const {backdrop} = backdropStyles();
    const {field, imageContainer, uploadButton, submitButtonContainer, submitButton} = formFieldStyles();

    const [loading, setLoading] = React.useState(false);
    const [categories, setCategories] = React.useState([]);
    const [formValues, setFormValues] = useState({
        code: '',
        name: '',
        description: '',
        buyingPrice: '',
        sellingPrice: '',
        quantity: '',
        categoryId: '',
    });
    const [productImageUrl, setProductImageUrl] = useState(null);
    const [productImage, setProductImage] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        getCategories();
    }, [])

    function getCategories() {
        setLoading(true);
        productService.getCategories().then((res) => {
            if (200 === res.status) {
                setCategories(res.data);
                console.log("Cate", res);
                setLoading(false);
            } else {
                setLoading(false);
                enqueueSnackbar('Data Fetching Failed', {variant: 'error'});
            }
        }).catch(() => {
            setLoading(false);
            enqueueSnackbar('Internal Server Error', {variant: 'error'});
        });
    }

    const validateCode = (code) => code !== undefined && code.length >= 3;

    const validateName = (name) => name !== undefined && name.length >= 4;

    const validateDesc = (desc) => desc !== undefined && desc.length >= 4;

    const validateQty = (qty) => qty !== undefined && qty !== '' && parseFloat(qty) >= 0;

    const validateCategory = (category) => category !== undefined && category !== '';

    const validateBuying = (buying) => buying !== undefined && buying !== '' && parseFloat(buying) >= 0;

    const validateSelling = (selling) => selling !== undefined && selling !== '' && parseFloat(selling) >= 0;

    const validateForm = () => {
        const errors = {};
        if (!validateCode(formValues.code)) errors.code = 'Must be at least 3 characters.';
        if (!validateName(formValues.name)) errors.name = 'Must be at least 4 characters.';
        if (!validateDesc(formValues.description)) errors.description = 'Must be at least 4 characters.';
        if (!validateQty(formValues.quantity)) errors.quantity = 'Quantity cannot empty';
        if (!validateCategory(formValues.categoryId)) errors.categoryId = 'Select a category';
        if (!validateBuying(formValues.buyingPrice)) errors.buyingPrice = 'Buying price cannot be empty';
        if (!validateSelling(formValues.sellingPrice)) errors.sellingPrice = 'Selling price cannot be empty';
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
            if (undefined !== productImage && null != productImage) {
                const formData = new FormData();
                formData.append('file', productImage);
                formData.append('productDto', JSON.stringify(formValues));

                productService.save(formData).then((res) => {
                    if (200 === res.status) {
                        enqueueSnackbar('Successfully Saved', {variant: 'success'});
                        setFormValues({
                            code: '',
                            name: '',
                            description: '',
                            buyingPrice: '',
                            sellingPrice: '',
                            quantity: '',
                            categoryId: '',
                        });
                        setProductImage(null);
                        setProductImageUrl(null);
                        setLoading(false);
                    } else {
                        setLoading(false);
                        enqueueSnackbar('Request Failed', {variant: 'error'});
                    }
                }).catch(() => {
                    setLoading(false);
                    enqueueSnackbar('Internal Server Error', {variant: 'error'});
                });
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
            setProductImageUrl(URL.createObjectURL(e.target.files[0]));
            setProductImage(e.target.files[0]);
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
                        <Typography variant="h5">New Product</Typography>
                    </Grid>
                    <Grid item xs={12} style={{marginBottom: '12px'}}>
                        <Divider variant="fullWidth" />
                    </Grid>
                </Grid>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} className={imageContainer}>
                            <div>
                                {productImage ? (
                                    <img src={productImageUrl} alt="Product" style={{ width: '100%' }} />
                                ) : (
                                    <img src={productImg} alt="Placeholder" style={{ width: '100%' }} />
                                )}
                                <Button variant="outlined" component="label" className={uploadButton}>
                                    Upload Image
                                    <input type="file" hidden onChange={handleImageUpload} />
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <Grid container spacing={2} style={{height: '60%'}}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        className={field}
                                        variant="outlined"
                                        label="Product Code"
                                        fullWidth
                                        size="small"
                                        name="code"
                                        value={formValues.code}
                                        onChange={handleInputChange}
                                        error={!!formErrors.code}
                                        helperText={formErrors.code}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        className={field}
                                        variant="outlined"
                                        label="Product Name"
                                        fullWidth
                                        size="small"
                                        name="name"
                                        value={formValues.name}
                                        onChange={handleInputChange}
                                        error={!!formErrors.name}
                                        helperText={formErrors.name}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        className={field}
                                        variant="outlined"
                                        label="Product Description"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        size="small"
                                        name="description"
                                        value={formValues.description}
                                        onChange={handleInputChange}
                                        error={!!formErrors.description}
                                        helperText={formErrors.description}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        className={field}
                                        variant="outlined"
                                        label="Quantity"
                                        type="number"
                                        fullWidth
                                        size="small"
                                        name="quantity"
                                        value={formValues.quantity}
                                        onChange={handleInputChange}
                                        error={!!formErrors.quantity}
                                        helperText={formErrors.quantity}
                                        InputProps={{ inputProps: { min: 0 } }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        className={field}
                                        variant="outlined"
                                        label="Category"
                                        fullWidth
                                        size="small"
                                        name="categoryId"
                                        value={formValues.categoryId}
                                        onChange={handleInputChange}
                                        error={!!formErrors.categoryId}
                                        helperText={formErrors.categoryId}
                                        select
                                    >
                                        {
                                            categories.length ? categories.map(category => <MenuItem value={category.value}>{category.label}</MenuItem>)
                                                : <MenuItem value=""><em>None</em></MenuItem>
                                        }
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        className={field}
                                        variant="outlined"
                                        label="Buying Price"
                                        type="number"
                                        fullWidth
                                        size="small"
                                        name="buyingPrice"
                                        value={formValues.buyingPrice}
                                        onChange={handleInputChange}
                                        error={!!formErrors.buyingPrice}
                                        helperText={formErrors.buyingPrice}
                                        InputProps={{ inputProps: { min: 0.00, step: 0.01 } }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        className={field}
                                        variant="outlined"
                                        label="Selling Price"
                                        type="number"
                                        fullWidth
                                        size="small"
                                        name="sellingPrice"
                                        value={formValues.sellingPrice}
                                        onChange={handleInputChange}
                                        error={!!formErrors.sellingPrice}
                                        helperText={formErrors.sellingPrice}
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