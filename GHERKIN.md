# 📖 Documentação de Cenários (BDD) - ServeRest

Este documento descreve os cenários de teste utilizando a sintaxe Gherkin. O foco é garantir que as regras de negócio do Front-end estejam cobertas tanto para usuários comuns quanto para administradores.

---

## 🔐 Suíte: Autenticação & Cadastro
**Como um** usuário visitante  
**Quero** me cadastrar e realizar login  
**Para que** eu possa acessar as funcionalidades da plataforma

### Cenários:
* **Cenário:** Validar CRUD de cadastro e login com sucesso
    * **Dado** que acesso a página de cadastro
    * **Quando** submeto dados válidos de um novo usuário
    * **Então** devo ser capaz de realizar o login e ser direcionado à Home.
* **Cenário:** Logout do sistema
    * **Dado** que estou autenticado na plataforma
    * **Quando** clico no botão de sair (Logout)
    * **Então** minha sessão deve ser encerrada e devo retornar à tela de login.

---

## 🛒 Usuário Padrão: Experiência de Compra
**Como um** cliente  
**Quero** pesquisar e gerenciar minha lista de compras  
**Para que** eu possa organizar meus produtos desejados

### Suíte: Pesquisa e Detalhes
* **Cenário:** Pesquisar produtos (Existentes e Inexistentes)
* **Cenário:** Visualizar detalhes do produto e adicionar à lista por diferentes fluxos.

### Suíte: Lista de Compras
* **Cenário:** Gerenciamento de itens (Adicionar, Remover e Limpar lista).
* **Cenário:** Conversão da lista para o carrinho de compras.

---

## 🛠️ Usuário ADM: Gestão da Plataforma
**Como um** Administrador  
**Quero** gerenciar usuários e o catálogo de produtos  
**Para que** o sistema se mantenha atualizado e seguro

### Suíte: Gestão de Usuários
* **Cenário:** Validar obrigatoriedade de campos no cadastro de novos usuários.
* **Cenário:** Criar novos perfis (Padrão vs ADM).
* **Cenário:** Manutenção de usuários (Listagem com colunas corretas, Edição e Exclusão).

### Suíte: Gestão de Inventário (Produtos)
* **Cenário:** CRUD completo de produtos (Cadastrar, Listar, Editar e Excluir).
* **Cenário:** Validar integridade das informações na listagem (Nome, Preço, Descrição e Qtd).

---

## ⚡ Performance & Resiliência (K6)
**Como** Engenheiro de Qualidade  
**Quero** validar o tempo de resposta das APIs sob carga  
**Para garantir** uma experiência fluida para grandes volumes de usuários

* **Cenário:** Validação de SLA na rota de produtos
    * **Dado** um cenário de carga com até 20 usuários simultâneos
    * **Quando** a API de produtos for requisitada
    * **Então** 95% das requisições (p95) devem responder em menos de 500ms
    * **E** a taxa de falha deve ser de 0%.