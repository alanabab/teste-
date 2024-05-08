import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import {faker} from '@faker-js/faker';
import ListaUsuarioPage from '../pages/listaUsuarios.page';

const paginaUserList = new ListaUsuarioPage();

Given('que acessei a página de listagem de usuários', function () {
    cy.visit(paginaUserList.URL);
});

Given('que não existe nenhum usuário cadastrado no sistema', function () {
    cy.intercept('GET', 'api/v1/users', {
        statusCode: 200,
        body: []
      }).as('userList');
});

Given('que existe um usuário cadastrado no sistema', function () {
    var novoNome = faker.person.firstName() + " Teste";
    var emailFaker = faker.string.alpha(12).toLowerCase() + "@oi.com";
    cy.wrap(emailFaker).as('emailUser');
    cy.wrap(novoNome).as('nomeUser');
    cy.newUser(novoNome, emailFaker);
});

Given('que existem 6 usuários cadastrados no sistema', function () {
    cy.intercept('GET', 'api/v1/users', {
        fixture: "userList6.json",
      }).as('userList');
});

Given('que existem 18 usuários cadastrados no sistema', function () {
    cy.intercept('GET', 'api/v1/users', {
        fixture: "userList.json",
      }).as('userList');
});

Given('que avancei para a última página da lista de usuários', function () {
    paginaUserList.clickButtonProximo();
    paginaUserList.getPaginacao().should('have.text', '2 de 3');
    cy.wait(500);
    paginaUserList.clickButtonProximo();
    paginaUserList.getPaginacao().should('have.text', '3 de 3'); 
});

When('verificar a lista de usuários', function () {
    cy.wait('@userList');
});

When('pesquisar pelo email do usuário', function () {
    cy.get('@emailUser').then((email) => {
    paginaUserList.typeSearchBar(email);
    });
});

When('verificar a paginação {string}', function (text) {
    cy.wait('@userList');
    paginaUserList.getPaginacao().should('have.text', text);
});

Then('visualizarei o aviso {string}', function (text) {
    cy.wait(1500);
    cy.contains(text).should("exist");
});

Then('visualizarei a opção {string}', function (text) {
    cy.contains(text).should("exist");
    paginaUserList.clickButtonCadastreNovoUsuario();
    cy.url().should('equal', paginaUserList.URL + '/novo')
});

Then('o usuário cadastrado deverá estar na lista', function () {
    cy.wait(1500);
    cy.get('@emailUser').then((email) => {
    paginaUserList.getUserList().invoke('text').should('contain', email);
    });
    cy.get('@nomeUser').then((nome) => {
    paginaUserList.getUserList().invoke('text').should('contain', nome);
    });
});

Then('visualizarei os detalhes do usuário', function () {
    paginaUserList.clickButtonDetalhes(); 
    cy.wait(2000);
    paginaUserList.getOutputId().should('be.visible'); 
    cy.get('@nomeUser').then((nome) => {
    paginaUserList.getOutputName().should('be.visible').invoke('val').should('equal', nome);
    });
    cy.get('@emailUser').then((email) => {
    paginaUserList.getOutputEmail().should('be.visible').invoke('val').should('equal', email)
    });
});

Then('os 6 usuários cadastrados deverão estar na lista', function () {
   cy.wait(1500);
    paginaUserList.getUserList().invoke('text').should('contain', "dameon@gmail.com");
    paginaUserList.getUserList().invoke('text').should('contain', "anieharvey@gmail.com");
    paginaUserList.getUserList().invoke('text').should('contain', "lambert60@gmail.com");
    paginaUserList.getUserList().invoke('text').should('contain', "naomi9@yahoo.com");
    paginaUserList.getUserList().invoke('text').should('contain', "olson91@hotmail.com");
    paginaUserList.getUserList().invoke('text').should('contain', "wanda66@yahoo.com");
});

Then('o botão "Próximo" deve estar desativado', function () {
    paginaUserList.getButtonProximo().should('be.disabled');
});

Then('o botão "Anterior" deve estar desativado', function () {
    paginaUserList.getButtonVoltar().should('be.disabled');
});

Then('avançarei para a página 2', function () {
    paginaUserList.clickButtonProximo();
    paginaUserList.getPaginacao().should('have.text', '2 de 3');
});

Then('avançarei para a página 3', function () {
    paginaUserList.clickButtonProximo();
    paginaUserList.getPaginacao().should('have.text', '3 de 3');
    cy.wait(500);
    paginaUserList.getButtonProximo().should('be.disabled');
});

Then('voltarei para a página 2', function () {
    paginaUserList.clickButtonVoltar();
    paginaUserList.getPaginacao().should('have.text', '2 de 3');
});

Then('voltarei para a página 1', function () {
    paginaUserList.clickButtonVoltar();
    paginaUserList.getPaginacao().should('have.text', '1 de 3');
    cy.wait(500);
    paginaUserList.getButtonVoltar().should('be.disabled');
});