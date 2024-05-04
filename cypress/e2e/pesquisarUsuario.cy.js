import {faker} from '@faker-js/faker';
import CadastroPage from "../support/pages/cadastro.page";
import ListaUsuarioPage from '../support/pages/listaUsuarios.page';

describe('Testes de pesquisar usuário', () => {
  
  var paginaUserList = new ListaUsuarioPage();
  var paginaCadastro = new CadastroPage();
  const name = faker.person.firstName();
  const email = faker.string.alpha(12).toLowerCase() + "@oi.com";
  
  beforeEach(() => {
    cy.viewport('macbook-16');
    cy.visit(paginaUserList.URL)
  });
  
  before(() => { //cria um usuário a ser utilizado nos testes de pesquisa
    cy.visit(paginaCadastro.URL);
    cy.intercept("POST", "/api/v1/users").as("postUser");

    paginaCadastro.cadastrar(name, email);
    
    cy.wait("@postUser");
    cy.contains("Usuário salvo com sucesso!").should("exist")
  });
  
  it('Deve permitir pesquisar usuário por nome', () => {
    paginaUserList.typeSearchBar(name);
    cy.wait(1000);
    paginaUserList.getUserList().invoke('text').should('contain', name);
    paginaUserList.getUserList().invoke('text').should('contain', email)
  });
   
  it('Deve permitir pesquisar usuário por email', () => {
    paginaUserList.typeSearchBar(email);
    cy.wait(1000);
    paginaUserList.getUserList().invoke('text').should('contain', name);
    paginaUserList.getUserList().invoke('text').should('contain', email)
  });

  it('Deve visualizar detalhes do usuário pesquisado', () => {
    paginaUserList.typeSearchBar(email); 
    cy.wait(1000);
    paginaUserList.getUserList().invoke('text').should('contain', name);
    paginaUserList.getUserList().invoke('text').should('contain', email);
    paginaUserList.clickButtonDetalhes(); 
    cy.wait(2000);
    paginaUserList.getOutputId().should('be.visible'); 
    paginaUserList.getOutputName().should('be.visible').invoke('val').should('equal', name);
    paginaUserList.getOutputEmail().should('be.visible').invoke('val').should('equal', email)
  });  
  
  it('Deve retornar lista vazia ao pesquisar nome não cadastrado', () => {
    cy.intercept('GET', 'api/v1/users', {
      statusCode: 200,
      body: []
    }).as('userList');

    cy.wait('@userList');
    paginaUserList.typeSearchBar('Usuário inexistente');
    cy.wait(1000);
    cy.get('h3').should('have.text', 'Ops! Não existe nenhum usuário para ser exibido.');
    cy.get('p').should('have.text', 'Cadastre um novo usuário')
  });
  
  it('Deve retornar lista vazia ao pesquisar email não cadastrado', () => {
    cy.intercept('GET', 'api/v1/users', {
      statusCode: 200,
      body: []
    }).as('userList');

    cy.wait('@userList');
    paginaUserList.typeSearchBar('email@inexistente.com');
    cy.wait(1000);
    cy.get('h3').should('have.text', 'Ops! Não existe nenhum usuário para ser exibido.');
    cy.get('p').should('have.text', 'Cadastre um novo usuário')
  })
})