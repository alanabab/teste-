import { Given, When, Then, Before } from 'cypress-cucumber-preprocessor/steps';
import {faker} from '@faker-js/faker';
import CadastroPage from '../pages/cadastro.page';
import ListaUsuarioPage from '../pages/listaUsuarios.page';

const paginaCadastro = new CadastroPage();
const paginaUserList = new ListaUsuarioPage();
const name = 'Nome de Usuario';
const email = faker.string.alpha(12).toLowerCase() + "@oi.com";

Given('que acessei a funcionalidade de cadastro', function () {
    cy.viewport('macbook-16');
    cy.visit(paginaCadastro.URL);
});

When('informar um novo nome e um novo e-mail', function () {
    paginaCadastro.cadastrar(name, email);
});

When('confirmar a operação', function () {
    cy.intercept("POST", "/api/v1/users").as("postUser");
    paginaCadastro.clickButtonSalvar();
});

Then('o sistema deverá exibir a mensagem {string}', function (mensagem) {
    cy.wait("@postUser");
    cy.contains("Usuário salvo com sucesso!").should("exist")
});

Then('o usuário será registrado na lista', function () {
    cy.visit(paginaUserList.URL);
    paginaUserList.typeSearchBar(email);
    paginaUserList.getUserList().invoke('text').should('contain', email)
});
