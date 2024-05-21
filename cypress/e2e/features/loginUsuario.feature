# language: pt

Funcionalidade: Login de usuário

Contexto: Login de usuário
  Dado que estou cadastrado no sistema
  E que acessei a funcionalidade de login

Cenário: Deve ser possível efetuar login com sucesso
  Quando informar e-mail, senha e confirmar operação
  Então estarei autenticado no sistema
  
Cenário: Não deve ser possível efetuar login sem informar o e-mail
  Quando informar a senha
  E confirmar a operação
  Então visualizarei o alerta "Informe o e-mail"
  E a operação não será concluída
    
Cenário: Não deve ser possível efetuar login sem informar a senha
  Quando informar o e-mail
  E confirmar a operação
  Então visualizarei o alerta "Informe a senha"
  E a operação não será concluída
      
Cenário: Não deve ser possível efetuar login sem informar os campos obrigatórios
  Quando confirmar a operação
  Então visualizarei os alertas de campos obrigatórios
  E a operação não será concluída

Cenário: Não deve ser possível efetuar login ao informar e-mail incorreto
  Quando informar o e-mail incorretamente
  E informar a senha
  E confirmar a operação
  Então visualizarei a mensagem de erro "Usuário ou senha inválidos."
  E a autenticação não será concluída

Cenário: Não deve ser possível efetuar login ao informar senha incorreta
  Quando informar o e-mail
  E informar a senha incorretamente
  E confirmar a operação
  Então visualizarei a mensagem de erro "Usuário ou senha inválidos."
  E a autenticação não será concluída