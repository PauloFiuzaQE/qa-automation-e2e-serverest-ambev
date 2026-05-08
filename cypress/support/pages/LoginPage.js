class LoginPage {
    visitar() {

        cy.visit(`${Cypress.env('frontUrl')}/login`);
    }

    preencherLogin(email, senha) {
        cy.get('[data-testid="email"]').type(email);
        cy.get('[data-testid="senha"]').type(senha);
    }

    submeter() {
        cy.get('[data-testid="entrar"]').click();
    }
}
export default new LoginPage();