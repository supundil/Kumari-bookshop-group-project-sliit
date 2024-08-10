describe('Admin Product Details Update', () => {
    it('Test Case Passed', () => {
        cy.visit('http://localhost:3000')
        cy.get('input[name="username"]').type('admin123')
        cy.get('input[name="password"]').type('admin123')
        cy.contains('Sign In').click()
        cy.wait(1000)

        cy.get('#addProduct').click()

        cy.wait(1000)

        cy.get('input[name="code"]').type('admin123')
        cy.get('input[name="name"]').type('admin123')
        cy.get('textarea[name="description"]').type('admin123')
        cy.get('input[name="quantity"]').type('admin123')
        cy.get('#category').click()
        cy.get('li').contains('School Supplies').click()
        cy.get('input[name="buyingPrice"]').type('admin123')
        cy.get('input[name="sellingPrice"]').type('admin123')

        cy.get('input[type="file"]').then(input => {
            input.removeAttr('hidden');
        });

        cy.get('input[type=file]').selectFile('10182533-700x840.jpg');

        cy.wait(1000)

        cy.get('#addProductSubmit').click()

    })
})