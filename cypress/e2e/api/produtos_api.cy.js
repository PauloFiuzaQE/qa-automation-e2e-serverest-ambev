import { faker } from '@faker-js/faker';

describe('API - ServeRest - Validação de Contratos, CRUD e Regras de Negócio', () => {

    const adminUser = {
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: 'true'
    };

    let tokenValido;
    let idProdutoGerado;

    it('Cenário 1: E2E Completo e Schema - Cadastrar Admin, Logar e Criar Produto', () => {
        cy.request('POST', '/usuarios', adminUser).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.all.keys('message', '_id');
        });

        cy.request({
            method: 'POST',
            url: '/login',
            body: { email: adminUser.email, password: adminUser.password }
        }).then((responseLogin) => {
            expect(responseLogin.status).to.eq(200);
            expect(responseLogin.body.authorization).to.include('Bearer ');
            tokenValido = responseLogin.body.authorization;

            const productData = {
                nome: `Cerveja Artesanal QA ${faker.string.uuid()}`,
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
                idProdutoGerado = responseProduto.body._id;
            });
        });
    });

    it('Cenário 2: Regra de Negócio - Bloquear cadastro com E-mail já existente', () => {
        cy.request({
            method: 'POST',
            url: '/usuarios',
            body: adminUser,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq('Este email já está sendo usado');
        });
    });

    it('Cenário 3: Regra de Segurança - Bloquear cadastro de produto por usuário comum (403)', () => {
        const commomUser = {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            administrador: 'false'
        };

        cy.request('POST', '/usuarios', commomUser);
        cy.request('POST', '/login', { email: commomUser.email, password: commomUser.password })
            .then((responseLogin) => {
                cy.request({
                    method: 'POST',
                    url: '/produtos',
                    headers: { authorization: responseLogin.body.authorization },
                    body: { nome: "Produto Ilegal", preco: 50, descricao: "Tentativa", quantidade: 10 },
                    failOnStatusCode: false
                }).then((responseProduto) => {
                    expect(responseProduto.status).to.eq(403);
                });
            });
    });

    it('Cenário 4: Validar Listagem e Edição de Produto (GET e PUT)', () => {
        // Valida GET
        cy.request('GET', '/produtos').then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.produtos).to.be.an('array');
        });

        cy.request({
            method: 'PUT',
            url: `/produtos/${idProdutoGerado}`,
            headers: { authorization: tokenValido },
            body: {
                nome: `Produto Editado - Ambev QA ${faker.string.uuid()}`,
                preco: 350,
                descricao: "Descrição atualizada via automação",
                quantidade: 50
            }
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.message).to.eq('Registro alterado com sucesso');
        });
    });

    it('Cenário 5: Limpeza de Dados - Excluir Produto (DELETE)', () => {
        cy.request({
            method: 'DELETE',
            url: `/produtos/${idProdutoGerado}`,
            headers: { authorization: tokenValido }
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.message).to.eq('Registro excluído com sucesso');
        });
    });
});