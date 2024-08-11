describe('Add to Cart Function', () => {
    it('Test Case Passed', () => {
        cy.visit('http://localhost:3000')
        cy.get('input[name="username"]').type('thathsara1')
        cy.get('input[name="password"]').type('thathsara1')
        cy.contains('Sign In').click()
        cy.wait(1000)

        cy.get('.customer-product-grid .customer-product-card')
            .first()
            .within(() => {
                cy.get('button')
                    .click()
            })

        cy.wait(1000)

        cy.get('input[name="quantity"]').type('0')
        cy.contains('Add to Cart').click()
        cy.wait(500)
        cy.get('input[name="quantity"]').clear()

        cy.wait(2000)


        cy.get('input[name="quantity"]').type('10000')
        cy.contains('Add to Cart').click()

        cy.wait(2000)

        cy.get('input[name="quantity"]').clear()
        cy.get('input[name="quantity"]').type('2')
        cy.contains('Add to Cart').click()
        cy.wait(1000)

        cy.get('.MuiDialog-container')
            .should('exist')
            .and('be.visible')
        cy.wait(500)

        cy.intercept('POST', 'http://localhost:8080/api/v1/order-service/add-to-cart').as('addToCartRequest');
        cy.wait(500)
        // Click the 'Add' button in the dialog
        cy.get('button')
            .contains('Add')
            .click()

        cy.wait('@addToCartRequest').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });

    })
})