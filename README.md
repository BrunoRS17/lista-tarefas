# 📝 Backend - Lista de Tarefas (Task List)

> ⚠️ **Status do Projeto:** Em andamento 🚧

Este é um projeto de API RESTful para gerenciamento de tarefas (Task List), desenvolvido com **Node.js**, **Express**, **Prisma ORM** e **SQLite**.

---

## 🎯 Proposta do Projeto & Evolução Arquitetural

A proposta principal deste repositório **não é apenas entregar um sistema de tarefas**, mas sim **demonstrar a evolução prática de um projeto de software**.

### 📈 A Jornada de Evolução:
1. **Fase Inicial (Atual):** O projeto nasce de forma simples e direta, sem camadas complexas de abstração. As regras de negócio e acessos ao banco de dados residem diretamente no manipulador de rotas.
2. **Refatoração & Arquitetura em Camadas:** Conforme o projeto cresce, o código é gradualmente refatorado para padrões mais estruturados (Clean Architecture / Layered Architecture), separando as responsabilidades em:
   - **Controllers:** Responsáveis por receber requisições e retornar respostas HTTP.
   - **Services:** Onde reside a regra de negócio da aplicação.
   - **Repositories:** Abstração para manipulação e persistência de dados.
   - **Routes:** Definição puramente declarativa dos caminhos/endpoints da API.

---

## 🛠️ Tecnologias Utilizadas

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework Web:** [Express](https://expressjs.com/)
- **ORM:** [Prisma ORM (v7)](https://www.prisma.io/)
- **Banco de Dados:** [SQLite](https://www.sqlite.org/) (via adaptador de alta performance `@prisma/adapter-better-sqlite3` e `better-sqlite3`)
- **Variáveis de Ambiente:** [dotenv](https://github.com/motdotla/dotenv)

---

## 📂 Estrutura do Projeto

```text
backend/
├── prisma/
│   ├── migrations/      # Histórico de migrações do banco de dados
│   └── schema.prisma    # Definição das tabelas e modelos do Prisma
├── src/
│   ├── controller/      # (Em evolução) Controllers da aplicação
│   ├── lib/
│   │   └── prisma.js    # Instância centralizada do Prisma Client
│   ├── repository/      # (Em evolução) Camada de dados / acesso ao banco
│   ├── routes/
│   │   └── task.js      # Rotas de tarefas
│   ├── services/        # (Em evolução) Regras de negócio
│   └── server.js        # Ponto de entrada da aplicação Express
├── .env                 # Variáveis de ambiente
├── package.json         # Dependências e scripts do projeto
└── README.md            # Documentação do projeto
```

---

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para configurar e rodar o projeto localmente em sua máquina.

### 📋 Pré-requisitos
- **Node.js** (v18 ou superior recomendado)
- **npm** (incluso no Node.js)

### 1️⃣ Clonar e Acessar o Repositório
```bash
git clone <url-do-repositorio>
cd backend
```

### 2️⃣ Instalar as Dependências
```bash
npm install
```

### 3️⃣ Configurar as Variáveis de Ambiente
Certifique-se de ter um arquivo `.env` na raiz do projeto `backend` contendo a URL de conexão com o SQLite:

```env
DATABASE_URL="file:./tasks.db"
```

### 4️⃣ Executar as Migrações e Gerar o Prisma Client
Para aplicar as migrações no banco SQLite local (`tasks.db`) e gerar o cliente do Prisma:

```bash
npx prisma migrate dev
```

*(Se o arquivo do banco SQLite já existir, o cliente pode ser atualizado com `npx prisma generate`).*

### 5️⃣ Iniciar o Servidor
Execute o comando abaixo para subir o servidor em modo de desenvolvimento:

```bash
npm run dev
```

Se tudo estiver correto, você verá no terminal:
```text
Example app listening on port 3000
```

A API estará acessível em `http://localhost:3000`.

---

## 📌 Endpoints da API

### 1. Verification / Health Check
- **GET** `/`
- **Resposta:**
  ```json
  {
    "message": "Hello World"
  }
  ```

### 2. Criar uma Nova Tarefa
- **POST** `/tasks`
- **Body (JSON):**
  ```json
  {
    "task": "Estudar Arquitetura de Software",
    "due_date": "2026-10-15T00:00:00.000Z"
  }
  ```
- **Resposta Sucesso (200 OK):**
  ```json
  {
    "id": 1,
    "task": "Estudar Arquitetura de Software",
    "due_date": "2026-10-15T00:00:00.000Z",
    "completed": false,
    "createdAt": "2026-09-29T17:00:00.000Z"
  }
  ```

---

## 🔮 Próximos Passos & Roadmap

- [ ] Implementar a listagem de tarefas (`GET /tasks`).
- [ ] Implementar atualização de tarefas e marcar como concluída (`PUT /tasks/:id` ou `PATCH /tasks/:id`).
- [ ] Implementar remoção de tarefas (`DELETE /tasks/:id`).
- [ ] Extrair lógica das rotas para as camadas `Controller`, `Service` e `Repository`.
- [ ] Adicionar validação de dados de entrada e tratamento centralizado de erros.

---

Desenvolvido para fins de aprendizado e evolução prática de arquitetura de software! 🚀
