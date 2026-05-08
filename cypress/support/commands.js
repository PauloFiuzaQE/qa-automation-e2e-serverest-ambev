import { faker } from '@faker-js/faker';

// --- COMANDO 1: Prepara o Banco de Dados via API ---
Cypress.Commands.add('criarClienteApi', () => {
    const cliente = {
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: 'false'
    };

    cy.request({
        method: 'POST',
        url: '/usuarios',
        body: cliente
    }).then((response) => {
        expect(response.status).to.eq(201);
    });


    return cy.wrap(cliente);
});



Cypress.Commands.add('login', (email, senha) => {
    cy.visit(`${Cypress.env('frontUrl')}/login`);
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="senha"]').type(senha);
    cy.get('[data-testid="entrar"]').click();
});