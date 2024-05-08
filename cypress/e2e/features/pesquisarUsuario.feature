# language: pt

Funcionalidade: Pesquisar Usuário

Contexto: Usuário deve ter acessado a funcionalidade de pesquisa de usuário
  Dado que acessei a funcionalidade de pesquisa de usuário

Cenário: Deve permitir pesquisar usuário por nome
  Dado que um usuário está cadastrado no sistema
  Quando digitar o nome do usuário na barra de busca
  Então acessarei os detalhes do usuário
  E visualizarei todas as informações do usuário

Cenário: Deve permitir pesquisar usuário por email
  Dado que um usuário está cadastrado no sistema
  Quando digitar o email do usuário na barra de busca
  Então acessarei os detalhes do usuário
  E visualizarei todas as informações do usuário

Cenário: Deve retornar lista vazia ao pesquisar nome não cadastrado
  Dado que não existe um usuário "Amelinda" cadastrado
  Quando digitar "Amelinda" na barra de busca
  Então visualizarei o texto "Ops! Não existe nenhum usuário para ser exibido."
  E visualizarei a alternativa "Cadastre um novo usuário"

Cenário: Deve retornar lista vazia ao pesquisar email não cadastrado
  Dado que não existe um usuário "amelinda@yahoo.com" cadastrado
  Quando digitar "amelinda@yahoo.com" na barra de busca
  Então visualizarei o texto "Ops! Não existe nenhum usuário para ser exibido."
  E visualizarei a alternativa "Cadastre um novo usuário"
