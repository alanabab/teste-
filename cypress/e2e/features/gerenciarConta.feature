# language: pt

Funcionalidade: Gerenciar conta

Contexto: Usuário deve estar autenticado para gerenciar conta
Dado que estou autenticado no sistema
E que acessei a página de Perfil

Cenário: Não deve ser possível editar informações se o usuário não estiver autenticado
Quando acessar a opção Logout
E tentar acessar a funcionalidade de Gerenciamento de Conta
Então serei redirecionado para a página de Login automaticamente

Cenário: Deve ser possível alterar os próprios dados
Quando acessar a opção Gerenciar Conta
E informar um novo nome, uma nova senha e confirmar a operação
Então visualizarei a mensagem de sucesso "Informações atualizadas!"
E verificarei meus dados alterados na tela

Cenário: Deve ser possível alterar apenas o nome
Quando acessar a opção Gerenciar Conta
E informar um novo nome
E confirmar a operação
Então visualizarei a mensagem de sucesso "Informações atualizadas!"
E verificarei meus dados alterados na tela

Cenário: Deve ser possível alterar apenas a senha
Quando acessar a opção Gerenciar Conta
E habilitar a alteração de senha
E informar uma senha "123456" e confirmá-la
E confirmar a operação
Então visualizarei a mensagem de sucesso "Informações atualizadas!"

Cenário: Não deve ser possível alterar o e-mail
Quando acessar a opção Gerenciar Conta
Então o campo e-mail deve estar desabilitado a edição

Cenário: Para o usuário comum não deve ser possível alterar o tipo de usuário
Quando acessar a opção Gerenciar Conta
Então o campo tipo de usuário deve estar desabilitado a edição

Esquema do Cenário: Não deve ser possível alterar senha se a confirmação de senha for divergente
Quando acessar a opção Gerenciar Conta
E habilitar a alteração de senha
E informar uma senha '<senha>' diferente da confirmação '<confirmação>'
E confirmar a operação
Então visualizarei o alerta "As senhas devem ser iguais."
E a operação não será concluída
Exemplos:
| senha  | confirmação |
| 123456 |   78910111  |
| UVWXYZ |    ABCDEF   |

Esquema do Cenário: Não deve ser possível alterar senha menor que 6 dígitos
Quando acessar a opção Gerenciar Conta
E habilitar a alteração de senha
E informar uma senha '<senha>' e confirmá-la
E confirmar a operação
Então visualizarei os alertas "A senha deve ter pelo menos 6 dígitos"
E a operação não será concluída
Exemplos:
| senha |
|  ABC  |
|   0   |

Esquema do Cenário: Não deve ser possível alterar senha maior que 12 dígitos
Quando acessar a opção Gerenciar Conta
E habilitar a alteração de senha
E informar uma senha '<senha>' e confirmá-la
E confirmar a operação
Então visualizarei a mensagem de erro "Não foi possível atualizar os dados."
Exemplos:
| senha |
| ABCDEFGHIJKLM |
| 1234567890000 |

Cenário: Deve ser possível visualizar dados relevantes do usuário ao editar perfil
Quando acessar a opção Gerenciar Conta
Então visualizarei meu nome, e-mail e tipo de usuário