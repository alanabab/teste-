# language: pt

Funcionalidade: Cadastro de usuário

Contexto: Usuário deve ter acessado a funcionalidade de cadastro
  Dado que acessei a funcionalidade de cadastro

Cenário: Cadastro de usuário com sucesso
  Quando informar um novo nome e um novo e-mail
  E confirmar a operação
  Então o sistema deverá exibir a mensagem "Usuário salvo com sucesso!"
  E o usuário será registrado na lista

