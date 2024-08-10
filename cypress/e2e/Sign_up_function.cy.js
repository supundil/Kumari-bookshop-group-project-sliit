describe('Sign Up Function', () => {
    it('Test Case Passed', () => {
        cy.visit('http://localhost:3000')
        cy.contains("Don't have an account? SignUp now").click()

        cy.wait(1000)


        cy.get('input[name="name"]').type('Ravindu Lakshan')
        cy.get('input[name="nic"]').type('997894512v')
        cy.get('input[name="userName"]').type('ravindu1')
        cy.get('input[name="emailAddress"]').type('user1@example.com')
        cy.get('input[name="contactNo"]').type('0784512258')
        cy.get('input[name="password"]').type('ravindu1')
        cy.get('input[name="confirmPassword"]').type('ravindu1')

        cy.wait(1000)

        cy.contains('Sign UP').click()

    })
})