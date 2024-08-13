describe('Update Product Details', () => {
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

        cy.get('input[name="code"]').clear()
        cy.get('input[name="name"]').clear()
        cy.get('textarea[name="description"]').clear()
        cy.get('input[name="quantity"]').clear()
        cy.get('input[name="buyingPrice"]').clear()
        cy.get('input[name="sellingPrice"]').clear()

        cy.wait(1000)

        cy.get('input[name="code"]').type('P003')
        cy.get('input[name="name"]').type('ATLAS A4 BOOK CR 80PGS SINGLE RULED')
        cy.get('textarea[name="description"]').type('ATLAS A4 BOOK CR 80PGS SINGLE RULED')
        cy.get('input[name="quantity"]').type('123')
        cy.get('#categorySelect').click()
        cy.get('li').contains('School Supplies').click()
        cy.get('input[name="buyingPrice"]').type('195')
        cy.get('input[name="sellingPrice"]').type('200')

        cy.wait(500)

        cy.intercept('POST', 'http://localhost:8080/api/v1/product/update').as('updateProductRequest');
        cy.wait(500)
        cy.get('#updateProduct').click()

        cy.wait('@updateProductRequest').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });
    })
})