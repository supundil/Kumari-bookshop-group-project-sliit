import React, { useState } from 'react';
import styled from 'styled-components';

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
  color: #007bff;
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
  margin-top: 20px;

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

const BookDetail = () => {
    const [isOpen, setIsOpen] = useState({ policy: false, details: false, store: false });

    const toggleSection = (section) => {
        setIsOpen((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <Container>
            <Header>

                <Nav>
                    <ul>
                        <li>Fiction</li>
                        <li>Non-Fiction</li>
                    </ul>
                </Nav>
                <SearchBar type="text" placeholder="Search for books and authors" />
            </Header>
            <Main>
                <ImageSection>
                    <img src="https://via.placeholder.com/400" alt="Book" />
                </ImageSection>
                <DetailsSection>
                    <Title>The Great Gatsby</Title>
                    <Description>A novel written by American author F. Scott Fitzgerald.</Description>
                    <Price>€15.00</Price>
                    <Info>
                        <InfoLabel>Author:</InfoLabel> F. Scott Fitzgerald
                    </Info>
                    <Info>
                        <InfoLabel>Genre:</InfoLabel> Fiction
                    </Info>
                    <Info>
                        <InfoLabel>✓</InfoLabel> Free delivery on qualifying orders
                    </Info>
                    <Info>
                        <InfoLabel>✓</InfoLabel> Free returns
                    </Info>
                    <AddToCartButton>Add to Cart</AddToCartButton>
                </DetailsSection>
            </Main>
            <CollapsibleSection>
                <CollapsibleTitle onClick={() => toggleSection('policy')}>
                    Our Delivery and Returns Policy {isOpen.policy ? '▲' : '▼'}
                </CollapsibleTitle>
                {isOpen.policy && (
                    <CollapsibleContent>
                        <p>Details about delivery and returns policy...</p>
                    </CollapsibleContent>
                )}
            </CollapsibleSection>
            <CollapsibleSection>
                <CollapsibleTitle onClick={() => toggleSection('details')}>
                    Book Details {isOpen.details ? '▲' : '▼'}
                </CollapsibleTitle>
                {isOpen.details && (
                    <CollapsibleContent>
                        <p>Details about the book...</p>
                    </CollapsibleContent>
                )}
            </CollapsibleSection>
            <CollapsibleSection>
                <CollapsibleTitle onClick={() => toggleSection('store')}>
                    Find in Store {isOpen.store ? '▲' : '▼'}
                </CollapsibleTitle>
                {isOpen.store && (
                    <CollapsibleContent>
                        <p>Details about finding the book in store...</p>
                    </CollapsibleContent>
                )}
            </CollapsibleSection>
        </Container>
    );
};

export default BookDetail;
