import {
  Given,
  When,
  Then,
} from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';
import CadastroPage from '../pages/cadastro.page';
const paginaCadastro = new CadastroPage();

Given('que acessei a funcionalidade de cadastro', function () {
  cy.visit(paginaCadastro.URL);
});

Given('que existe um usuário cadastrado', function () {
  const emailNewUser = faker.string.alpha(12).toLowerCase() + "@qa.com";
  cy.wrap(emailNewUser).as('emailEmUso');
  cy.newUser('Alana', emailNewUser, 'ABCDEF');
});

When('informar o nome {string}', function (nome) {
  paginaCadastro.typeNome(nome);
  cy.wrap(nome).as('nomeUser');
});

When('informar um e-mail', function () {
  const email = faker.string.alpha(12).toLowerCase() + "@qa.com";
  paginaCadastro.typeEmail(email);
  cy.wrap(email).as('emailUser');
});

When('informar uma senha', function () {
  paginaCadastro.typeSenha('ABCDEF');
});

When('informar a confirmação de senha', function () {
  paginaCadastro.typeConfirmarSenha('ABCDEF');
});

When('confirmar a operação', function () {
  cy.intercept("POST", "api/users").as('postUser');
  cy.intercept("POST", "api/auth/login").as('authUser');
  paginaCadastro.clickButtonCadastrar();
});

When('informar um nome', function () {
  const nome = faker.person.fullName();
  paginaCadastro.typeNome(nome);
  cy.wrap(nome).as('nomeUser');
});

When('informar a confirmação de senha incorretamente', function () {
  paginaCadastro.typeConfirmarSenha('UVWXYZ');
});

When('informar uma senha {string} e confirma-la', function (string) {
  paginaCadastro.typeSenha(string);
  paginaCadastro.typeConfirmarSenha(string);
});

When('informar um e-mail fora do padrão {string}', function (email) {
  paginaCadastro.typeEmail(email);
});

When('informar o mesmo email usado pelo outro usuário', function () {
  cy.get('@emailEmUso').then((email) => { 
    paginaCadastro.typeEmail(email);   
    });
});

When('informar nome, email, senha e confirmar operação corretamente', function () {
  const nome = faker.person.fullName();
  cy.wrap(nome).as('nomeUser');
  const email = faker.string.alpha(12).toLowerCase() + "@qa.com";
  cy.wrap(email).as('emailUser');

  cy.intercept("POST", "api/users").as('postUser');
  cy.intercept("POST", "api/auth/login").as('authUser');

  paginaCadastro.cadastrar(nome, email, 'ABCDEF');
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
  cy.get('@authUser').should('not.exist');
  cy.contains('Cadastro realizado!').should('not.exist');  
});

Then('visualizarei os alertas de campos obrigatórios', function () {
  cy.get(paginaCadastro.alerta).should('be.visible');
  cy.get(paginaCadastro.alerta).eq(0).invoke('text').should('equal', "Informe o nome");
  cy.get(paginaCadastro.alerta).eq(1).invoke('text').should('equal', "Informe o e-mail");
  cy.get(paginaCadastro.alerta).eq(2).invoke('text').should('equal', "Informe a senha");
  cy.get(paginaCadastro.alerta).eq(3).invoke('text').should('equal', "Informe a senha");
});

Then('visualizarei o alerta de quantidade de caracteres {string}', function (text) {
  cy.get(paginaCadastro.alerta).should('be.visible');
  cy.get(paginaCadastro.alerta).eq(0).invoke('text').should('equal', text);
  cy.get(paginaCadastro.alerta).eq(1).invoke('text').should('equal', text);
});

Then('visualizarei a mensagem de erro {string}', function (text) {
  cy.get(paginaCadastro.janela).should('be.visible');
  cy.get(paginaCadastro.janela).should('contain', 'Falha no cadastro.');
  cy.get(paginaCadastro.janela).should('contain', text);
});

Then('a operação não será concluída', function () {
  cy.wait('@postUser').then((intercept) => {
    expect(intercept.response.body.message[0]).to.equal("email must be an email");
    expect(intercept.response.statusCode).to.equal(400);
  });
  cy.get('@authUser').should('not.exist');
  cy.contains('Cadastro realizado!').should('not.exist');  
});

Then('o registro não será concluído', function () {
  cy.wait('@postUser').then((intercept) => {
    expect(intercept.response.body.message).to.equal("Email already in use");
    expect(intercept.response.statusCode).to.equal(409);
  });
  cy.get('@authUser').should('not.exist');
  cy.contains('Cadastro realizado!').should('not.exist');  
});