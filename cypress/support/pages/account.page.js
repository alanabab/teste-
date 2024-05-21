export default class AccountPage {
  URL = "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/account";
    
  inputNome = '[placeholder="Nome"]';
  inputEmail = '[placeholder="E-mail"]';
  inputSenha = '[placeholder="Senha"]';
  inputConfirmarSenha = '[placeholder="Confirmar senha"]';
  tipoUsuario = '.profile-input';

  buttonSalvar = '.account-save-button';
  buttonAlterarSenha = '.account-password-button';
  buttonOk = '.modal-actions';
        
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
  
  clickButtonSalvar() {
    cy.get(this.buttonSalvar).click();
  }
  
  clickButtonAlterarSenha() {
    cy.get(this.buttonAlterarSenha).click();
  } 

  clickButtonOk() {
    cy.get(this.buttonOk).click();
  } 
  
  atualizar(nome, senha) {
    this.clickButtonAlterarSenha();
    this.typeNome(nome);
    this.typeSenha(senha);
    this.typeConfirmarSenha(senha);
    this.clickButtonCadastrar();
  }
}
  