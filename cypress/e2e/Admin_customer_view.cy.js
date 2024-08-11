describe('Admin Customers view', () => {
    it('Test Case Passed', () => {
        cy.visit('http://localhost:3000')
        cy.get('input[name="username"]').type('admin123')
        cy.get('input[name="password"]').type('admin123')
        cy.contains('Sign In').click()
        cy.wait(1000)

        cy.get('#viewCustomer').click()

    })
})