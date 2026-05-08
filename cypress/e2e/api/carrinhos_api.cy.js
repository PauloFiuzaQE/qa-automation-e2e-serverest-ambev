import { faker } from '@faker-js/faker';

describe('API - ServeRest - Gestão de Carrinhos e Fluxo de Compras', () => {
    let token;
    let idProduto;

    before(() => {
        // Massa de dados para o usuário
        const email = faker.internet.email();
        const password = faker.internet.password();

        // Cadastra Usuário
        cy.request('POST', '/usuarios', {
            nome: faker.person.fullName(),
            email: email,
            password: password,
            administrador: 'true'
        });

        // Login e captura o token
        cy.request('POST', '/login', { email, password }).then((resLogin) => {
            token = resLogin.body.authorization;

            // Cadastra Produto para usar no carrinho
            cy.request({
                method: 'POST',
                url: '/produtos',
                headers: { authorization: token },
                body: {
                    nome: `Produto Carrinho QA ${faker.string.uuid()}`,
                    preco: 150,
                    descricao: "Item para teste do fluxo de compras",
                    quantidade: 100
                }
            }).then((resProd) => {
                idProduto = resProd.body._id; // Salva o ID do produto gerado
            });
        });
    });

    it('Cenário 1: Cadastrar um carrinho com sucesso (POST)', () => {
        cy.request({
            method: 'POST',
            url: '/carrinhos',
            headers: { authorization: token },
            body: {
                produtos: [
                    {
                        idProduto: idProduto,
                        quantidade: 2
                    }
                ]
            }
        }).then((res) => {
            expect(res.status).to.eq(201);
            expect(res.body.message).to.eq('Cadastro realizado com sucesso');
        });
    });

    it('Cenário 2: Consultar carrinhos cadastrados na base (GET)', () => {
        cy.request('GET', '/carrinhos').then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property('quantidade');
            expect(res.body.carrinhos).to.be.an('array');
        });
    });

    it('Cenário 3: Regra de Negócio - Bloquear mais de um carrinho por usuário', () => {
        cy.request({
            method: 'POST',
            url: '/carrinhos',
            headers: { authorization: token },
            body: {
                produtos: [{ idProduto: idProduto, quantidade: 1 }]
            },
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.message).to.eq('Não é permitido ter mais de 1 carrinho');
        });
    });

    it('Cenário 4: Concluir compra e limpar o carrinho (DELETE)', () => {
        cy.request({
            method: 'DELETE',
            url: '/carrinhos/concluir-compra',
            headers: { authorization: token }
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.message).to.eq('Registro excluído com sucesso');
        });
    });
});