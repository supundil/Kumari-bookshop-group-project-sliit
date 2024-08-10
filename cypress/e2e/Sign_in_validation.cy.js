describe('Sign In Function Validation', () => {
    it('Test Case Passed', () => {
        cy.visit('http://localhost:3000')

        cy.wait(1000)

        cy.get('input[name="username"]').type('123')
        cy.get('input[name="password"]').type('sfsfweg')

        cy.wait(1000)

        cy.contains('Sign In').click()

    })
})