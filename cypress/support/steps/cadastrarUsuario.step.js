import {
  Given,
  When,
  Then,
  Before,
  After,
} from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';
import CadastroPage from '../pages/cadastro.page';
const paginaCadastro = new CadastroPage();

Given('que acessei a funcionalidade de cadastro', function () {
  cy.visit(paginaCadastro.URL);
});

When('informar um nome {string}', function (nome) {
  paginaCadastro.typeNome(nome);
  cy.wrap(nome).as('nomeUser');
});

When('informar um e-mail', function () {
  const email = faker.string.alpha(12).toLowerCase() + "@qa.com";
  paginaCadastro.typeEmail(email);
  cy.wrap(email).as('emailUser');
});

When('informar uma senha', function () {
  var senha = faker.internet.password(10);
  paginaCadastro.typeSenha(senha);
  cy.wrap(senha).as('senhaUser');
});

When('informar a confirmação de senha', function () {
  cy.get('@senhaUser').then( (senha) => {
    paginaCadastro.typeConfirmarSenha(senha);
  })
});

When('confirmar a operação', function () {
  cy.intercept("POST", "api/users").as('postUser');
  cy.intercept("POST", "api/auth/login").as('authUser');
  paginaCadastro.clickButtonCadastrar();
});

Then('visualizarei a mensagem de sucesso {string}', function (text) {
  cy.get(paginaCadastro.janela).should('be.visible');
  cy.get(paginaCadastro.janela).should('contain', 'Sucesso');
  cy.get(paginaCadastro.janela).should('contain', text);
});

Then('o usuário será cadastrado como tipo comum', function () {
  cy.wait('@postUser').then((intercept) => {
    dados = intercept.response.body;
    cy.wrap(dados.name).should('equal', this.nomeUser);
    cy.wrap(dados.email).should('equal', this.emailUser);
    expect(dados.type).to.deep.equal(0);
    expect(dados).to.have.property('id');
    expect(intercept.response.statusCode).to.equal(201);
  });

  cy.wait('@authUser').then((intercept) => {
    expect(intercept.response.body).to.have.property('accessToken');
    expect(intercept.response.statusCode).to.equal(200);
  });
});

Then('visualizarei o alerta {string}', function (text) {
  cy.get(paginaCadastro.alerta).should('be.visible');
  cy.get(paginaCadastro.alerta).invoke('text').should('equal', text);
});

Then('o cadastro não será concluído', function () {
  cy.get('@postUser').should('not.exist');
});