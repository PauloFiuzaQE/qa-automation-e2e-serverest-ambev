class UsuariosPage {
    cadastrar(nome, email, senha, isAdmin = false) {
        cy.get('[data-testid="nome"]').type(nome);
        cy.get('[data-testid="email"]').type(email);
        cy.get('[data-testid="password"]').type(senha);
        if (isAdmin) cy.get('[data-testid="checkbox"]').check();
        cy.get('[data-testid="cadastrarUsuario"]').click();
    }

    excluirPrimeiroUsuario() {
        cy.get('.btn-danger').first().click();
    }
}
export default new UsuariosPage();