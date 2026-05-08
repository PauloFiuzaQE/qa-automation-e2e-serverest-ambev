import { faker } from '@faker-js/faker';

describe('API - ServeRest - Validação de Contratos e Regras de Negócio', () => {

    // Massa de dados base para o caminho feliz
    const adminUser = {
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: 'true'
    };

    it('Cenário 1: E2E Completo e Schema - Cadastrar Admin, Logar e Criar Produto', () => {
        // 1. Cadastra Usuário Admin e Valida Contrato
        cy.request('POST', '/usuarios', adminUser).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.all.keys('message', '_id');
            expect(response.body.message).to.be.a('string').and.eq('Cadastro realizado com sucesso');
            expect(response.body._id).to.be.a('string');
        });

        // 2. Realiza Login, Valida Contrato e Captura Token
        cy.request({
            method: 'POST',
            url: '/login',
            body: { email: adminUser.email, password: adminUser.password }
        }).then((responseLogin) => {
            expect(responseLogin.status).to.eq(200);
            expect(responseLogin.body).to.have.all.keys('message', 'authorization');
            expect(responseLogin.body.authorization).to.include('Bearer ');

            // Captura o token e guarda na variável
            const tokenValido = responseLogin.body.authorization;

            // 3. Cadastra Produto usando o Token
            const productData = {
                nome: faker.commerce.productName() + ' ' + faker.string.uuid(),
                preco: faker.number.int({ min: 10, max: 200 }),
                descricao: faker.commerce.productDescription(),
                quantidade: faker.number.int({ min: 1, max: 100 })
            };

            cy.request({
                method: 'POST',
                url: '/produtos',
                headers: { authorization: tokenValido },
                body: productData
            }).then((responseProduto) => {
                expect(responseProduto.status).to.eq(201);
                expect(responseProduto.body).to.have.property('message', 'Cadastro realizado com sucesso');
            });
        });
    });

    it('Cenário 2: Regra de Negócio - Bloquear cadastro de usuário com E-mail já existente', () => {
        cy.request({
            method: 'POST',
            url: '/usuarios',
            body: adminUser,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.all.keys('message');
            expect(response.body.message).to.eq('Este email já está sendo usado');
        });
    });

    it('Cenário 3: Regra de Segurança - Bloquear cadastro de produto por usuário comum (Não-Admin)', () => {
        const commomUser = {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            administrador: 'false'
        };

        cy.request('POST', '/usuarios', commomUser);

        cy.request('POST', '/login', { email: commomUser.email, password: commomUser.password })
            .then((responseLogin) => {
                const tokenComum = responseLogin.body.authorization;

                cy.request({
                    method: 'POST',
                    url: '/produtos',
                    headers: { authorization: tokenComum },
                    body: {
                        nome: "Produto Ilegal",
                        preco: 50,
                        descricao: "Tentativa de fraude",
                        quantidade: 10
                    },
                    failOnStatusCode: false
                }).then((responseProduto) => {
                    expect(responseProduto.status).to.eq(403);
                    expect(responseProduto.body.message).to.eq('Rota exclusiva para administradores');
                });
            });
    });

});