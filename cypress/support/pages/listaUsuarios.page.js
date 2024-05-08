export default class ListaUsuarioPage {
    listaUsuarios = '#listaUsuarios';
    paginacaoAtual = '#paginacaoAtual'; 
    buttonCadastreNovoUsuario = '.sc-bmzYkS.dmSxaj';
    buttonProximo = '#paginacaoProximo';
    buttonVoltar = '#paginacaoVoltar';
    buttonDetalhes = '.sc-hzhJZQ';
    inputSearchBar = '.sc-gsFSXq.mUpIH';
    
    outputName = '#userName';
    outputEmail = '#userEmail';
    outputId = '[name="id"]';

    URL = "https://rarocrud-frontend-88984f6e4454.herokuapp.com/users";

    clickButtonCadastreNovoUsuario() {
      cy.get(this.buttonCadastreNovoUsuario).click();
    }

    clickButtonProximo() {
      cy.get(this.buttonProximo).click();
    }

    clickButtonVoltar() {
      cy.get(this.buttonVoltar).click();
    }

    clickButtonDetalhes() {
      cy.get(this.buttonDetalhes).first().click();
    }

    getUserList() {
      return cy.get(this.listaUsuarios);
    }

    getOutputName() {
      return cy.get(this.outputName);
    }

    getOutputEmail() {
      return cy.get(this.outputEmail);
    }

    getOutputId() {
      return cy.get(this.outputId);
    }

    getPaginacao() {
      return cy.get(this.paginacaoAtual);
    }

    getButtonProximo() {
      return cy.get(this.buttonProximo);
    }

    getButtonVoltar() {
      return cy.get(this.buttonVoltar);
    }

    typeSearchBar(input) {
      cy.get(this.inputSearchBar).type(input);
    }
  }
  