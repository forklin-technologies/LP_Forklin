# PROJECT CONTEXT — FORKLIN

> Este documento apresenta a visão, arquitetura, estrutura e regras do ecossistema Forklin.
>
> **Objetivo principal deste arquivo:** dar ao agente de desenvolvimento contexto suficiente para compreender o produto antes de implementar qualquer parte nova do ecossistema.
>
> **Importante:** o projeto atual contém principalmente a Landing Page. Os demais sistemas descritos neste documento ainda deverão ser criados como projetos independentes, em pastas próprias, fora da pasta da Landing Page.

---

# 1. Objetivo

A Forklin será uma plataforma de soluções de software organizada por **segmentos de mercado**.

A ideia não é criar apenas um sistema isolado, mas construir um ecossistema no qual diferentes soluções possam ser oferecidas para diferentes tipos de clientes.

Neste primeiro momento, a Forklin terá dois segmentos principais:

* **For Education**
* **For Sales**

Cada segmento poderá possuir diferentes soluções e sistemas.

A Landing Page será o ponto público de entrada da empresa.

Depois que uma empresa ou instituição contratar uma solução da Forklin, ela terá acesso ao ambiente autenticado da plataforma através de:

```text
app.forklin.com.br
```

A Forklin também terá um ambiente administrativo interno:

```text
admin.forklin.com.br
```

E uma API central:

```text
api.forklin.com.br
```

Os sistemas específicos oferecidos pela Forklin poderão possuir seus próprios:

* Frontends
* Backends
* Bancos de dados
* Regras de negócio
* Domínios

A arquitetura deve permitir que novos sistemas sejam adicionados futuramente sem precisar reconstruir toda a plataforma.

---

# 2. Visão da Forklin

A Forklin deve ser entendida como uma **empresa/plataforma de soluções de software**.

A estrutura conceitual é:

```text
Forklin
│
├── Segmentos
│   ├── For Education
│   └── For Sales
│
├── Soluções
│   ├── Soluções para Education
│   └── Soluções para Sales
│
├── Plataforma do cliente
│   └── app.forklin.com.br
│
├── Administração interna
│   └── admin.forklin.com.br
│
└── Infraestrutura central
    └── api.forklin.com.br
```

A Forklin não deve ser tratada como um único sistema monolítico.

Ela é um ecossistema formado por diferentes aplicações que compartilham uma infraestrutura central de identidade, organizações, acessos e permissões.

---

# 3. Segmentos atuais

Neste momento, existem dois segmentos ativos.

## 3.1 For Education

O segmento **For Education** concentra soluções destinadas ao setor educacional.

Exemplos de soluções:

* Diário Digital
* Biblioteca
* Controle de Patrimônio
* Outras soluções educacionais futuras

O objetivo é permitir que uma instituição de ensino possa contratar uma ou várias soluções da Forklin.

Por exemplo:

```text
Rede Merino
│
├── Diário Digital
└── Biblioteca
```

Ou:

```text
Escola ABC
│
└── Diário Digital
```

Cada organização terá acesso somente às soluções que foram contratadas e disponibilizadas para ela.

---

# 3.2 For Sales

O segmento **For Sales** será destinado a soluções relacionadas a vendas, comercial, CRM, treinamento, automação e tecnologias para equipes comerciais.

As soluções específicas desse segmento poderão ser adicionadas posteriormente.

A arquitetura deve estar preparada para isso, mas não deve criar sistemas fictícios apenas para preencher a estrutura.

---

# 3.3 Segmentos futuros

Novos segmentos poderão existir futuramente.

Por exemplo:

```text
For Education
For Sales
For ...
```

Entretanto, **não implementar agora segmentos que ainda não fazem parte do escopo atual**.

A arquitetura deve ser extensível, mas o desenvolvimento atual deve se concentrar nos segmentos realmente definidos.

---

# 4. Conceitos importantes

É importante diferenciar os seguintes conceitos.

## Segmento

Representa uma área de mercado da Forklin.

Exemplos:

```text
For Education
For Sales
```

---

## Solução / Produto

Representa um sistema ou solução comercial oferecida pela Forklin dentro de determinado segmento.

Exemplo:

```text
For Education
    └── Diário Digital
```

---

## Organização

Representa o cliente da Forklin.

Exemplo:

```text
Rede Merino
```

Uma organização pode possuir acesso a uma ou várias soluções.

---

## Usuário

Representa uma pessoa pertencente a uma organização.

Exemplo:

```text
Maria
João
Carlos
```

---

## Acesso

Define quais soluções determinado usuário pode utilizar.

Exemplo:

```text
Maria
└── Diário Digital
```

---

## Papel / Role

Define o que o usuário pode fazer dentro de determinada solução.

Exemplo:

```text
Maria
└── Diário Digital
    └── Professora
```

Ou:

```text
João
└── Diário Digital
    └── Gestão
```

Os papéis são específicos de cada produto.

---

# 5. Fluxo comercial da Forklin

A Forklin **não será inicialmente um sistema de autoatendimento**, no qual qualquer pessoa entra na Landing Page, cria uma conta e começa imediatamente a utilizar os sistemas.

O fluxo inicial será mais personalizado.

A jornada será aproximadamente:

```text
Visitante
   ↓
forklin.com.br
   ↓
Conhece a Forklin
   ↓
Escolhe um segmento
   ↓
Conhece as soluções
   ↓
Entra em contato com a Forklin
   ↓
Processo comercial / contratação
   ↓
Organização é cadastrada
   ↓
Soluções contratadas são vinculadas
   ↓
Usuários são cadastrados
   ↓
Permissões são configuradas
   ↓
Convite/acesso é enviado
   ↓
Usuário acessa app.forklin.com.br
   ↓
Visualiza seu ambiente personalizado
   ↓
Acessa suas soluções
```

Isso significa que a Landing Page tem uma função principalmente:

* Institucional
* Comercial
* Informativa
* De apresentação das soluções
* De geração de contato

Enquanto o `app` representa o ambiente autenticado do cliente.

---

# 6. Landing Page

Domínio:

```text
forklin.com.br
```

A Landing Page é a parte pública da Forklin.

Ela deve apresentar:

* A Forklin
* Proposta da empresa
* Segmentos
* Soluções
* Benefícios
* Informações institucionais
* Formas de contato
* Chamadas para contratação/orçamento

A Landing Page deverá permitir que o visitante navegue pelos segmentos.

Exemplo conceitual:

```text
Forklin

├── Início
├── Sobre
├── Segmentos
│   ├── For Education
│   └── For Sales
├── Soluções
└── Contato / Orçamento
```

Os nomes e organização exatos das páginas podem seguir o design atual da Landing Page.

---

# 7. For Education dentro da Landing Page

O visitante poderá acessar a área:

```text
For Education
```

E visualizar as soluções disponíveis.

Por exemplo:

```text
For Education

Soluções
│
├── Diário Digital
├── Biblioteca
└── Controle de Patrimônio
```

Cada solução poderá possuir uma página ou seção explicando:

* O que é
* Para quem é
* Principais funcionalidades
* Benefícios
* Como funciona
* Como contratar

O objetivo não é permitir necessariamente o cadastro automático.

O CTA principal poderá direcionar para:

```text
Entrar em contato
Solicitar orçamento
Falar com a Forklin
```

---

# 8. For Sales dentro da Landing Page

O mesmo conceito será utilizado para:

```text
For Sales
```

O visitante poderá conhecer as soluções comerciais da Forklin.

A estrutura deverá ser preparada para permitir:

```text
For Sales
│
├── Solução A
├── Solução B
└── Solução C
```

Os produtos específicos poderão ser adicionados posteriormente.

---

# 9. App — Plataforma do cliente

Domínio:

```text
app.forklin.com.br
```

O `App` é o ambiente autenticado utilizado pelos clientes da Forklin.

Ele não é a Landing Page.

Ele representa o **portal de acesso às soluções contratadas**.

Exemplo:

```text
app.forklin.com.br
```

Após autenticar, o usuário poderá visualizar um dashboard personalizado.

Exemplo:

```text
Olá, Maria

Minha organização:
Rede Merino

Soluções disponíveis:

┌─────────────────────┐
│ Diário Digital      │
│ Acessar             │
└─────────────────────┘

┌─────────────────────┐
│ Biblioteca          │
│ Acessar             │
└─────────────────────┘
```

O usuário deve visualizar somente aquilo que possui autorização para acessar.

---

# 10. O App não deve ser confundido com os produtos

O `app.forklin.com.br` funciona como uma **porta de entrada central**.

Ele não precisa conter toda a lógica de negócio de cada produto.

Por exemplo:

```text
App
│
├── Diário Digital → sistema independente
├── Biblioteca → sistema independente
└── Patrimônio → sistema independente
```

O App apresenta os produtos aos quais o usuário possui acesso e inicia o fluxo de entrada neles.

---

# 11. Admin — Administração interna da Forklin

Domínio:

```text
admin.forklin.com.br
```

O Admin será uma aplicação separada destinada à equipe da Forklin.

Ele não deve ser confundido com o dashboard do cliente.

O Admin será utilizado para administrar a plataforma.

Exemplos de operações:

* Criar organizações
* Editar organizações
* Criar usuários
* Gerenciar usuários
* Vincular usuários às organizações
* Cadastrar segmentos
* Cadastrar soluções
* Vincular soluções às organizações
* Configurar acessos
* Configurar permissões
* Gerenciar convites
* Gerenciar status de organizações
* Gerenciar acessos aos produtos

---

# 12. Exemplo de utilização do Admin

Imagine que a Forklin fechou contrato com:

```text
Rede Merino
```

O Super Admin poderá acessar:

```text
admin.forklin.com.br
```

E cadastrar:

```text
Organização:
Rede Merino
```

Depois selecionar as soluções contratadas:

```text
For Education

☑ Diário Digital
☑ Biblioteca
☐ Controle de Patrimônio
```

Depois cadastrar usuários:

```text
Maria
João
Carlos
```

E definir seus acessos.

Por exemplo:

```text
Maria
└── Diário Digital
    └── Professora

João
└── Diário Digital
    └── Gestão

Carlos
└── Biblioteca
    └── Secretaria
```

---

# 13. Onde definir as permissões

As permissões não devem ser definidas simplesmente no cadastro global do usuário.

Elas devem estar relacionadas ao produto.

Conceitualmente:

```text
Usuário
    +
Organização
    +
Produto
    +
Role
```

Exemplo:

```text
Maria
    ↓
Rede Merino
    ↓
Diário Digital
    ↓
Professora
```

Isso permite que a mesma pessoa tenha diferentes funções em diferentes produtos.

Exemplo:

```text
Maria
│
├── Diário Digital
│   └── Professora
│
└── Biblioteca
    └── Administradora
```

---

# 14. Arquitetura geral

A arquitetura inicial deverá seguir aproximadamente:

```text
                         INTERNET
                             │
                             ▼
                    ┌─────────────────┐
                    │    Forklin      │
                    │ Landing Page    │
                    └────────┬────────┘
                             │
               ┌─────────────┴─────────────┐
               │                           │
               ▼                           ▼
        For Education                 For Sales
               │                           │
               └─────────────┬─────────────┘
                             │
                        Contato /
                       Contratação
                             │
                             ▼
                    ┌─────────────────┐
                    │    APP          │
                    │ app.forklin...  │
                    └────────┬────────┘
                             │
                         SSO / Auth
                             │
             ┌───────────────┼───────────────┐
             │               │               │
             ▼               ▼               ▼
       Diário Digital   Biblioteca      Outros produtos
             │               │               │
             ▼               ▼               ▼
       Diário API       Biblioteca API   Produto API
             │               │               │
             ▼               ▼               ▼
        Diário DB       Biblioteca DB    Produto DB


                    ┌─────────────────┐
                    │  ADMIN          │
                    │ admin.forklin   │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Central API     │
                    │ api.forklin     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   Core DB       │
                    └─────────────────┘
```

---

# 15. Central API

Domínio:

```text
api.forklin.com.br
```

A Central API será responsável pelas informações que pertencem à própria plataforma Forklin.

Ela será o ponto central para operações como:

* Autenticação
* Usuários
* Organizações
* Segmentos
* Soluções/produtos
* Acessos
* Roles
* Permissões
* Convites
* Informações de plataforma
* SSO
* Autorização central

A Central API não deve virar um proxy de todas as operações dos produtos.

---

# 16. O que pertence à Central API

Exemplos:

```text
POST /auth/login

GET /me

GET /organizations

GET /organizations/{id}

GET /products

GET /users

POST /users

GET /accesses

POST /invites
```

As rotas exatas poderão ser definidas durante a implementação.

O importante é separar claramente:

```text
Plataforma Forklin
```

de:

```text
Regra de negócio do produto
```

---

# 17. O que NÃO pertence à Central API

A Central API não deve necessariamente gerenciar todas as informações internas de cada produto.

Por exemplo, no Diário Digital:

```text
Alunos
Turmas
Professores
Chamadas
Notas
Frequência
Diários
```

Essas informações pertencem ao Diário Digital.

Da mesma forma, no sistema de Biblioteca:

```text
Livros
Autores
Exemplares
Empréstimos
Devoluções
Reservas
```

Essas informações pertencem à Biblioteca.

---

# 18. Produtos independentes

Cada produto poderá ser uma aplicação independente.

Exemplo:

```text
Diário Digital
│
├── Frontend
├── API
└── Database
```

E:

```text
Biblioteca
│
├── Frontend
├── API
└── Database
```

Isso permite evolução independente.

Por exemplo:

```text
Diário Digital
```

pode evoluir sem precisar alterar a aplicação:

```text
Biblioteca
```

---

# 19. Banco de dados central

O Core DB será o banco da plataforma.

Ele armazenará informações como:

```text
Users
Organizations
Segments
Products
OrganizationProducts
UserOrganization
UserProductAccess
Roles
Permissions
Invitations
Sessions / Auth data
```

Os nomes das tabelas podem ser definidos durante a implementação.

---

# 20. O que não deve ficar no Core DB

Não colocar no Core DB informações específicas do domínio de cada produto.

Por exemplo, o Core DB não deve armazenar:

```text
Diário Digital
├── alunos
├── turmas
├── chamadas
└── frequência
```

Nem:

```text
Biblioteca
├── livros
├── exemplares
└── empréstimos
```

Essas informações pertencem aos bancos dos respectivos produtos.

---

# 21. Bancos independentes dos produtos

Exemplo inicial:

```text
PostgreSQL
│
├── forkl​in_core
├── diario_digital
├── biblioteca
└── patrimonio
```

Esses bancos podem inicialmente estar dentro da mesma infraestrutura PostgreSQL.

Isso não significa que os sistemas sejam acoplados.

A separação lógica permite que posteriormente seja possível migrar para:

```text
PostgreSQL Core
PostgreSQL Diário
PostgreSQL Biblioteca
```

ou até infraestrutura separada.

A decisão inicial deve priorizar simplicidade e facilidade de manutenção.

---

# 22. Comunicação entre Frontend e Backend

Nenhum frontend deve acessar diretamente o PostgreSQL.

A comunicação deve seguir:

```text
Frontend
    ↓ HTTPS
Backend/API
    ↓
Database
```

Nunca:

```text
Frontend
    ↓
PostgreSQL
```

---

# 23. Comunicação do App com a Central API

O App poderá realizar chamadas para:

```text
https://api.forklin.com.br
```

Exemplo:

```text
App
   ↓
GET /me
   ↓
Central API
   ↓
Core DB
```

A API retorna as informações necessárias para montar o ambiente do usuário.

---

# 24. Comunicação do Admin com a Central API

O Admin também utilizará a mesma Central API.

```text
Admin
   ↓
Central API
   ↓
Core DB
```

Não criar inicialmente:

```text
admin-api
```

e:

```text
app-api
```

sem uma necessidade arquitetural real.

A Central API deve ser compartilhada entre os dois ambientes.

---

# 25. App e Admin são aplicações diferentes

Apesar de utilizarem a mesma API central:

```text
app.forklin.com.br
```

e:

```text
admin.forklin.com.br
```

serão aplicações separadas.

Conceitualmente:

```text
Forklin/
│
├── landing/
├── app/
├── admin/
├── api/
└── products/
```

Isso permite que cada aplicação tenha seu próprio:

* Frontend
* Rotas
* Componentes
* Layout
* Responsabilidades
* Controle de acesso

---

# 26. Estrutura de pastas

A estrutura esperada do ecossistema é aproximadamente:

```text
Forklin/
│
├── landing/
│   └── Landing Page atual
│
├── app/
│   └── Portal do cliente
│
├── admin/
│   └── Painel administrativo
│
├── api/
│   └── Central API
│
└── products/
    │
    ├── diario-digital/
    │   ├── frontend/
    │   ├── api/
    │   └── ...
    │
    ├── biblioteca/
    │   ├── frontend/
    │   ├── api/
    │   └── ...
    │
    └── outros/
```

### IMPORTANTE

A pasta onde este `PROJECT_CONTEXT.md` está localizado atualmente contém a Landing Page.

Isso **não significa que App, Admin, API e produtos devem ser criados dentro da pasta da Landing Page**.

O agente deve entender a pasta atual como o projeto da Landing Page e criar os demais projetos no nível apropriado da estrutura geral do ecossistema.

Não transformar:

```text
landing/
├── app/
├── admin/
├── api/
└── products/
```

na estrutura definitiva.

A intenção é:

```text
Forklin/
├── landing/
├── app/
├── admin/
├── api/
└── products/
```

---

# 27. Tecnologia

Stack inicial preferencial:

## Landing Page

```text
Next.js
TypeScript
```

---

## App

```text
Next.js
TypeScript
```

---

## Admin

```text
Next.js
TypeScript
```

---

## Central API

```text
Python
FastAPI
PostgreSQL
```

---

## APIs dos produtos

Preferencialmente:

```text
Python
FastAPI
PostgreSQL
```

Cada produto poderá evoluir sua própria arquitetura quando necessário.

---

# 28. Docker

Os serviços deverão ser preparados para execução utilizando Docker.

Exemplo:

```text
Docker
│
├── Landing
├── App
├── Admin
├── Central API
├── Product APIs
└── PostgreSQL
```

A infraestrutura deverá funcionar bem com:

```text
Docker
Dokploy
Traefik
Hostinger KVM/VPS
```

Cloudflare poderá ser utilizado quando fizer sentido para:

* DNS
* Proxy
* CDN
* Storage
* Arquivos
* Imagens
* Áudio
* Relatórios
* Segurança

Não adicionar serviços apenas porque são populares.

Cada tecnologia deve existir por uma necessidade concreta.

---

# 29. Autenticação

A autenticação será centralizada.

O usuário deverá conseguir autenticar na plataforma sem precisar manter uma conta independente em cada produto.

Fluxo conceitual:

```text
Usuário
   ↓
app.forklin.com.br
   ↓
Autenticação
   ↓
Central API
   ↓
Identidade confirmada
```

O mecanismo específico poderá ser:

* JWT
* Sessão
* OAuth2/OIDC
* Outra arquitetura segura

A decisão final deverá considerar segurança, simplicidade e evolução futura.

---

# 30. Não assumir que todo token consulta o banco

A validação de autenticação não deve ser descrita de forma simplificada como:

```text
Recebe token
↓
Consulta banco sempre
```

Dependendo da estratégia adotada, a API poderá validar criptograficamente um JWT sem consultar o banco em toda requisição.

Em outros casos, poderá utilizar sessões ou tokens de referência.

O importante é que:

* Autenticação seja validada no backend.
* Autorização seja validada no backend.
* O frontend nunca seja a autoridade final de segurança.

---

# 31. Autorização

Autenticar significa:

```text
Quem é você?
```

Autorizar significa:

```text
O que você pode fazer?
```

A Forklin precisa dos dois.

Exemplo:

```text
Maria está autenticada.
```

Isso não significa automaticamente que ela pode acessar:

```text
Diário Digital
```

A API deverá verificar os acessos apropriados.

---

# 32. SSO

A arquitetura deverá permitir Single Sign-On.

Exemplo:

```text
Usuário
   ↓
Login no App
   ↓
Dashboard
   ↓
Clica em Diário Digital
   ↓
Diário Digital reconhece a identidade
   ↓
Usuário entra sem digitar senha novamente
```

O mesmo conceito poderá ser utilizado para outros produtos.

---

# 33. Segurança do SSO

Não implementar SSO simplesmente enviando informações sensíveis pela URL.

Evitar algo conceitualmente como:

```text
diario.forklin.com.br?user=maria&role=professora
```

A identidade e as permissões devem ser transmitidas através de mecanismos seguros de autenticação/autorização.

O produto deve conseguir verificar que a identidade apresentada realmente foi emitida pela infraestrutura confiável da Forklin.

---

# 34. Acesso direto ao Admin

O usuário não deve receber acesso ao Admin apenas porque conhece a URL:

```text
admin.forklin.com.br
```

O backend deverá verificar autenticação e autorização.

Exemplo:

```text
Usuário comum
   ↓
admin.forklin.com.br
   ↓
Não autorizado
```

Enquanto:

```text
Super Admin
   ↓
admin.forklin.com.br
   ↓
Autorizado
```

A proteção não pode existir somente no frontend.

---

# 35. Multi-tenant

A plataforma deverá ser preparada para múltiplas organizações.

Exemplo:

```text
Forklin
│
├── Rede Merino
│
├── Escola ABC
│
└── Colégio XYZ
```

Os dados de uma organização não podem ser acessados por outra organização sem autorização.

A separação deve ser garantida principalmente pelo backend.

Não confiar apenas no frontend para esconder informações.

---

# 36. Exemplo de organização

Uma organização pode possuir:

```text
Organização:
Rede Merino
```

Produtos contratados:

```text
Diário Digital
Biblioteca
```

Usuários:

```text
Maria
João
Carlos
```

Acessos:

```text
Maria
└── Diário Digital
    └── Professora

João
└── Diário Digital
    └── Gestão

Carlos
└── Biblioteca
    └── Secretaria
```

---

# 37. Dashboard personalizado

Quando Maria acessar:

```text
app.forklin.com.br
```

ela não deve necessariamente visualizar todos os produtos existentes da Forklin.

Ela deverá visualizar somente aquilo que sua organização possui e aquilo que ela mesma possui autorização para utilizar.

Exemplo:

```text
Maria

Rede Merino

Soluções disponíveis:

[ Diário Digital ]
```

Enquanto João poderá visualizar:

```text
João

Rede Merino

Soluções disponíveis:

[ Diário Digital ]
[ Biblioteca ]
```

dependendo de seus acessos.

---

# 38. Produto e organização

É importante diferenciar:

```text
Produto contratado pela organização
```

de:

```text
Permissão individual do usuário
```

Exemplo:

A organização contratou:

```text
Diário Digital
```

Mas isso não significa que todos os usuários da organização automaticamente terão acesso.

Pode existir:

```text
Organização
    ↓
Contratou Diário Digital
```

e:

```text
Usuário A
    ↓
Tem acesso

Usuário B
    ↓
Não tem acesso
```

Essa separação é importante para o modelo de permissões.

---

# 39. Convites

Depois que a organização e os usuários forem configurados no Admin, a Forklin poderá enviar um convite por e-mail.

Fluxo:

```text
Admin
 ↓
Cria usuário
 ↓
Define organização
 ↓
Define acessos
 ↓
Envia convite
 ↓
Usuário recebe e-mail
 ↓
Acessa app.forklin.com.br
 ↓
Ativa/acessa sua conta
```

O provedor de e-mail poderá ser definido durante a implementação.

---

# 40. Produto acessado através do App

O fluxo esperado é:

```text
Usuário
 ↓
app.forklin.com.br
 ↓
Login
 ↓
Dashboard
 ↓
Seleciona Diário Digital
 ↓
SSO
 ↓
diario.forklin.com.br
```

O Diário Digital deverá receber/validar a identidade de forma segura.

Não depender de dados fornecidos pelo frontend para decidir:

```text
user_id
role
organization_id
```

sem validação.

---

# 41. Comunicação entre Central API e APIs dos produtos

Existirão situações em que um produto precisará consultar informações da plataforma central.

Exemplo:

```text
Diário Digital API
      ↓
Central API
      ↓
"Esse usuário possui acesso ao Diário Digital?"
```

Porém, não fazer toda operação do Diário Digital passar pela Central API.

Por exemplo:

```text
"Quais alunos estão na turma 5º A?"
```

deve ser responsabilidade do:

```text
Diário Digital API
```

e não da Central API.

---

# 42. Responsabilidades

## Central API

Responsável por:

```text
Identidade
Usuários
Organizações
Segmentos
Soluções
Acessos
Roles
Permissões
Convites
Autenticação
Autorização central
SSO
```

---

## Diário Digital API

Responsável por:

```text
Alunos
Professores
Turmas
Chamadas
Frequência
Diários
Relatórios
etc.
```

---

## Biblioteca API

Responsável por:

```text
Livros
Autores
Exemplares
Empréstimos
Devoluções
Reservas
etc.
```

---

# 43. Princípio de desacoplamento

Os produtos devem ser independentes o suficiente para evoluir sem depender diretamente da implementação interna dos outros produtos.

Por exemplo:

```text
Biblioteca
```

não deve importar código diretamente de:

```text
Diário Digital
```

Nem depender diretamente do banco de dados dele.

A comunicação entre sistemas deve ocorrer por APIs ou mecanismos de integração bem definidos.

---

# 44. Não criar complexidade prematuramente

A arquitetura deve ser preparada para crescimento, mas o MVP não deve ser transformado em uma infraestrutura excessivamente complexa.

Evitar criar inicialmente:

* Kubernetes
* Microserviços excessivos
* Múltiplas APIs sem necessidade
* Filas complexas sem necessidade
* Bancos separados em servidores diferentes sem necessidade
* Serviços distribuídos apenas por arquitetura "bonita"

O objetivo inicial é:

```text
Simples
+
Seguro
+
Organizado
+
Escalável
```

---

# 45. Infraestrutura inicial

A infraestrutura atual pode utilizar:

```text
Hostinger KVM
+
Docker
+
Dokploy
+
Traefik
+
PostgreSQL
```

Estrutura conceitual:

```text
Servidor
│
├── Traefik
│
├── Landing
├── App
├── Admin
├── Central API
├── Product APIs
│
└── PostgreSQL
```

A arquitetura deve permitir migração futura caso algum componente precise de infraestrutura própria.

---

# 46. Domínios

Domínios planejados:

```text
forklin.com.br
```

Landing Page.

```text
app.forklin.com.br
```

Portal do cliente.

```text
admin.forklin.com.br
```

Administração interna.

```text
api.forklin.com.br
```

Central API.

Produtos poderão possuir domínios próprios.

Exemplo:

```text
diario.forklin.com.br
```

ou outro padrão definido posteriormente.

---

# 47. Responsabilidade do banco central

O Core DB representa a estrutura da plataforma.

Ele responde perguntas como:

```text
Quem é o usuário?
```

```text
Qual organização ele pertence?
```

```text
Quais soluções a organização possui?
```

```text
Quais soluções o usuário pode acessar?
```

```text
Qual é o papel dele em determinado produto?
```

Não deve responder perguntas específicas do domínio dos produtos.

---

# 48. Responsabilidade do banco do produto

O banco do produto responde perguntas relacionadas ao próprio produto.

Exemplo:

```text
Diário Digital DB
```

responde:

```text
Quais alunos existem?
```

```text
Quais turmas existem?
```

```text
Qual foi a frequência?
```

Já:

```text
Biblioteca DB
```

responde:

```text
Quais livros existem?
```

```text
Qual exemplar está emprestado?
```

---

# 49. Backups

Os bancos deverão possuir estratégia de backup.

Inicialmente:

```text
Core DB
    → backup

Diário Digital DB
    → backup

Biblioteca DB
    → backup
```

Os backups deverão ser independentes o suficiente para permitir recuperação de um produto sem necessariamente restaurar todo o ecossistema.

---

# 50. Segurança

A arquitetura deve considerar desde o início:

* HTTPS
* Hash seguro de senhas
* Controle de acesso
* Validação de tokens
* Autorização no backend
* Proteção contra acesso entre organizações
* Rate limiting quando necessário
* Validação de entrada
* Proteção de secrets
* Variáveis de ambiente
* Logs
* Auditoria quando necessária
* Backups
* Princípio do menor privilégio

Secrets não devem ser armazenados diretamente no código.

---

# 51. Frontend não é autoridade de segurança

Nunca confiar em algo como:

```text
if (user.role === "admin") {
   mostrar botão
}
```

como mecanismo real de segurança.

Isso pode controlar a interface, mas não substitui a autorização no backend.

O backend deve verificar:

```text
Usuário autenticado?
```

```text
Usuário pertence à organização?
```

```text
Usuário possui acesso ao recurso?
```

```text
Usuário possui permissão para executar a operação?
```

---

# 52. API Keys

A arquitetura poderá futuramente suportar API Keys para integrações externas.

Isso é diferente do login normal dos usuários.

Exemplo:

```text
Empresa externa
      ↓
API Key
      ↓
API Forklin
```

Isso poderá permitir que sistemas externos consumam determinadas funcionalidades da Forklin.

Porém, API Keys não devem ser criadas apenas porque existe uma API.

Elas devem ser implementadas quando existir uma necessidade real de integração externa.

---

# 53. Integrações futuras

A arquitetura deve permitir futuramente integrações com:

* Sistemas escolares
* CRMs
* ERPs
* Sistemas de vendas
* Serviços de IA
* Serviços de armazenamento
* Serviços de e-mail
* Serviços de pagamento
* APIs externas

Essas integrações devem ser adicionadas conforme necessidade.

---

# 54. Termos importantes para o desenvolvimento

Utilizar consistentemente:

```text
Segment
```

para segmento.

```text
Organization
```

para organização/cliente.

```text
Product
```

ou:

```text
Solution
```

para solução/produto, mantendo consistência dentro do código.

```text
User
```

para usuário.

```text
Role
```

para papel.

```text
Permission
```

para permissão.

```text
Access
```

para vínculo de acesso.

---

# 55. Regra de acesso

A regra conceitual deve ser:

```text
Usuário
+
Organização
+
Produto
+
Permissão
=
Acesso permitido
```

Exemplo:

```text
Maria
+
Rede Merino
+
Diário Digital
+
Professora
=
Acesso
```

---

# 56. Fluxo completo do cliente

O fluxo completo esperado é:

```text
1. Visitante acessa

forklin.com.br

        ↓

2. Conhece a Forklin

        ↓

3. Escolhe um segmento

For Education
ou
For Sales

        ↓

4. Conhece as soluções

        ↓

5. Entra em contato

        ↓

6. Processo comercial personalizado

        ↓

7. Contratação

        ↓

8. Forklin cria a organização

        ↓

9. Forklin define as soluções contratadas

        ↓

10. Forklin cadastra os usuários

        ↓

11. Forklin define os acessos e permissões

        ↓

12. Usuário recebe convite

        ↓

13. Usuário acessa

app.forklin.com.br

        ↓

14. Usuário autentica

        ↓

15. Visualiza seu dashboard

        ↓

16. Visualiza suas soluções

        ↓

17. Seleciona uma solução

        ↓

18. SSO

        ↓

19. Entra no produto
```

---

# 57. Fluxo completo do Super Admin

```text
Super Admin
    ↓
admin.forklin.com.br
    ↓
Login
    ↓
Dashboard
    ↓
Organizações
    ↓
Criar organização
    ↓
Selecionar soluções
    ↓
Criar usuários
    ↓
Definir acessos
    ↓
Definir roles/permissões
    ↓
Enviar convites
    ↓
Organização fica ativa
```

---

# 58. Fluxo do usuário comum

```text
Usuário
    ↓
app.forklin.com.br
    ↓
Login
    ↓
Central API valida autenticação
    ↓
Sistema identifica organização
    ↓
Sistema identifica acessos
    ↓
Dashboard personalizado
    ↓
Usuário escolhe solução
    ↓
SSO
    ↓
Produto
```

---

# 59. Estado atual do projeto

O projeto existente neste momento deve ser entendido como:

```text
Landing Page da Forklin
```

Ela é o ponto de partida do ecossistema.

Os seguintes componentes ainda podem precisar ser criados:

```text
App
Admin
Central API
Core DB
Estrutura dos produtos
```

Portanto, não assumir que esses sistemas já existem.

Não criar explicações ou modificações baseadas em uma suposta implementação que não esteja presente.

---

# 60. Regra importante sobre a Landing Page existente

A Landing Page atual deve ser preservada.

Antes de alterar componentes existentes:

* Entender a estrutura atual.
* Identificar a tecnologia utilizada.
* Entender o design existente.
* Reutilizar componentes quando fizer sentido.
* Evitar reescrever partes que não precisam ser modificadas.

A Landing Page é um projeto próprio.

Não transformar a Landing Page em um monorepo improvisado contendo toda a plataforma dentro dela.

---

# 61. Primeira tarefa do agente

Antes de começar a implementar todo o ecossistema, o agente deve:

### 1. Entender este documento

Compreender:

* A visão da Forklin
* Segmentos
* Soluções
* Organizações
* Usuários
* App
* Admin
* Central API
* Produtos independentes
* Autenticação
* SSO
* Multi-tenancy

### 2. Verificar a estrutura atual

Entender a Landing Page que existe atualmente.

### 3. Propor a estrutura geral

Apresentar uma proposta semelhante a:

```text
Forklin/
├── landing/
├── app/
├── admin/
├── api/
└── products/
```

A estrutura exata pode ser ajustada conforme o projeto existente.

### 4. Definir o plano de implementação

Apresentar a ordem recomendada de construção.

Por exemplo:

```text
1. Estrutura dos projetos
2. Core DB
3. Central API
4. Autenticação
5. Admin
6. Organização/usuários/acessos
7. App
8. SSO
9. Integração com produtos
```

### 5. Somente depois implementar

Não começar criando dezenas de arquivos e aplicações sem antes apresentar o plano.

---

# 62. Ordem recomendada de construção

Uma ordem inicial razoável é:

```text
FASE 1
Estrutura geral
```

```text
FASE 2
Core DB
```

```text
FASE 3
Central API
```

```text
FASE 4
Autenticação
```

```text
FASE 5
Admin
```

```text
FASE 6
Organizações
```

```text
FASE 7
Usuários e acessos
```

```text
FASE 8
App do cliente
```

```text
FASE 9
SSO
```

```text
FASE 10
Integração com produtos
```

---

# 63. Não implementar tudo de uma vez

O objetivo deste documento é orientar a arquitetura.

Não significa que todo o ecossistema precise ser construído em uma única etapa.

O agente deve implementar incrementalmente.

Cada etapa deve ser validada antes de avançar quando houver dependências importantes.

---

# 64. Arquitetura preparada para crescimento

A Forklin deve começar simples, mas não deve ser construída de maneira que dificulte sua evolução.

A arquitetura deve permitir futuramente:

```text
Mais segmentos
        ↓
Mais soluções
        ↓
Mais organizações
        ↓
Mais usuários
        ↓
Mais produtos
        ↓
Mais infraestrutura
```

Sem precisar reconstruir completamente a plataforma.

---

# 65. Visão futura

A visão de longo prazo é:

```text
                         FORKLIN
                            │
          ┌─────────────────┴─────────────────┐
          │                                   │
   FOR EDUCATION                         FOR SALES
          │                                   │
     ┌────┼────┐                         ┌────┼────┐
     │    │    │                         │    │    │
  Diário Bib. Patrimônio                ...  ...  ...
     │
     │
     └──────────────┐
                    │
                    ▼
              Plataforma
                 Forklin
                    │
          ┌─────────┴─────────┐
          │                   │
        APP                 ADMIN
          │                   │
          └─────────┬─────────┘
                    │
               Central API
                    │
                 Core DB
```

A Forklin deve ser capaz de adicionar novos produtos sem transformar todos os sistemas em uma única aplicação.

---

# 66. Princípios fundamentais

Durante o desenvolvimento, seguir estes princípios:

### 1. Separação de responsabilidades

Cada sistema deve possuir uma responsabilidade clara.

### 2. Segurança no backend

Nunca confiar somente no frontend.

### 3. Produtos independentes

Cada produto deve possuir seu próprio domínio e regras de negócio.

### 4. Core central

O Core deve armazenar informações da plataforma, não toda a lógica dos produtos.

### 5. SSO

O usuário deve conseguir navegar entre os produtos sem precisar realizar múltiplos logins.

### 6. Multi-tenancy

Organizações diferentes devem permanecer isoladas.

### 7. Simplicidade

Não adicionar complexidade antes de existir necessidade.

### 8. Escalabilidade

Construir de maneira que novos produtos e segmentos possam ser adicionados.

### 9. Segurança

Autenticação, autorização, secrets e dados devem ser tratados corretamente desde o início.

### 10. Modularidade

Landing, App, Admin, API e Produtos devem poder evoluir de maneira relativamente independente.

---

# 67. Resumo da arquitetura

A arquitetura final pode ser resumida assim:

```text
                    FORKLIN
                       │
          ┌────────────┴────────────┐
          │                         │
   Landing Page                Plataforma
          │                         │
          │                  ┌──────┴──────┐
          │                  │             │
          │                 App          Admin
          │                  │             │
          │                  └──────┬──────┘
          │                         │
          │                    Central API
          │                         │
          │                      Core DB
          │
          ├── For Education
          │       │
          │       ├── Diário Digital
          │       ├── Biblioteca
          │       └── Patrimônio
          │
          └── For Sales
                  │
                  └── Soluções futuras
```

---

# 68. Visão final

A Forklin não deve ser construída como apenas um site ou como apenas um sistema.

A visão é:

```text
Forklin
=
Plataforma
+
Segmentos
+
Soluções
+
Organizações
+
Usuários
+
Acessos
+
SSO
+
Produtos independentes
```

O visitante começa em:

```text
forklin.com.br
```

Conhece a empresa e seus segmentos:

```text
For Education
For Sales
```

Conhece as soluções.

Entra em contato com a Forklin.

Após a contratação, a organização é configurada internamente.

O cliente recebe acesso a:

```text
app.forklin.com.br
```

Nesse ambiente, encontra apenas as soluções às quais possui acesso.

Ao selecionar uma solução, entra no sistema correspondente através de autenticação/SSO.

Enquanto isso, a equipe da Forklin utiliza:

```text
admin.forklin.com.br
```

para administrar:

```text
Organizações
Usuários
Segmentos
Soluções
Acessos
Roles
Permissões
Convites
```

Toda essa estrutura é sustentada pela:

```text
api.forklin.com.br
```

e pelo:

```text
Core DB
```

Enquanto cada produto mantém sua própria lógica de negócio, API e banco de dados.

---

# 69. Regra final para o agente

Antes de implementar qualquer coisa, compreenda a seguinte ideia:

> **A Landing Page é a porta pública e comercial da Forklin.**
>
> **O App é a porta de entrada dos clientes.**
>
> **O Admin é a ferramenta interna da Forklin.**
>
> **A Central API é a camada central da plataforma.**
>
> **Os produtos são sistemas independentes conectados ao ecossistema.**
>
> **For Education e For Sales são os segmentos atuais.**
>
> **O cliente inicialmente entra em contato com a Forklin e passa por um processo comercial/onboarding personalizado antes de receber acesso.**

A implementação deve respeitar essa separação.

Não criar sistemas desnecessários.

Não colocar todos os produtos dentro da Landing Page.

Não colocar toda a lógica dos produtos na Central API.

Não permitir que o frontend seja responsável pela segurança.

Não assumir que sistemas que ainda não existem já estão implementados.

Primeiro compreender → propor estrutura → apresentar plano → validar → implementar.
