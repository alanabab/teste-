import { Given, When, Then, Before } from 'cypress-cucumber-preprocessor/steps';
import {faker} from '@faker-js/faker';
import CadastroPage from '../pages/cadastro.page';
import ListaUsuarioPage from '../pages/listaUsuarios.page';

const paginaCadastro = new CadastroPage();
const paginaUserList = new ListaUsuarioPage();

Given('que acessei a funcionalidade de cadastro', function () {
    cy.viewport('macbook-16');
    cy.visit(paginaCadastro.URL);
});

Given('que existe um usuário cadastrado', function () {
    var novoNome = faker.person.firstName() + " teste";
    var emailFaker = faker.string.alpha(12).toLowerCase() + "@oi.com";
    cy.wrap(emailFaker).as('emailEmUso');
    cy.intercept("POST", "/api/v1/users").as("postUser");
    paginaCadastro.cadastrar(novoNome, emailFaker);
    paginaCadastro.clickButtonSalvar();
    cy.wait("@postUser");
    cy.contains("Usuário salvo com sucesso!").should("exist");
});

When('informar um novo nome e um novo e-mail', function () {
    var emailFaker = faker.string.alpha(12).toLowerCase() + "@oi.com";
    cy.wrap(emailFaker).as('verificar');
    var novoNome = faker.person.firstName() + " teste";
    paginaCadastro.cadastrar(novoNome, emailFaker);
});

When('confirmar a operação', function () {
    cy.intercept("POST", "/api/v1/users").as("postUser");
    paginaCadastro.clickButtonSalvar();
});

When('informar um novo e-mail', function () {
    var emailFaker = faker.string.alpha(12).toLowerCase() + "@oi.com";
    cy.wrap(emailFaker).as('verificar');
    paginaCadastro.typeEmail(emailFaker);
});

When('informar um novo nome', function () {
    var novoNome = faker.person.firstName() + " teste";
    paginaCadastro.typeName(novoNome);
    cy.wrap(novoNome).as('verificar');
});

When('informar o nome {string}', function (nome) {
    paginaCadastro.typeName(nome);
    cy.wrap(nome).as('verificar');
});

When('informar o e-mail {string}', function (email) {
    paginaCadastro.typeEmail(email);
    cy.wrap(email).as('verificar');
});

When('informar um nome com mais de 100 caracteres', function (email) {
    const name101 = faker.string.fromCharacters('abc', 101);
    paginaCadastro.typeName(name101);
    cy.wrap(name101).as('verificar');
});

When('informar um e-mail com mais de 60 caracteres', function (email) {
    const email61 = faker.string.fromCharacters('abc', 61);
    paginaCadastro.typeEmail(email61);
    cy.wrap(email61).as('verificar');
});

When('informar o mesmo e-mail', function (email) {
    cy.get('@emailEmUso').then((email) => { 
    paginaCadastro.typeEmail(email);   
    });
});

Then('o sistema deverá exibir a mensagem {string}', function (mensagem) {
    cy.wait("@postUser");
    cy.contains(mensagem).should("exist");
});

Then('o usuário será registrado na lista', function () {
    cy.get('@verificar').then((email) => {
    cy.visit(paginaUserList.URL);
    paginaUserList.typeSearchBar(email);
    cy.wait(1000);
    paginaUserList.getUserList().invoke('text').should('contain', email);
    });
});

Then('o sistema deverá exibir o alerta {string}', function (alerta) {
    cy.contains(alerta).should("exist");
});

Then('o cadastro não será concluído', function () {
    cy.contains("Usuário salvo com sucesso!").should('not.exist');
    cy.get('@verificar').then((text) => {
    cy.visit(paginaUserList.URL);
    paginaUserList.typeSearchBar(text);
    cy.wait(1000);
    cy.get('h3').should('have.text', 'Ops! Não existe nenhum usuário para ser exibido.');
    cy.get('p').should('have.text', 'Cadastre um novo usuário');
    });
});

Then('o sistema deverá exibir o erro {string}', function (errorMessage) {
    cy.wait("@postUser");
    cy.contains("Erro").should("exist");
    cy.contains(errorMessage).should("exist");
});