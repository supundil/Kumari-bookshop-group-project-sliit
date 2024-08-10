describe('Admin Product Details Update', () => {
    it('Test Case Passed', () => {
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

        cy.intercept('DELETE', 'http://localhost:8080/api/v1/product/delete-product/*').as('deleteProductRequest');
        cy.wait(500)
        cy.get('#DeleteModalOk').click()

        cy.wait('@deleteProductRequest').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });

    })
})