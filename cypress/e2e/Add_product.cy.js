describe('Admin Product Details Update', () => {
    it('Test Case Passed', () => {
        cy.visit('http://localhost:3000')
        cy.get('input[name="username"]').type('admin123')
        cy.get('input[name="password"]').type('admin123')
        cy.contains('Sign In').click()
        cy.wait(1000)

        cy.get('#addProduct').click()

        cy.wait(1000)
        const randomId = Math.floor(Math.random() * 1000);

        cy.get('input[name="code"]').type('P'+randomId)
        cy.get('input[name="name"]').type('Atlas Pink Pen')
        cy.get('textarea[name="description"]').type('Atlas Pink Pen')
        cy.get('input[name="quantity"]').type('200')
        cy.get('#category').click()
        cy.get('li').contains('School Supplies').click()
        cy.get('input[name="buyingPrice"]').type('16')
        cy.get('input[name="sellingPrice"]').type('20')

        cy.get('input[type="file"]').then(input => {
            input.removeAttr('hidden');
        });

        cy.get('input[type=file]').selectFile('10182533-700x840.jpg');

        cy.wait(1000)

        cy.intercept('POST', 'http://localhost:8080/api/v1/product/save').as('addProductRequest');
        cy.wait(500)
        cy.get('#addProductSubmit').click()

        cy.wait('@addProductRequest').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });

    })
})