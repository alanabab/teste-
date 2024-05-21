# language: pt

Funcionalidade: Gerenciar conta

Cenário: Não deve ser possível acessar a edição de informações se o usuário não estiver autenticado
  Dado que não estou autenticado no sistema
  Quando tentar acessar a funcionalidade de Gerenciamento de Conta
  Então serei redirecionado para a página de Login


Contexto: Gerenciamento de conta
  Dado que estou autenticado no sistema
  E que acessei a funcionalidade de gerenciamento de conta

Cenário: Deve ser possível alterar os próprios dados
  Quando informar novos nome, senha e confirmar operação
  Então visualizarei a mensagem de sucesso "Informações atualizadas!"
  E verificarei meus dados atualizados na tela

