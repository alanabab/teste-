import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import {faker} from '@faker-js/faker';
import ListaUsuarioPage from '../pages/listaUsuarios.page';

const paginaUserList = new ListaUsuarioPage();

Given('que acessei a funcionalidade de pesquisa de usuário', function () {
    cy.visit(paginaUserList.URL);
});

Given('que um usuário está cadastrado no sistema', function () {
    var novoNome = faker.person.firstName() + " Teste Pesquisa";
    var emailFaker = faker.string.alpha(12).toLowerCase() + "@oi.com";
    cy.wrap(emailFaker).as('emailUser');
    cy.wrap(novoNome).as('nomeUser');
    
    cy.newUser(novoNome, emailFaker)
    .then((response) => {
        cy.wrap(response.body.id).as('idUser');
    });
});

Given('que não existe um usuário {string} cadastrado', function (text) {
    cy.intercept('GET', 'api/v1/users', {
        statusCode: 200,
        body: []
      }).as('userList');
});

When('digitar o nome do usuário na barra de busca', function () {
    cy.get('@nomeUser').then((nome) => {
        paginaUserList.typeSearchBar(nome);
    });
});

When('digitar o email do usuário na barra de busca', function () {
    cy.get('@emailUser').then((email) => {
        paginaUserList.typeSearchBar(email);
    });
});

When('digitar {string} na barra de busca', function (text) {
    cy.wait("@userList");
    paginaUserList.typeSearchBar(text);
});

Then('acessarei os detalhes do usuário', function () {
    cy.wait(1500);
    paginaUserList.clickButtonDetalhes(); 
});

Then('visualizarei todas as informações do usuário', function () {
    cy.wait(1500);
    cy.get('@idUser').then((idUser) => {
    paginaUserList.getOutputId().should('be.visible').invoke('val').should('equal', idUser);
    }) 
    cy.get('@nomeUser').then((nome) => {
    paginaUserList.getOutputName().should('be.visible').invoke('val').should('equal', nome);
    });
    cy.get('@emailUser').then((email) => {
    paginaUserList.getOutputEmail().should('be.visible').invoke('val').should('equal', email)
    });
});

Then('visualizarei o texto {string}', function (text) {
    cy.wait(1000);
    cy.contains(text).should("exist");
});

Then('visualizarei a alternativa {string}', function (text) {
    cy.contains(text).should("exist");
    paginaUserList.clickButtonCadastreNovoUsuario();
    cy.url().should('equal', paginaUserList.URL + '/novo')
});