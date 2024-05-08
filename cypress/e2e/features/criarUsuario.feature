# language: pt

Funcionalidade: Cadastro de usuário

Contexto: Usuário deve ter acessado a funcionalidade de cadastro
  Dado que acessei a funcionalidade de cadastro

Cenário: Cadastro de usuário com sucesso
  Quando informar um novo nome e um novo e-mail
  E confirmar a operação
  Então visualizarei a mensagem "Usuário salvo com sucesso!"
  E o usuário será registrado na lista

Cenário: Não deve ser possível cadastrar um usuário sem informar um nome
  Quando informar um novo e-mail
  E confirmar a operação
  Então visualizarei o alerta "O campo nome é obrigatório."
  E o usuário não será registrado na lista

Cenário: Não deve ser possível cadastrar um usuário sem informar um e-mail
  Quando informar um novo nome
  E confirmar a operação
  Então visualizarei o alerta "O campo e-mail é obrigatório."
  E o usuário não será registrado na lista

Cenário: Não deve ser possível cadastrar um usuário sem informar um nome e um e-mail
  Quando confirmar a operação
  Então visualizarei o alerta "O campo e-mail é obrigatório."
  E visualizarei o alerta "O campo nome é obrigatório."

Esquema do Cenário: Não deve ser possível cadastrar um usuário com e-mail em formato inválido
  Quando informar o nome "<nome>"
  E informar o e-mail "<email>"
  E confirmar a operação
  Então visualizarei o alerta "Formato de e-mail inválido"
  Exemplos:
    |     email      |  nome  |
    | emailinvalido  |  Alana |
    | email@invalido | Murilo |
    |  invalido.com  |  Maria |
    |     @.com      | Silvano|

Cenário: Não permitir cadastro com nome com mais de 100 caracteres
  Quando informar um nome com mais de 100 caracteres 
  E informar um novo e-mail 
  E confirmar a operação
  Então visualizarei o alerta "Informe no máximo 100 caracteres para o nome"
  E o usuário não será registrado na lista

Cenário: Não permitir cadastro com email com mais de 60 caracteres
  Quando informar um novo nome 
  E informar um e-mail com mais de 60 caracteres
  E confirmar a operação
  Então visualizarei o alerta "Informe no máximo 60 caracteres para o e-mail"
  E o usuário não será registrado na lista

Cenário: Deve ocorrer erro quando o e-mail já estiver em uso 
  Dado que existe um usuário cadastrado
  Quando informar um novo nome 
  E informar o mesmo e-mail
  E confirmar a operação
  Então visualizarei a mensagem de erro "Este e-mail já é utilizado por outro usuário."
