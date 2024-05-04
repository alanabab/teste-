import {faker} from '@faker-js/faker';
import CadastroPage from "../support/pages/cadastro.page";

describe('Testes de Criar Novo Usuário', () => {
  
  var paginaCadastro = new CadastroPage();
  const name = 'Nome de Usuario';
  const email = faker.internet.email();

  beforeEach(() => {
    cy.viewport('macbook-16');
    cy.visit(paginaCadastro.URL)
  });

  it('Deve criar um novo usuário com sucesso', () => {
    cy.intercept("POST", "/api/v1/users").as("postUser");

    paginaCadastro.cadastrar(name, email);
    
    cy.wait("@postUser");
    cy.contains("Usuário salvo com sucesso!").should("exist")
  });

  it('Não deve ser possível cadastrar um usuário sem informar um nome', () => {
    paginaCadastro.typeEmail(email);
    paginaCadastro.clickButtonSalvar();
    cy.contains("O campo nome é obrigatório.").should("exist")
  });

  it('Não deve ser possível cadastrar um usuário sem informar um e-mail', () => {
    paginaCadastro.typeName(name);
    paginaCadastro.clickButtonSalvar();
    cy.contains("O campo e-mail é obrigatório.").should("exist")
  });
  
  it('Não deve ser possível cadastrar um usuário sem informar nome e e-mail', () => {
    paginaCadastro.clickButtonSalvar();
    cy.contains("O campo nome é obrigatório.").should("exist");
    cy.contains("O campo e-mail é obrigatório.").should("exist")
  });

  it('Não deve permitir cadastro com formato de e-mail inválido', () => {
    paginaCadastro.cadastrar(name, 'email_invalido');
    cy.contains("Formato de e-mail inválido").should("exist")
  });
  
  it('Deve ocorrer erro quando o e-mail já estiver em uso', () => {
    cy.intercept("POST", "/api/v1/users", {
      statusCode: 422,
      error: "User already exists."
    }).as("postUser");
    
    paginaCadastro.cadastrar(name, email);

    cy.wait("@postUser");
    cy.contains("Erro").should("exist");
    cy.contains("Este e-mail já é utilizado por outro usuário.").should("exist");
    cy.contains("Usuário salvo com sucesso!").should("not.exist")
  });
 
  it('Não permitir cadastro com nome com mais de 100 caracteres', () => {
    const name101 = faker.string.fromCharacters('abc', 101);

    paginaCadastro.cadastrar(name101, email);
    cy.contains("Informe no máximo 100 caracteres para o nome").should("exist");
    cy.contains("Usuário salvo com sucesso!").should("not.exist")
  });

  it('Não permitir cadastro com email com mais de 60 caracteres', () => {
    const email61 = faker.string.fromCharacters('abc', 61);

    paginaCadastro.cadastrar(name, email61 + '@gmail.com');
    cy.contains("Informe no máximo 60 caracteres para o e-mail").should("exist");
    cy.contains("Usuário salvo com sucesso!").should("not.exist")
  })
})