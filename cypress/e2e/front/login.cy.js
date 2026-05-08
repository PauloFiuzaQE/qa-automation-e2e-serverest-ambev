import LoginPage from '../../support/pages/LoginPage';
import { faker } from '@faker-js/faker';

describe('Suíte Formulário Login', () => {
    it('CT - Validar CRUD de login e Logout', () => {
        cy.criarClienteApi().then((user) => {
            LoginPage.visitar();
            LoginPage.preencherLogin(user.email, user.password);
            LoginPage.submeter();
            cy.url().should('include', '/home');

            // Logout
            cy.get('[data-testid="logout"]').click();
            cy.url().should('include', '/login');
        });
    });
});