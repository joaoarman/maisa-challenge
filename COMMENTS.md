
# +A Educação - Full Stack Web Developer - CHALLENGE


## 1. Decisão de arquitetura utilizada:

### Backend - Estrutura de Camadas
O backend foi desenvolvido seguindo os princípios da Clean Architecture e padrões REST, utilizando uma estrutura em camadas que separa as responsabilidades e facilita a manutenção do código.

**Fluxo de dados:**

Request → Routes → Middlewares → Controller → Service → Repository → Database

Response ← Controller ← Service ← Repository

**Routes (Rotas)**
   - Ponto de entrada da aplicação
   - Define os endpoints da API
   - Gerencia o roteamento das requisições e chama o controller correspondete

**Controllers (Controladores)**
   - Recebe as requisições das rotas
   - Valida os dados de entrada usando Zod
   - Coordena o fluxo entre as camadas de serviço

**Services (Serviços)**
   - Contém a lógica de negócio da aplicação

**Repositories (Repositórios)**
   - Camada de abstração para acesso ao banco de dados
   - Nesse contexto está utilizando consultas SQL puras, sem o uso se ORMs
   - Isola a lógica de persistência de dados

**Models (Modelos)**
   - Define a estrutura dos dados
   - Valida os atributos das entidades

**Middlewares**
   - Processa requisições antes dos controladores
   - Implementa autenticação JWT
   - Gerencia validações globais e tratamento de erros

**Config**
   - Centraliza configurações da aplicação
   - Configura conexões com banco de dados

## Por que essa Arquitetura?
Essa arquitetura foi escolhida principalmente por, além de ser um padrão famoso e bastante utilizado no mercado, separar as responsabilidades de forma clara e manter o código limpo. Ela também facilita a manutenção e permite a implementação de testes de forma isolada. 

Usei a camada de model, junto com o ZOD para facilitar a validação dos dados recebidos nos controllers, mantendo a organização e evitando condições desnecessárias no código.

O uso de SQL puro nos repositories foi apenas uma preferência, pois estou acostumado e sinto ter mais controle das consultas. Nesse caso não faria tanta diferença, mas em consultas grandes e com muitos JOINs poderia impactar o desempenho. 

Utilizei o Sequelize para criar seeders e migrations, e não como o ORM completo. As migrations e as seeders são acionadas sempre que o servidor é iniciado.

### Frontend
O frontend possui três camadas principais:

**Services:** responsável por toda a comunicação com o backend

**Views:** componentes que representam páginas completas da aplicação

**Router:** responsável pelo gerenciamento de navegação da aplicação, definindo as rotas disponíveis e suas respectivas views








## 2. Tecnologias Utilizadas:

Tecnologias, ferramentas e bibliotecas utilizadas e suas funções no sistema:

- **Node.js + Express:** construção da API REST;
- **MySQL:** banco de dados relacional;
- **JWT + bcryptjs:** autenticação segura com tokens e criptografia de senhas;
- **Zod:** validação de dados com models/schemas;
- **Jest:** framework de testes 
- **Dotenv:** gerenciamento de variáveis de ambiente
- **Sequelize:** utilizado apenas para migrations e seeders (consultas SQL por exemplo, não foram feitas utilizando o)
- **Vue.js + Vuetify + Axios:** interface e requisições à API
- **Material Design Icons (MDI):** icones
- **Vite:** utilizado para criar o projeto vue.js



## 3. O que faria se tivesse mais tempo::
- Pensaria em utilizar Nest com TypeScript 
- Implementaria mais testes
- Utilizaria i18n para a internacionalização
- Melhoraria a documentação da API




## 4. Quais requisitos obrigatórios que não foram entregues
Acredito que todos os requisitos obrigatórios tenham sido entregues com sucesso.
Outros requisitos também foram entregues, como alguns testes de unidade, a autenticação e a autorização.