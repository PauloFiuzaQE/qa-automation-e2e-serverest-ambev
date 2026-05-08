import { faker } from '@faker-js/faker';
import CadastroPage from '../../support/pages/CadastroPage';
import LoginPage from '../../support/pages/LoginPage';
import HomePage from '../../support/pages/HomePage';

describe('Frontend - ServeRest - Fluxos E2E de Cliente', () => {

    it('Cenário 1: Deve realizar o cadastro de um novo cliente com sucesso via Interface', () => {
        const novoCliente = {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            senha: faker.internet.password()
        };

        CadastroPage.visitar();
        CadastroPage.preencherFormulario(novoCliente.nome, novoCliente.email, novoCliente.senha);
        CadastroPage.submeter();

        CadastroPage.validarCadastroComSucesso();
        HomePage.validarAcesso();
    });

    it('Cenário 2: Deve realizar login com as credenciais cadastradas', () => {

        cy.criarClienteApi().then((clienteCriado) => {
            LoginPage.visitar();
            LoginPage.preencherLogin(clienteCriado.email, clienteCriado.password);
            LoginPage.submeter();

            HomePage.validarAcesso();
            cy.window().its('localStorage.serverest/userToken').should('exist');
        });
    });

    it('Cenário 3: Deve buscar um produto e validar a tela final do carrinho', () => {

        cy.criarClienteApi().then((clienteCriado) => {
            LoginPage.visitar();
            LoginPage.preencherLogin(clienteCriado.email, clienteCriado.password);
            LoginPage.submeter();

            HomePage.buscarProduto('Logitech');
            HomePage.adicionarProdutoNaLista();
            HomePage.irParaOCarrinhoFinal();

            cy.url().should('include', '/carrinho');
            cy.get('h1').should('contain', 'Em construção aguarde');
        });
    });
});