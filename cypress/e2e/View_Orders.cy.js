describe('Manage Orders', () => {
    it('Test Case Passed', () => {
        cy.visit('http://localhost:3000')
        cy.get('input[name="username"]').type('admin123')
        cy.get('input[name="password"]').type('admin123')
        cy.contains('Sign In').click()
        cy.wait(1000)

        cy.get('#orders').click()

        cy.wait(1000)

        //Confirm Order
        cy.get('#submittedOrders').click()

        cy.intercept('POST', 'http://localhost:8080/api/v1/order-service/confirm-customer-order/*').as('confirmRequest');
        cy.wait(500)
        cy.get('#confirmBtn').first().click()

        cy.wait('@confirmRequest').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });

        cy.wait(2000)

        //Confirm Payment
        cy.get('#confirmedOrders').click()

        cy.intercept('POST', 'http://localhost:8080/api/v1/order-service/paid-customer-order/*').as('confirmPaymentRequest');
        cy.wait(500)
        cy.get('#confirmPaymentBtn').first().click()

        cy.wait('@confirmPaymentRequest').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });

        cy.wait(2000)

        //View Paid Orders
        cy.intercept('GET', 'http://localhost:8080/api/v1/order-service/get-all-paid-orders').as('paidRequest');
        cy.wait(500)
        cy.get('#paidOrders').click()

        cy.wait('@paidRequest').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });

        cy.wait(2000)

        //Reject Order
        cy.get('#submittedOrders').click()

        cy.intercept('POST', 'http://localhost:8080/api/v1/order-service/reject-customer-order/*').as('rejectRequest');
        cy.wait(500)
        cy.get('#rejectBtn').first().click()

        cy.wait('@rejectRequest').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });

        cy.wait(2000)

        //View Rejected Orders
        cy.intercept('GET', 'http://localhost:8080/api/v1/order-service/get-all-rejected-orders').as('rejectedRequest');
        cy.wait(500)
        cy.get('#rejectedOrders').click()

        cy.wait('@rejectedRequest').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });

    })
})