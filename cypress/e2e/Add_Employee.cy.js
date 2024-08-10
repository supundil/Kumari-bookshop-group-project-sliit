describe('Add Employee', () => {
    it('Test Case Passed', () => {
        cy.visit('http://localhost:3000')
        cy.get('input[name="username"]').type('admin123')
        cy.get('input[name="password"]').type('admin123')
        cy.contains('Sign In').click()
        cy.wait(1000)

        cy.get('#addEmployee').click()

        cy.wait(1000)

        const randomId = Math.floor(Math.random() * 1000);

        cy.get('#txtEmpName').type('Thathsara Dananjaya')
        cy.get('#txtEmpAddress').type('A 156, Perth Paradise, Gurugoda, Horana.')
        cy.get('#txtEmpNIC').type('991692800V')
        cy.get('#txtEmpUsername').type('thathsara'+randomId)
        cy.get('#txtEmpPassword').type('thathsara'+randomId)

        cy.wait(1000)

        cy.intercept('POST', 'http://localhost:8080/api/v1/admin/save').as('addEmployeeRequest');
        cy.wait(500)
        cy.get('#btnAddEmp').click()

        cy.wait('@addEmployeeRequest').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });
    })
})