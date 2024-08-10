import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import {useNavigate, useParams} from "react-router-dom";
import {useSnackbar} from "notistack";
import {backdropStyles, formFieldStyles} from "../../util/CommonStyles";
import productService from "../../service/ProductService";
import {
    Backdrop,
    CircularProgress, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField, withStyles
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import WarningIcon from '@material-ui/icons/Warning';
import orderService from "../../service/OrderService";
import {AuthContext} from "../../context/AuthContext";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Nav = styled.nav`
  ul {
    display: flex;
    gap: 20px;
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const SearchBar = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Main = styled.main`
  display: flex;
  gap: 20px;
  padding: 20px;
`;

const ImageSection = styled.div`
  flex: 1;

  img {
    width: 100%;
    border-radius: 10px;
  }
`;

const DetailsSection = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1em;
  color: #666;
`;

const Price = styled.p`
  font-size: 1.5em;
  color: #f70000;
  margin: 20px 0;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InfoLabel = styled.span`
  font-weight: bold;
`;

const AddToCartButton = styled.button`
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const CollapsibleSection = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const CollapsibleTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  padding: 10px 0;
`;

const CollapsibleContent = styled.div`
  padding: 10px 0;
`;

const DialogButton = withStyles({
    root: {
        margin: '5px',
    },
})(Button);

const DialogButtonAdd = withStyles({
    root: {
        margin: '5px',
        color: '#56fc03'
    },
})(Button);

const ProductDetail = () => {
    const {productId} = useParams();
    let navigate = useNavigate();
    const {authDto} = useContext(AuthContext);
    const {enqueueSnackbar} = useSnackbar();
    const {backdrop} = backdropStyles();
    const {field} = formFieldStyles();

    const [loading, setLoading] = React.useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [isOpen, setIsOpen] = useState({policy: false, details: false, store: false});
    const [product, setProduct] = React.useState({
        productId: 0,
        code: '',
        name: '',
        description: '',
        buyingPrice: 0.00,
        sellingPrice: 0.00,
        quantity: 0,
        categoryId: 0,
        categoryName: '',
        imageBase64: ''
    });
    const [formValues, setFormValues] = useState({
        quantity: '',
    });

    useEffect(() => {
        getProduct();
    }, [])

    function getProduct() {
        setLoading(true);
        productService.getProductDetail(productId).then((res) => {
            if (200 === res.status) {
                setProduct(res.data);
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

    const addToCart = () => {
        setLoading(true);
        orderService.addToCart({
            username: authDto.username,
            productId: product.productId,
            quantity: parseInt(formValues.quantity)
        }).then((res) => {
            if (200 === res.status) {
                enqueueSnackbar('Added to cart', {variant: 'success'});
                setFormValues({
                    quantity: '',
                });
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
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleOpen = () => {
        if (undefined !== formValues.quantity && '' !== formValues.quantity
            && 0 < parseInt(formValues.quantity)) {
            if (parseInt(formValues.quantity) <= product.quantity) {
                setOpenDialog(true);
            } else {
                enqueueSnackbar('Insufficient Stock', {variant: 'warning'});
            }
        } else {
            enqueueSnackbar('Please enter a valid quantity', {variant: 'warning'});
        }
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleConfirm = () => {
        handleClose();
        addToCart();
    };

    const toggleSection = (section) => {
        setIsOpen((prev) => ({...prev, [section]: !prev[section]}));
    };

    const getQty = () => {
        if (parseFloat(product.quantity) === 0) {
            return <span style={{fontSize: '16px', color: 'rgba(252, 44, 3, 0.8)'}}>Out of stock</span>
        } else {
            return <span>{product.quantity} <span style={{fontSize: '16px', color: '#56fc03'}}>in stock</span></span>;
        }
    }

    return (
        <Container style={{width: '75%'}}>
            <Backdrop className={backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Header>
                <Nav>
                    <ul>
                        <li>{product.categoryName}</li>
                    </ul>
                </Nav>
                {/*<SearchBar type="text" placeholder="Search for books and authors" />*/}
            </Header>
            <Main>
                <ImageSection>
                    <img
                        src={product.imageBase64 ? product.imageBase64 : "https://via.placeholder.com/400"}
                        alt="Item"/>
                </ImageSection>
                <DetailsSection>
                    <Title>{product.name}</Title>
                    <Description>{product.description}</Description>
                    <Price>{'Rs. ' + product.sellingPrice}</Price>
                    <Info>
                        <InfoLabel>Product Code:</InfoLabel> {product.code}
                    </Info>
                    <Info>
                        <InfoLabel>Availability</InfoLabel> {getQty()}
                    </Info>
                    <Grid item xs={12} style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '10px'
                    }}>
                        <Grid item xs={12} sm={4}
                              style={{
                                  display: 'flex',
                                  alignItems: 'center',
                              }}
                        >
                            <TextField
                                className={field}
                                style={{width: '75%'}}
                                variant="outlined"
                                label="Quantity"
                                type="number"
                                fullWidth
                                size="small"
                                name="quantity"
                                value={formValues.quantity}
                                onChange={handleInputChange}
                                InputProps={{inputProps: {min: 1}}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}
                              style={{
                                  display: 'flex',
                                  alignItems: 'center',
                              }}
                        >
                            <AddToCartButton onClick={handleOpen}>Add to Cart</AddToCartButton>
                        </Grid>
                    </Grid>
                    <Info style={{marginTop: '10px'}}>
                        <InfoLabel>✓</InfoLabel> Free returns
                    </Info>
                </DetailsSection>
            </Main>
            <CollapsibleSection>
                <CollapsibleTitle onClick={() => toggleSection('policy')}>
                    Returns Policy {isOpen.policy ? '▲' : '▼'}
                </CollapsibleTitle>
                {isOpen.policy && (
                    <CollapsibleContent>
                        <p>Thank you for your purchase. We hope you are happy with your purchase. However, if you find
                            any malfunction or faults with your purchased product, you may return it to us for an
                            exchange. You must provide order bill when returning.</p>
                    </CollapsibleContent>
                )}
            </CollapsibleSection>
            <CollapsibleSection>
                <CollapsibleTitle onClick={() => toggleSection('details')}>
                    Pick Up {isOpen.details ? '▲' : '▼'}
                </CollapsibleTitle>
                {isOpen.details && (
                    <CollapsibleContent>
                        <p>After placing the order, our employees will review your order and confirm. You can download
                            the bill after confirmation from the order section. Provide this order bill when picking up your order.</p>
                    </CollapsibleContent>
                )}
            </CollapsibleSection>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ display: 'flex', alignItems: 'center' }}>
                    <WarningIcon style={{ marginRight: '8px', verticalAlign: 'middle', color: 'yellow' }} />
                    Add to cart</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Add {formValues.quantity} {product.name} to the cart?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <DialogButton onClick={handleClose} color="primary">
                        Cancel
                    </DialogButton>
                    <DialogButtonAdd onClick={handleConfirm} autoFocus>
                        Add
                    </DialogButtonAdd>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ProductDetail;
