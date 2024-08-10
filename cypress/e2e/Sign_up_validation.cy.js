describe('Sign Up Validation', () => {
    it('successfully loads', () => {
        cy.visit('http://localhost:3000')
        cy.contains("Don't have an account? SignUp now").click()

        cy.wait(1000)

        cy.get('input[name="name"]').type('User1')
        cy.get('input[name="nic"]').type('9994512v')
        cy.get('input[name="userName"]').type('user1')
        cy.get('input[name="emailAddress"]').type('user1@exampleemail')
        cy.get('input[name="contactNo"]').type('07845158')
        cy.get('input[name="password"]').type('123')
        cy.get('input[name="confirmPassword"]').type('ravindu1')

        cy.wait(1000)

        cy.contains('Sign UP').click()

    })
})