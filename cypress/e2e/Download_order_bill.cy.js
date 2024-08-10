const CartIcon = require("@material-ui/icons/ShoppingCart");
describe('Customer Place Order', () => {
    it('Test Case Passed', () => {
        cy.visit('http://localhost:3000')
        cy.get('input[name="username"]').type('thathsara1')
        cy.get('input[name="password"]').type('thathsara1')
        cy.contains('Sign In').click()
        cy.wait(1000)

        cy.get('#MyOrders').click()

        cy.wait(1000)

        cy.get('#downloadBill').first().scrollIntoView()
        cy.intercept('POST', 'http://localhost:8080/api/v1/order-service/get-bill/*').as('downloadBillRequest');
        cy.wait(500)
        cy.get('#downloadBill').first().click()

        cy.wait('@downloadBillRequest').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });

    })
})