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

        cy.get('input[name="quantity"]').type('1')
        cy.contains('Add to Cart').click()
        cy.wait(1000)

        cy.get('.MuiDialog-container')
            .should('exist')
            .and('be.visible')
        cy.wait(500)
        // Click the 'Add' button in the dialog
        cy.get('button')
            .contains('Add')
            .click()


        cy.wait(5000)


        cy.get('input[name="quantity"]').type('0')
        cy.contains('Add to Cart').click()
        cy.get('input[name="quantity"]').clear()
        cy.wait(1000)


        cy.get('input[name="quantity"]').type('110')
        cy.contains('Add to Cart').click()
        cy.wait(500)


    })
})