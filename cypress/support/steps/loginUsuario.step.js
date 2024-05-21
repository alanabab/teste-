import {
  Given,
  When,
  Then,
} from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';
import LoginPage from '../pages/login.page';
const paginaLogin = new LoginPage();
frontBaseUrl = 'https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/'
  

Given('que estou cadastrado no sistema', function () {
  const email = faker.string.alpha(12) + "@qa.com";
  cy.wrap(email).as('emailUser');
  cy.newUser('Alana', email, 'ABCDEF');
});

Given('que acessei a funcionalidade de login', function () {
  cy.visit(paginaLogin.URL);
});

When('informar e-mail, senha e confirmar operação', function () {
  cy.intercept("POST", "api/auth/login").as('authUser');
  cy.get('@emailUser').then((email) => { 
    paginaLogin.login(email, 'ABCDEF')   
  });
});

When('informar a senha', function () {
  paginaLogin.typeSenha('ABCDEF');
});

When('informar o e-mail', function () {
  cy.get('@emailUser').then((email) => { 
    paginaLogin.typeEmail(email);   
  });
});

When('confirmar a operação', function () {
  cy.intercept("POST", "api/auth/login").as('authUser');
  paginaLogin.clickButtonLogin();
});

When('informar o e-mail incorretamente', function () {
  const emailFake = faker.string.alpha(12) + "@nãoexiste.com";
  paginaLogin.typeEmail(emailFake);
});

When('informar a senha incorretamente', function () {
  paginaLogin.typeSenha('UVWXYZ');
});

Then('estarei autenticado no sistema', function () {
  cy.wait('@authUser').then( (intercept) => {
    expect(intercept.response.body).to.have.property('accessToken');
    expect(intercept.response.statusCode).to.equal(200);
  });
  cy.url().should('equal', frontBaseUrl);
});

Then('visualizarei o alerta {string}', function (text) {
  cy.get(paginaLogin.alerta).should('be.visible');
  cy.get(paginaLogin.alerta).invoke('text').should('equal', text);
});

Then('a operação não será concluída', function () {
  cy.get('@authUser').should('not.exist');
  cy.url().should('equal', paginaLogin.URL);
});

Then('visualizarei os alertas de campos obrigatórios', function () {
  cy.get(paginaLogin.alerta).should('be.visible');
  cy.get(paginaLogin.alerta).eq(0).invoke('text').should('equal', 'Informe o e-mail');
  cy.get(paginaLogin.alerta).eq(1).invoke('text').should('equal', 'Informe a senha');
});

Then('visualizarei a mensagem de erro {string}', function (text) {
  cy.get(paginaLogin.janela).should('be.visible');
  cy.get(paginaLogin.janela).should('contain', 'Falha ao autenticar');
  cy.get(paginaLogin.janela).should('contain', text);
});

Then('a autenticação não será concluída', function () {
  cy.wait('@authUser').then( (intercept) => {
    expect(intercept.response.body.message).to.equal('Invalid username or password.')
    expect(intercept.response.statusCode).to.equal(401);
  });
  cy.url().should('equal', paginaLogin.URL);
});