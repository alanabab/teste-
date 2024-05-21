export default class LoginPage {
  URL = "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/login";
    
  inputEmail = '[placeholder="E-mail"]';
  inputSenha = '[placeholder="Password"]';
  buttonLogin = '.login-button';
  buttonOk = '.modal-actions';
  
  janela = '.modal-body';
  alerta = '.input-error';
  
  typeEmail(email) {
    cy.get(this.inputEmail).type(email);
  }
  
  typeSenha(senha) {
    cy.get(this.inputSenha).type(senha);
  }
  
  clickButtonLogin() {
    cy.get(this.buttonLogin).click();
  }

  clickButtonOk() {
    cy.get(this.buttonOk).click();
  }  
    
  login(email, senha) {
    this.typeEmail(email);
    this.typeSenha(senha);
    this.clickButtonLogin();
  }
}
  