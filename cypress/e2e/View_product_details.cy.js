describe('View Product Details', () => {
    it('successfully loads', () => {
        cy.visit('http://localhost:3000')
        cy.get('input[name="username"]').type('thathsara1')
        cy.get('input[name="password"]').type('thathsara1')
        cy.contains('Sign In').click()
        cy.wait(1000)

        cy.wait(1000)

        cy.get('.customer-product-grid .customer-product-card')
            .first()
            .within(() => {
                cy.get('button')
                    .click()
            })



    })
})