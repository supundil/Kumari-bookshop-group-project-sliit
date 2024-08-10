describe('Admin Product Details Update', () => {
    it('successfully loads', () => {
        cy.visit('http://localhost:3000')
        cy.get('input[name="username"]').type('admin123')
        cy.get('input[name="password"]').type('admin123')
        cy.contains('Sign In').click()
        cy.wait(1000)

        cy.wait(1000)

        cy.get('.product-grid .product-card')
            .first()
            .within(() => {
                cy.get('button')
                    .click()
            })

        cy.wait(1000)

        cy.get('#DeleteProduct').click()

        cy.wait(500)


        cy.get('#DeleteModalOk').click()



    })
})