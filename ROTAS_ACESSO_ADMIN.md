Este é um complemento importante à arquitetura já definida no PROJECT_CONTEXT.md.

A partir deste ponto, considere este como o fluxo oficial de gerenciamento de organizações, usuários, produtos, acessos e SSO da Forklin.

1. CONCEITO PRINCIPAL

Uma Organization representa um cliente da Forklin.

A organização pode contratar vários sistemas/produtos.

Exemplo:

Organization:
Rede Merino

Produtos contratados:

* Diário Digital
* Biblioteca
* Controle de Patrimônio

Porém, nem todos os usuários da organização necessariamente terão acesso a todos os produtos contratados.

Portanto, existem duas relações diferentes:

1. Quais produtos a organização contratou.
2. Quais produtos cada usuário pode acessar.

Não confundir essas duas coisas.

⸻

2. USUÁRIO

Todo usuário criado dentro de uma organização terá acesso ao app.forklin.com.br.

O acesso ao App é padrão para os usuários da organização.

O que será configurável é quais sistemas aparecem para aquele usuário.

Exemplo:

Organização:
Rede Merino

Sistemas contratados:

* Diário Digital
* Biblioteca
* Patrimônio

Usuário:
João

Acessos:

* Diário Digital → SIM
* Biblioteca → NÃO
* Patrimônio → NÃO

No App, João deverá visualizar somente:

Diário Digital

Ele não deve visualizar cards, links ou opções para Biblioteca e Patrimônio.

Outro usuário pode visualizar:

* Diário Digital
* Biblioteca

Mesmo pertencendo à mesma organização.

⸻

3. ACESSO AO PRODUTO

Além de definir se o usuário possui acesso a um produto, deve ser possível definir a função/role que ele terá dentro daquele produto.

Exemplo:

Maria:

* Diário Digital → Secretaria
* Biblioteca → Bibliotecária
* Patrimônio → sem acesso

João:

* Diário Digital → Professor
* Biblioteca → sem acesso
* Patrimônio → sem acesso

Carlos:

* Diário Digital → Gestão
* Biblioteca → Gestão
* Patrimônio → Gestão

Portanto, conceitualmente:

UserProductAccess

deve representar algo semelhante a:

* user_id
* organization_id
* product_id
* role_key
* status
* created_at
* updated_at

A role é específica do produto.

Não transformar as roles de todos os produtos em uma lista rígida dentro da Central API.

Por exemplo:

Diário Digital pode ter:

* secretaria
* gestao
* professor

Biblioteca pode ter:

* bibliotecario
* gestao
* usuario

Patrimônio pode ter:

* gestao
* operador
* consulta

A Central API precisa saber que o usuário possui acesso ao produto e qual role_key foi atribuída.

A regra detalhada do que aquela role pode fazer deve continuar sendo responsabilidade da API do produto.

⸻

4. MODELO DE RELACIONAMENTO

Manter claramente estas relações:

Organization
↓
OrganizationProduct
↓
User
↓
UserProductAccess
↓
Product Role

Onde:

OrganizationProduct

representa:

“A organização contratou este produto.”

Enquanto:

UserProductAccess

representa:

“Este usuário pode acessar este produto.”

E:

role_key

representa:

“Esta é a função deste usuário dentro deste produto.”

⸻

5. FLUXO NO ADMIN

O fluxo principal de cadastro deve ser orientado pela Organização.

Exemplo:

Etapa 1 — Criar organização

Admin cria:

Rede Merino

Informações básicas:

* nome;
* responsável;
* contato;
* status;
* demais informações necessárias.

⸻

Etapa 2 — Definir produtos contratados

Dentro da organização, o Admin seleciona os produtos contratados:

☑ Diário Digital
☑ Biblioteca
☑ Controle de Patrimônio

Esses produtos passam a fazer parte dos sistemas disponíveis para aquela organização.

⸻

Etapa 3 — Criar usuários

Dentro da mesma organização, o Admin cria os usuários.

Exemplo:

Maria Silva
maria@redemerino.com.br

João Santos
joao@redemerino.com.br

Carlos Oliveira
carlos@redemerino.com.br

Todos terão acesso ao app.forklin.com.br.

⸻

Etapa 4 — Configurar acessos

Para cada usuário, o Admin deverá conseguir configurar os produtos disponíveis.

Exemplo:

Maria:

☑ Diário Digital → Secretaria
☑ Biblioteca → Bibliotecária
☐ Patrimônio

João:

☑ Diário Digital → Professor
☐ Biblioteca
☐ Patrimônio

Carlos:

☑ Diário Digital → Gestão
☑ Biblioteca → Gestão
☑ Patrimônio → Gestão

O Admin deve impedir a atribuição de acesso a um produto que a organização não contratou.

Ou seja:

Se a organização não possui Biblioteca em OrganizationProduct, não deve ser possível conceder Biblioteca ao usuário.

⸻

6. PUBLICAÇÃO / CONVITE

Depois que a organização estiver configurada e os usuários tiverem seus acessos definidos, o Admin poderá realizar uma ação como:

Publicar acessos

ou

Enviar convites

Nesse momento, a Central API deve:

1. validar a configuração;
2. verificar os usuários;
3. gerar os convites;
4. enviar os e-mails;
5. registrar o estado do convite.

O usuário recebe um e-mail com instruções para ativação/acesso.

Não colocar senha ou informações sensíveis diretamente na URL.

Usar um fluxo seguro de convite/ativação com token temporário e expiração.

⸻

7. PRIMEIRO ACESSO

O usuário recebe o convite.

Fluxo conceitual:

Email
↓
Link de ativação
↓
App Forklin
↓
Ativação/autenticação
↓
app.forklin.com.br
↓
Dashboard da organização
↓
Produtos autorizados

O App consulta a Central API para saber quais produtos o usuário pode visualizar.

Exemplo de resposta conceitual:

{
  "user": {
    "id": "123",
    "name": "João Santos"
  },
  "organization": {
    "id": "org_001",
    "name": "Rede Merino"
  },
  "products": [
    {
      "id": "diario_digital",
      "name": "Diário Digital",
      "role": "professor"
    }
  ]
}

O frontend usa isso para montar o dashboard.

⸻

8. SSO

O SSO entra no momento em que o usuário sai do App e entra em um produto.

Exemplo:

João entra em:

app.forklin.com.br

Visualiza:

Diário Digital

Clica em:

Acessar

O App não deve simplesmente enviar:

?user_id=123&role=professor

Isso NÃO é uma autorização segura.

Deve existir um fluxo de autenticação/SSO seguro.

Conceitualmente:

Usuário
   ↓
App Forklin
   ↓
Clica em Diário Digital
   ↓
Fluxo SSO
   ↓
Central de autenticação
   ↓
Validação de identidade + acesso
   ↓
Diário Digital
   ↓
Sessão autenticada

O Diário Digital deve conseguir validar que:

* o usuário é autenticado;
* pertence à organização correta;
* possui acesso ao Diário Digital;
* possui a role atribuída para aquele produto.

A role não deve ser confiada simplesmente porque veio do frontend.

A autorização deve ser validada pelo backend.

⸻

9. ACESSO DIRETO AO PRODUTO

Também considerar o cenário em que o usuário tenta entrar diretamente no produto.

Exemplo:

diario.forklin.com.br

Sem passar pelo App.

O produto deve verificar a autenticação e autorização.

Se o usuário estiver autenticado e tiver:

UserProductAccess
para:

Diário Digital

→ permitir acesso.

Se não possuir:

→ negar acesso ou redirecionar para o App.

Isso evita que esconder um produto no dashboard seja tratado como mecanismo de segurança.

O frontend apenas controla a experiência.

O backend controla a autorização.

⸻

10. ROTAS DA CENTRAL API

Criar a API de forma modular.

As rotas podem seguir uma estrutura semelhante a:

Organizações

GET /organizations

Listar organizações.

POST /organizations

Criar organização.

GET /organizations/{organization_id}

Consultar organização.

PATCH /organizations/{organization_id}

Atualizar organização.

DELETE /organizations/{organization_id}

Desativar/excluir conforme a estratégia definida.

⸻

Produtos da organização

GET /organizations/{organization_id}/products

Listar produtos contratados pela organização.

POST /organizations/{organization_id}/products

Adicionar produto à organização.

DELETE /organizations/{organization_id}/products/{product_id}

Remover/desativar produto da organização.

A API deve validar as regras necessárias antes de permitir remoções.

⸻

Usuários da organização

GET /organizations/{organization_id}/users

Listar usuários da organização.

POST /organizations/{organization_id}/users

Criar/iniciar convite de usuário.

GET /organizations/{organization_id}/users/{user_id}

Consultar usuário.

PATCH /organizations/{organization_id}/users/{user_id}

Atualizar usuário.

⸻

Acessos dos usuários

GET /organizations/{organization_id}/users/{user_id}/accesses

Listar os produtos aos quais o usuário possui acesso.

POST /organizations/{organization_id}/users/{user_id}/accesses

Conceder acesso a um produto.

PATCH /organizations/{organization_id}/users/{user_id}/accesses/{access_id}

Alterar role/status do acesso.

DELETE /organizations/{organization_id}/users/{user_id}/accesses/{access_id}

Revogar acesso.

Ao conceder um acesso, validar obrigatoriamente:

1. organização existe;
2. usuário pertence à organização;
3. produto existe;
4. produto está contratado pela organização;
5. role é válida para aquele produto.

⸻

Convites

Criar endpoints específicos para o ciclo de convite, por exemplo:

POST /organizations/{organization_id}/invitations

GET /invitations/{token}

POST /invitations/{token}/accept

Os tokens devem ser temporários, seguros e não reutilizáveis após a conclusão.

⸻

11. APP

O App deve ter endpoints/fluxos para obter os sistemas disponíveis para o usuário autenticado.

Conceitualmente:

GET /me

Retorna identidade e organização atual.

GET /me/products

Retorna somente os produtos aos quais o usuário possui acesso.

Não retornar simplesmente todos os produtos contratados pela organização.

A diferença é fundamental:

Organization Products
        ↓
Todos os produtos contratados
User Products
        ↓
Somente os produtos autorizados para aquele usuário

⸻

12. SSO E PRODUTOS INDEPENDENTES

O SSO não deve fazer os produtos dependerem da implementação interna do App.

A arquitetura deve permitir:

                 Central Auth/API
                       │
             ┌─────────┼─────────┐
             ↓         ↓         ↓
           App      Diário    Biblioteca
                      Digital

Cada produto continua possuindo:

* frontend;
* API;
* banco;
* regras de negócio.

A Central API é responsável pela identidade/plataforma/acesso.

A API do produto continua responsável pelas regras específicas do produto.

⸻

13. SEGURANÇA

Não confiar em:

* user_id enviado pelo frontend;
* organization_id enviado pelo frontend;
* role enviada pelo frontend;
* lista de produtos enviada pelo frontend.

Essas informações podem existir no contexto autenticado, mas precisam ser validadas pelo backend.

O backend deve determinar:

Quem é o usuário?

A qual organização ele pertence?

Ele possui acesso a este produto?

Qual role ele possui neste produto?

Ele possui permissão para executar esta ação?

⸻

14. ADMIN

A estrutura do Admin pode continuar:

ADMINISTRAÇÃO

* Visão geral
* Organizações
* Projetos
* Equipe

PLATAFORMA

* Sistemas
* Assinaturas

OBSERVABILIDADE

* Visão geral
* Sistemas/Projetos
* Infraestrutura
* Auditoria

A gestão de usuários e acessos deve ficar dentro de cada Organização.

Exemplo:

Admin → Organizações → Rede Merino → Usuários

Isso mantém o contexto e evita espalhar usuários de todas as organizações em uma tela sem contexto.

⸻

15. AUDITORIA

As principais ações administrativas devem gerar eventos de auditoria.

Exemplos:

* organização criada;
* produto adicionado à organização;
* produto removido;
* usuário criado;
* convite enviado;
* usuário ativado;
* acesso concedido;
* acesso revogado;
* role alterada;
* assinatura alterada.

Exemplo conceitual:

AuditEvent
actor_user_id
organization_id
action
resource
resource_id
metadata
timestamp

Isso será utilizado futuramente pela área Observabilidade → Auditoria.

⸻

16. REGRA FINAL DA ARQUITETURA

O fluxo oficial deve ser entendido desta maneira:

                 ORGANIZAÇÃO
                      │
             Produtos contratados
                      │
            ┌─────────┴─────────┐
            │                   │
          USUÁRIOS          ASSINATURA
            │
            │
      Acesso ao App
            │
            ▼
      app.forklin.com.br
            │
            ▼
   Produtos autorizados
            │
      ┌─────┼─────┐
      ▼     ▼     ▼
   Diário  Biblio  Patrimônio
      │      │       │
      ▼      ▼       ▼
    Role    Role    Role
      │      │       │
      └──────┼───────┘
             ▼
             SSO
             ▼
       Produto autenticado

A regra mais importante é:

A organização contrata produtos.
O usuário recebe acesso ao App.
Cada usuário recebe acessos individuais aos produtos contratados.
Cada acesso pode possuir uma role específica daquele produto.
O App mostra somente os produtos autorizados para aquele usuário.
O SSO permite entrar nesses produtos sem realizar um novo login.
A autorização final sempre é validada pelo backend.

Implemente a Central API respeitando esse modelo, sem misturar as regras de negócio dos produtos dentro da API central.