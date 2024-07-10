import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
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

const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
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

const ProductForm = () => {
    const [productImage, setProductImage] = useState(null);

    const handleImageUpload = (e) => {
        setProductImage(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <Container>
            <Main>
                <ImageSection>
                    {productImage ? (
                        <img src={productImage} alt="Product" />
                    ) : (
                        <img src="https://via.placeholder.com/400" alt="Placeholder" />
                    )}
                </ImageSection>
                <FormSection>
                    <FormGroup>
                        <Label htmlFor="productCode">Product Code</Label>
                        <Input type="text" id="productCode" name="productCode" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="productName">Product Name</Label>
                        <Input type="text" id="productName" name="productName" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="productDescription">Product Description</Label>
                        <TextArea id="productDescription" name="productDescription" rows="4" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="productQuantity">Quantity</Label>
                        <Input type="number" id="productQuantity" name="productQuantity" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="buyingPrice">Buying Price</Label>
                        <Input type="number" id="buyingPrice" name="buyingPrice" step="0.01" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="sellingPrice">Selling Price</Label>
                        <Input type="number" id="sellingPrice" name="sellingPrice" step="0.01" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="productImage">Image Upload</Label>
                        <Input type="file" id="productImage" name="productImage" onChange={handleImageUpload} />
                    </FormGroup>
                    <SubmitButton type="submit">Submit</SubmitButton>
                </FormSection>
            </Main>
        </Container>
    );
};

export default ProductForm;
