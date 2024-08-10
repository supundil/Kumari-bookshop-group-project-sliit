const CartIcon = require("@material-ui/icons/ShoppingCart");
describe('Customer Place Order', () => {
    it('Test Case Passed', () => {
        cy.visit('http://localhost:3000')
        cy.get('input[name="username"]').type('thathsara1')
        cy.get('input[name="password"]').type('thathsara1')
        cy.contains('Sign In').click()
        cy.wait(1000)

        cy.get('#cart').click()

        cy.get('#increaseItems').first().click()

        cy.wait(1000)

        cy.get('#decreaseItems').first().click()

        cy.wait(1000)

        cy.get('#placeOrder').click()

    })
})