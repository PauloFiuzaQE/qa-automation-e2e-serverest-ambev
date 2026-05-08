class CadastroPage {
    visitar() {

        cy.visit(`${Cypress.env('frontUrl')}/login`);
        // Navega para o cadastro simulando o clique do usuário real
        cy.get('[data-testid="cadastrar"]').click();
    }

    preencherFormulario(nome, email, senha) {
        cy.get('[data-testid="nome"]').type(nome);
        cy.get('[data-testid="email"]').type(email);
        cy.get('[data-testid="password"]').type(senha);
    }

    submeter() {
        cy.get('[data-testid="cadastrar"]').click();
    }

    validarCadastroComSucesso() {


        cy.get('.alert', { timeout: 10000 }).should('contain', 'Cadastro realizado com sucesso');
    }
}
export default new CadastroPage();