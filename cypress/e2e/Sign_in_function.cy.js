describe('Sign In Function', () => {
    it('successfully loads', () => {
        cy.visit('http://localhost:3000')

        cy.wait(1000)

        cy.get('input[name="username"]').type('thathsara1')
        cy.get('input[name="password"]').type('thathsara1')

        cy.wait(1000)

        cy.contains('Sign In').click()

    })
})