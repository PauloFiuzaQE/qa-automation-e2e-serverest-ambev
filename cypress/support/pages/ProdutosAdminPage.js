class ProdutosAdminPage {
    cadastrar(nome, preco, descricao, quantidade) {
        cy.get('[data-testid="nome"]').type(nome);
        cy.get('[data-testid="preco"]').type(preco);
        cy.get('[data-testid="descricao"]').type(descricao);
        cy.get('[data-testid="quantity"]').type(quantidade);
        cy.get('[data-testid="cadastarProdutos"]').click();
    }
}
export default new ProdutosAdminPage();