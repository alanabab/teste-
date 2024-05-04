import ListaUsuarioPage from "../support/pages/listaUsuarios.page";

var paginaUserList = new ListaUsuarioPage();

describe('Testes de Listar Usuários', () => {
  beforeEach(() => {
    cy.viewport('macbook-16');
    cy.visit(paginaUserList.URL)
  });

  it('Deve existir uma opção para cadastro de novo usuário quando a lista estiver vazia', () => {
    cy.intercept('GET', 'api/v1/users', {
      statusCode: 200,
      body: []
    }).as('userList');

    cy.wait('@userList');
    cy.get('h3').should('have.text', 'Ops! Não existe nenhum usuário para ser exibido.');
    cy.get('p').should('have.text', 'Cadastre um novo usuário');

    paginaUserList.clickButtonCadastreNovoUsuario();
    cy.url().should('equal', paginaUserList.URL + '/novo')
  });
  
  it('Deve exibir a lista com todos os usuários cadastrados', () => {
    cy.intercept('GET', 'api/v1/users', {
      fixture: "userList.json",
    }).as('userList');

    cy.wait('@userList');

    paginaUserList.getUserList().should('be.visible');
    paginaUserList.getPaginacao().should('have.text', '1 de 3')
  });
   
  it('Deve passar para a próxima página da lista', () => {
    cy.intercept('GET', 'api/v1/users', {
      fixture: "userList.json",
    }).as('userList');

    cy.wait('@userList');

    paginaUserList.getUserList().should('be.visible');
    paginaUserList.getPaginacao().should('have.text', '1 de 3');

    cy.wait(500);
    paginaUserList.clickButtonProximo();
    paginaUserList.getPaginacao().should('have.text', '2 de 3');
    
    cy.wait(500);
    paginaUserList.clickButtonProximo();
    paginaUserList.getPaginacao().should('have.text', '3 de 3')
  })
})