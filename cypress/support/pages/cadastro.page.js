export default class CadastroPage {
  URL = "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/register";
  
  inputNome = '[placeholder="Nome"]';
  inputEmail = '[placeholder="E-mail"]';
  inputSenha = '[placeholder="Senha"]';
  inputConfirmarSenha = '[placeholder="Confirmar senha"]';
  buttonCadastrar = '.account-save-button';

  janela = '.modal-body';
  alerta = '.input-error';

  typeNome(nome) {
    cy.get(this.inputNome).type(nome);
  }

  typeEmail(email) {
    cy.get(this.inputEmail).type(email);
  }

  typeSenha(senha) {
    cy.get(this.inputSenha).type(senha);
  }

  typeConfirmarSenha(senha) {
    cy.get(this.inputConfirmarSenha).type(senha);
  }

  clickButtonCadastrar() {
    cy.get(this.buttonCadastrar).click();
  }


  cadastrar(nome, email) {
    this.typeNome(nome);
    this.typeEmail(email);
    this.clickButtonCadastrar();
  }
}
