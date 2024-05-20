# language: pt

Funcionalidade: Cadastro de usuário

Contexto: Cadastro de usuário
  Dado que acessei a funcionalidade de cadastro

Esquema do Cenário: Deve ser possível cadastrar usuário com qualquer nome
  Quando informar um nome "<nome>"
  E informar um e-mail
  E informar uma senha
  E informar a confirmação de senha
  E confirmar a operação
  Então visualizarei a mensagem de sucesso "Cadastro realizado!"
  E o usuário será cadastrado como tipo comum
  Exemplos:
  | nome  |
  | Alana |
  | @l@n@ |
  |   A   |
  |  ...  |
  | 12345 |
  | #$*!% |
  | 😃🤪 |
  | AlanaBatistaDeAlmeidaBarbosaAlanaBatistaDeAlmeidaBarbosaAlanaBatistaDeAlmeidaBarbosaAlanaBatistaDeAlmeidaBarbosa |

Cenário: Não deve ser possível cadastrar usuário sem informar um nome
  Quando informar um e-mail
  E informar uma senha
  E informar a confirmação de senha
  E confirmar a operação
  Então visualizarei o alerta "Informe o nome"
  E o cadastro não será concluído
