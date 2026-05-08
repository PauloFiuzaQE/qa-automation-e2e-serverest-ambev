import { faker } from '@faker-js/faker';
import UsuariosPage from '../../support/pages/UsuariosPage';

describe('Usuário ADM - Gestão', () => {

    let emailAdm;
    const senhaAdm = 'teste123';

    beforeEach(() => {
        emailAdm = faker.internet.email();

        cy.request('POST', '/usuarios', {
            nome: "Admin Test",
            email: emailAdm,
            password: senhaAdm,
            administrador: "true"
        }).then((res) => {
            expect(res.status).to.eq(201);
            cy.login(emailAdm, senhaAdm);
        });
    });

    it('CT - Novo usuário ADM via Interface e redirecionamento para lista', () => {
        const nomeNovoUsuario = 'Novo ADM Interface';

        cy.get('[data-testid="cadastrar-usuarios"]').click();
        UsuariosPage.cadastrar(nomeNovoUsuario, faker.internet.email(), '1234', true);
        cy.get('h1').should('contain', 'Lista dos usuários');
        cy.contains('td', nomeNovoUsuario).should('be.visible');
    });

    it('CT - Listar usuários e validar visibilidade dos botões de ação', () => {
        cy.get('[data-testid="listar-usuarios"]').click();
        cy.get('table').should('be.visible');
        cy.get('button.btn-info').first().should('be.visible');
        cy.get('button.btn-danger').first().should('be.visible');
    });
});