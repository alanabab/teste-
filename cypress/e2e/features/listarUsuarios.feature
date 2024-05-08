# language: pt

Funcionalidade: Listar Usuários

Contexto: Usuário deve ter acessado a página de listagem de usuários
  Dado que acessei a página de listagem de usuários

Cenário: Deve existir uma opção para cadastro de novo usuário quando a lista estiver vazia
  Dado que não existe nenhum usuário cadastrado no sistema
  Quando verificar a lista de usuários 
  Então visualizarei o aviso "Ops! Não existe nenhum usuário para ser exibido."
  E visualizarei a opção "Cadastre um novo usuário"

Cenário: Deve exibir as informações do usuário pesquisado na lista
  Dado que existe um usuário cadastrado no sistema
  Quando pesquisar pelo email do usuário
  Então o usuário cadastrado deverá estar na lista
  E visualizarei os detalhes do usuário

Cenário: Deve exibir a lista com as informações de todos os usuários cadastrados
  Dado que existem 6 usuários cadastrados no sistema
  Quando verificar a lista de usuários
  Então os 6 usuários cadastrados deverão estar na lista

Cenário: Não deve ser possível navegar entre páginas se existirem apenas 6 usuários cadastrados
  Dado que existem 6 usuários cadastrados no sistema
  Quando verificar a paginação "1 de 1"
  Então o botão "Próximo" deve estar desativado
  E o botão "Anterior" deve estar desativado

Cenário: Deve ser possível navegar entre páginas se existirem mais de 6 usuários cadastrados
  Dado que existem 18 usuários cadastrados no sistema
  Quando verificar a paginação "1 de 3"
  Então avançarei para a página 2
  E avançarei para a página 3
  
Cenário: Deve ser possível voltar páginas
  Dado que existem 18 usuários cadastrados no sistema
  Dado que avancei para a última página da lista de usuários
  Quando verificar a paginação "3 de 3"
  Então voltarei para a página 2
  E voltarei para a página 1