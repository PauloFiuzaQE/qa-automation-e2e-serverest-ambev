import HomePage from '../../support/pages/HomePage';

describe('Usuário Padrão - Pesquisa e Lista', () => {
    beforeEach(() => {
        cy.criarClienteApi().then((user) => {
            cy.login(user.email, user.password);
        });
    });

    it('CT - Pesquisa Produtos inexistentes', () => {
        HomePage.buscarProduto('Produto Fantasma 123');
        cy.contains('Nenhum produto foi encontrado').should('be.visible');
    });

    it('CT - Limpar lista de compras', () => {
        HomePage.buscarProduto('Logitech');
        HomePage.adicionarProdutoNaLista();
        cy.get('[data-testid="limparLista"]').click();
        cy.contains('Seu carrinho está vazio').should('be.visible');
    });
});