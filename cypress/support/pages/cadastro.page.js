export default class CadastroPage {
    inputName = '#name';
    inputEmail = '#email';
    buttonLimpar = '[data-test-id="clearButton"]';
    buttonSalvar = 'button[type="submit"]';
    buttonVoltar = '.sc-gEvEer.fGGZSe';
  
    linkPaginaUsuarios = '[href="./usuarios.html"]';
    linkPaginaSobre = '[href="./sobre.html"]';
  
    listaUsuarios = '#listaUsuarios'; 

    URL = "https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/novo";

    typeName(name) {
      cy.get(this.inputName).type(name);
    }
  
    typeEmail(email) {
      cy.get(this.inputEmail).type(email);
    }
  
    clickButtonSalvar() {
      cy.get(this.buttonSalvar).click();
    }
  
    clickButtonLimpar() {
      cy.get(this.buttonLimpar).click();
    }
  
    clickButtonVoltar() {
      cy.get(this.buttonVoltar).click();
    }

    getUserList() {
      return cy.get(this.listaUsuarios);
    }
  
    cadastrar(name, email) {
      this.typeName(name);
      this.typeEmail(email);
    }
  }
  