export default class AccountPage {
  URL = "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/account";
    
  inputNome = '[placeholder="Nome"]';
  inputEmail = '[placeholder="E-mail"]';
  inputSenha = '[placeholder="Senha"]';
  inputConfirmarSenha = '[placeholder="Confirmar senha"]';
  tipoUsuario = 'select.profile-input';

  buttonSalvar = '.account-save-button';
  buttonAlterarSenha = '.account-password-button';
  buttonOk = '.modal-actions';

  buttonPerfil = '[href="/profile"]';
  buttonGerenciar = '[href="/account"]';
  buttonLogout = '[href="/logout"]';
        
  janela = '.modal-body';
  alerta = '.input-error';
  
  typeNome(nome) {
    cy.get(this.inputNome).type(nome);
  }
  
  typeSenha(senha) {
    cy.get(this.inputSenha).type(senha);
  }
  
  typeConfirmarSenha(senha) {
    cy.get(this.inputConfirmarSenha).type(senha);
  }

  getNome() {
    return cy.get(this.inputNome);
  }

  getEmail() {
    return cy.get(this.inputEmail);
  }
  
  getTipoUsuario() {
    return cy.get(this.tipoUsuario);
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

  clickButtonPerfil() {
    cy.get(this.buttonPerfil).click();
  }

  clickButtonGerenciar() {
    cy.get(this.buttonGerenciar).click();
  }
  
  clickButtonLogout() {
    cy.get(this.buttonLogout).click();
  }

  limparNome() {
    cy.get(this.inputNome).clear();
  }

  atualizar(nome, senha) {
    this.clickButtonAlterarSenha();
    this.limparNome();
    this.typeNome(nome);
    this.typeSenha(senha);
    this.typeConfirmarSenha(senha);
    this.clickButtonSalvar();
  }
}
  