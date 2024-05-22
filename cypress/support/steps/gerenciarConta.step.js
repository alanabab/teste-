import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import CadastroPage from "../pages/cadastro.page";
import AccountPage from "../pages/account.page";
import LoginPage from "../pages/login.page";
const paginaCadastro = new CadastroPage();
const paginaConta = new AccountPage();
const paginaLogin = new LoginPage();


Given('que estou autenticado no sistema', function () {
    const email = faker.string.alpha(12) + "@qa.com";
    cy.wrap(email).as('emailUser');

    cy.visit(paginaCadastro.URL);
    cy.intercept("POST", "api/users").as('postUser');
    cy.intercept("POST", "api/auth/login").as('authUser');

    paginaCadastro.cadastrar('Alana', email, 'ABCDEF');

    cy.wait('@postUser').then((intercept) => {
        idUser = intercept.response.body.id;
        cy.wrap(idUser).as('idUser');
        cy.wrap(intercept.response.body.type).as('tipoUser');
    });
});

Given('que acessei a página de Perfil', function () {
    paginaConta.clickButtonPerfil();
});

When('acessar a opção Logout', function () {
    paginaConta.clickButtonLogout();
});

When('tentar acessar a funcionalidade de Gerenciamento de Conta', function () {
    cy.visit(paginaConta.URL);
});

When('acessar a opção Gerenciar Conta', function () {
    paginaConta.clickButtonGerenciar();
});

When('informar um novo nome, uma nova senha e confirmar a operação', function () {    
    cy.get('@idUser').then((id) => {
        cy.intercept("PUT", "api/users/" + id).as('updateUser');
    });
    paginaConta.atualizar('Nome Atualizado', '123456');
});

When('informar um novo nome', function () {
    paginaConta.limparNome();
    paginaConta.typeNome('Nome Atualizado');
});

When('confirmar a operação', function () {
    cy.get('@idUser').then((id) => {
        cy.intercept("PUT", "api/users/" + id).as('updateUser');
    });
    paginaConta.clickButtonSalvar();
});

When('habilitar a alteração de senha', function () {
    paginaConta.clickButtonAlterarSenha();
});

When('informar uma senha {string} e confirmá-la', function (senha) {
    paginaConta.typeSenha(senha);
    paginaConta.typeConfirmarSenha(senha);
});

When('informar uma senha {string} diferente da confirmação {string}', function (senha, confirmação) {
    paginaConta.typeSenha(senha);
    paginaConta.typeConfirmarSenha(confirmação);
});

Then('serei redirecionado para a página de Login automaticamente', function () {
    cy.url().should('equal', paginaLogin.URL);
    cy.contains('Login');
    cy.contains('Entre com suas credenciais');
});

Then('visualizarei a mensagem de sucesso {string}', function (text) {
    cy.get(paginaConta.janela).should('be.visible');
    cy.get(paginaConta.janela).should('contain', 'Sucesso');
    cy.get(paginaConta.janela).should('contain', text);
});

Then('verificarei meus dados alterados na tela', function () {
    paginaConta.clickButtonOk();
    cy.get(paginaConta.inputNome).invoke('val').should('equal', 'Nome Atualizado');
    cy.wait('@updateUser').then((intercept) => {
        expect(intercept.response.statusCode).to.equal(200);
        expect(intercept.response.body.name).to.equal('Nome Atualizado');
    });
});

Then('o campo e-mail deve estar desabilitado a edição', function () {
    paginaConta.getEmail().should('be.disabled');
});

Then('o campo tipo de usuário deve estar desabilitado a edição', function () {
    paginaConta.getTipoUsuario().should('be.disabled');
});

Then('visualizarei o alerta {string}', function (text) {
    cy.get(paginaConta.alerta).should('be.visible');
    cy.get(paginaConta.alerta).invoke('text').should('equal', text);
});

Then('a operação não será concluída', function () {
    cy.get('@updateUser').should('not.exist');
    cy.contains('Informações atualizadas!').should('not.exist');  
});

Then('visualizarei os alertas {string}', function (text) {
    cy.get(paginaConta.alerta).should('be.visible');
    cy.get(paginaConta.alerta).eq(0).invoke('text').should('contain', text);
    cy.get(paginaConta.alerta).eq(1).invoke('text').should('contain', text);
});

Then('visualizarei a mensagem de erro {string}', function (text) {
    cy.get(paginaConta.janela).should('be.visible');
    cy.get(paginaConta.janela).should('contain', 'Ocorreu um erro');
    cy.get(paginaConta.janela).should('contain', text);
});

Then('visualizarei meu nome, e-mail e tipo de usuário', function () {
    paginaConta.getNome().invoke('val').should('equal', 'Alana');
    
    cy.get('@emailUser').then((email) => {
        paginaConta.getEmail().invoke('val').should('equal', email);
    });

    cy.get('@tipoUser').then((type) => {
        paginaConta.getTipoUsuario().invoke('val').should('equal', `${type}`);
    });   
});