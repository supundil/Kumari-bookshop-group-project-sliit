describe('Admin Employee View and Update', () => {
    it('Test Case Passed', () => {
        cy.visit('http://localhost:3000')
        cy.get('input[name="username"]').type('admin123')
        cy.get('input[name="password"]').type('admin123')
        cy.contains('Sign In').click()
        cy.wait(1000)



        cy.intercept('GET', 'http://localhost:8080/api/v1/admin/getAll').as('employeesRequest');
        cy.wait(500)
        cy.get('#EmployeesView').click()

        cy.wait('@employeesRequest').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });

        cy.wait(1000)

        cy.get('#collapseOpen').click()
        cy.wait(1000)

        cy.get('#editEmployee').click()

        cy.wait(1000)
        cy.get('#employeeName').clear()
        cy.get('#employeeAddress').clear()
        cy.get('#employeeNic').clear()
        cy.get('#employeeUsername').clear()
        cy.get('#employeePassword').clear()
        cy.wait(500)

        const randomId = Math.floor(Math.random() * 1000);

        cy.get('#employeeName').type('Ravindu Lakshan')
        cy.get('#employeeAddress').type('A 156, Perth Paradise, Gurugoda, Horana.')
        cy.get('#employeeNic').type('991692800V')
        cy.get('#employeeUsername').type('ravindu'+randomId)
        cy.get('#employeePassword').type('ravindu'+randomId)

        cy.wait(1000)

        // cy.intercept('POST', 'http://localhost:8080/api/v1/admin/save').as('addEmployeeRequest');
        // cy.wait(500)
        cy.get('#editEmployeeSubmit').click()

        // cy.wait('@addEmployeeRequest').then((interception) => {
        //     expect(interception.response.statusCode).to.equal(200);
        // });
    })
})