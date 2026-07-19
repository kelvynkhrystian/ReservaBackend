# ReservaBackend

API REST desenvolvida em **Node**, **TypeScript** e **Express**, responsável pelo gerenciamento de reservas, usuários, autenticação e configurações do sistema.

O projeto utiliza arquitetura em camadas para facilitar manutenção, escalabilidade e organização do código.

---

# Tecnologias

- Node
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT (JSON Web Token)
- Bcrypt
- Zod
- Helmet
- CORS
- Express Rate Limit
- Dotenv

---

# Estrutura do Projeto

```
src
│
├── controllers
│
├── middlewares
│
├── routes
│
├── services
│
├── lib
│
├── @types
│
├── app.ts
│
└── server.ts

prisma
dist
```

### Controllers

Responsáveis por receber as requisições HTTP e retornar as respostas da API.

---

### Services

Contêm toda a lógica de negócio da aplicação.

---

### Routes

Responsáveis pelo mapeamento das rotas da API.

---

### Middlewares

Utilizados para autenticação, tratamento de requisições e validações.

---

### Prisma

Responsável pelo acesso ao banco de dados utilizando ORM.

---

# Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto.

```env
PORT=3456

DATABASE_URL=

DIRECT_URL=

JWT_SECRET=
```

---

# Instalação

Clone o repositório:

```bash
git clone https://github.com/kelvynkhrystian/ReservaBackend.git
```

Entre na pasta:

```bash
cd ReservaBackend
```

Instale as dependências:

```bash
npm install
```

---

# Executando o Projeto

Modo desenvolvimento:

```bash
npm run dev
```

Gerar build:

```bash
npm run build
```

Executar produção:

```bash
npm start
```

---

# Scripts

```bash
npm run dev
```

Inicia o servidor em modo desenvolvimento.

```bash
npm run build
```

Compila o projeto TypeScript.

```bash
npm start
```

Executa a aplicação compilada.

```bash
npm run lint
```

Executa o ESLint.

```bash
npm run lint:fix
```

Corrige automaticamente problemas encontrados pelo ESLint.

---

# Recursos Utilizados

- Arquitetura em camadas
- Autenticação com JWT
- Senhas criptografadas com Bcrypt
- Validação de dados utilizando Zod
- Rate Limiting
- Proteção com Helmet
- Suporte a CORS
- ORM Prisma
- Variáveis de ambiente com Dotenv
- TypeScript

---

# Licença

Projeto desenvolvido para fins de estudo e utilização própria.
