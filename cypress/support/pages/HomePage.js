class HomePage {
    validarAcesso() {
        cy.url().should('include', '/home');
        cy.get('h1').should('contain', 'Serverest Store');
    }

    buscarProduto(nomeProduto) {
        cy.get('[data-testid="pesquisar"]').type(nomeProduto);
        cy.get('[data-testid="botaoPesquisar"]').click();
    }

    adicionarProdutoNaLista() {
        cy.get('[data-testid="adicionarNaLista"]').first().click();
    }

    irParaOCarrinhoFinal() {
        cy.contains('Adicionar no carrinho').click();
    }
}
export default new HomePage();