# 📝 Sistema de Gerenciamento de Tarefas (Task List)

> 🚀 **Status do Projeto:** Backend com CRUD completo e arquitetura em camadas implementada; novas evoluções e interface frontend em planejamento.

API RESTful para gerenciamento de tarefas, desenvolvida com foco em boas práticas de arquitetura de software, desacoplamento de responsabilidades e evolução incremental. O projeto utiliza **Node.js**, **Express**, **Prisma ORM**, **SQLite** (via driver de alta performance `better-sqlite3`) e **Zod** para validação estrita de dados.

---

## 🎯 Proposta do Projeto & Evolução Arquitetural

A proposta central deste repositório não é apenas fornecer uma lista de tarefas convencional, mas demonstrar a **evolução prática de um projeto de software** — partindo de protótipos enxutos até uma arquitetura escalável e estruturada em camadas.

### 📈 Jornada Arquitetural Concluída:
A aplicação superou a fase inicial (onde regras e dados ficavam centralizados nas rotas) e adota agora uma **Arquitetura em Camadas (Layered Architecture)** bem definida:

- **Routes (`src/routes`):** Mapeamento declarativo dos endpoints e injeção de middlewares de validação.
- **Middlewares (`src/middleware`):** Validação automática e sanitização dos dados da requisição (body e params) via schemas Zod antes de atingir os controllers.
- **Controllers (`src/controller`):** Recepção de requisições HTTP, formatação de respostas e códigos de status adequados (`200`, `201`, `400`, `404`, `500`).
- **Services (`src/services`):** Regras de negócio e orquestração de fluxos (ex.: verificação de existência com `#findOrFail`).
- **Repositories (`src/repository`):** Abstração de persistência e acesso a dados isolados com Prisma Client.

---

## 🛠️ Tecnologias Utilizadas

- **Runtime:** [Node.js](https://nodejs.org/) (v18+)
- **Framework Web:** [Express](https://expressjs.com/) (v5)
- **ORM:** [Prisma ORM](https://www.prisma.io/) (v7)
- **Banco de Dados:** [SQLite](https://www.sqlite.org/) com adaptador nativo C++ (`@prisma/adapter-better-sqlite3` e `better-sqlite3`)
- **Validação de Dados:** [Zod](https://zod.dev/)
- **Variáveis de Ambiente:** [dotenv](https://github.com/motdotla/dotenv)

---

## 📂 Estrutura do Projeto

```text
Lista de Tarefas/
├── backend/
│   ├── prisma/
│   │   ├── migrations/             # Histórico de migrações do banco de dados
│   │   └── schema.prisma           # Definição do schema e entidades do Prisma
│   ├── src/
│   │   ├── controller/             # Controladores HTTP (TaskController)
│   │   ├── lib/                    # Instância e configuração do Prisma Client
│   │   ├── middleware/             # Middlewares express (validação com Zod)
│   │   ├── repository/             # Camada de persistência e consultas (TaskRepository)
│   │   ├── routes/                 # Definição e registro de rotas Express
│   │   ├── schemas/                # Schemas de validação Zod (body e params)
│   │   ├── services/               # Regras de negócio da aplicação (TaskService)
│   │   └── server.js               # Ponto de entrada da aplicação Express
│   ├── .env                        # Variáveis de ambiente locais
│   └── package.json                # Dependências e scripts do backend
├── docs/
│   └── Evoluções/                  # Documentação detalhada de evolução e roadmap
│       └── evolutions.md
├── frontend/                       # (Em estruturação) Interface de usuário da aplicação
└── README.md                       # Documentação principal do projeto
```

---

## 📊 Modelo de Dados (`Task`)

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | `Int` | Sim (PK) | Identificador único autoincrementado |
| `task` | `String` | Sim | Descrição/título da tarefa (1 a 200 caracteres) |
| `due_date` | `DateTime` | Sim | Data e hora de vencimento (padrão ISO 8601) |
| `completed` | `Boolean` | Não (default `false`) | Status de conclusão da atividade |
| `priority` | `Enum` | Não | Nível de urgência: `LOW`, `MEDIUM`, `HIGH`, `URGENT` |
| `estimated_duration_minutes` | `Int` | Não | Duração estimada em minutos (inteiro positivo) |
| `createdAt` | `DateTime` | Sim (default `now()`) | Data de criação do registro |

---

## 🚀 Como Rodar o Projeto

### 📋 Pré-requisitos
- **Node.js** (v18 ou superior recomendado)
- **npm** (incluso com o Node.js)

### 1️⃣ Clonar o repositório e entrar no backend
```bash
git clone <url-do-repositorio>
cd "Lista de Tarefas/backend"
```

### 2️⃣ Instalar dependências
```bash
npm install
```

### 3️⃣ Configurar as variáveis de ambiente
Crie um arquivo `.env` dentro da pasta `backend`:
```env
DATABASE_URL="file:./tasks.db"
```

### 4️⃣ Executar as migrações do banco
Execute as migrações do Prisma para criar ou sincronizar a base SQLite local:
```bash
npx prisma migrate dev
```

*(Caso o banco já esteja migrado, gere os artefatos do client com `npx prisma generate`).*

### 5️⃣ Iniciar o servidor
Execute o servidor em modo de desenvolvimento:
```bash
npm run dev
```

O servidor estará disponível em: `http://localhost:3000`.

---

## 📌 Endpoints da API

### 1. Verificação / Health Check
- **GET** `/`
- **Resposta (200 OK):**
  ```json
  {
    "message": "Hello World"
  }
  ```

---

### 2. Criar Nova Tarefa
- **POST** `/tasks`
- **Body (JSON):**
  ```json
  {
    "task": "Preparar apresentação comercial",
    "due_date": "2026-10-15T14:00:00.000Z",
    "priority": "HIGH",
    "estimated_duration_minutes": 90
  }
  ```
- **Resposta Sucesso (201 Created):**
  ```json
  {
    "id": 1,
    "task": "Preparar apresentação comercial",
    "due_date": "2026-10-15T14:00:00.000Z",
    "completed": false,
    "priority": "HIGH",
    "estimated_duration_minutes": 90,
    "createdAt": "2026-10-12T16:30:00.000Z"
  }
  ```
- **Resposta Erro de Validação (400 Bad Request):**
  ```json
  {
    "message": "Dados inválidos",
    "errors": [
      {
        "field": "task",
        "message": "A tarefa é obrigatória"
      }
    ]
  }
  ```

---

### 3. Listar Todas as Tarefas
- **GET** `/tasks`
- **Resposta (200 OK):**
  ```json
  [
    {
      "id": 1,
      "task": "Preparar apresentação comercial",
      "due_date": "2026-10-15T14:00:00.000Z",
      "completed": false,
      "priority": "HIGH",
      "estimated_duration_minutes": 90,
      "createdAt": "2026-10-12T16:30:00.000Z"
    }
  ]
  ```

---

### 4. Consultar Tarefa por ID
- **GET** `/tasks/:id`
- **Resposta Sucesso (200 OK):**
  ```json
  {
    "id": 1,
    "task": "Preparar apresentação comercial",
    "due_date": "2026-10-15T14:00:00.000Z",
    "completed": false,
    "priority": "HIGH",
    "estimated_duration_minutes": 90,
    "createdAt": "2026-10-12T16:30:00.000Z"
  }
  ```
- **Resposta Não Encontrada (404 Not Found):**
  ```json
  {
    "message": "Tarefa não encontrada"
  }
  ```

---

### 5. Atualizar Tarefa Parcialmente
- **PATCH** `/tasks/:id`
- **Body (JSON) — Todos os campos são opcionais:**
  ```json
  {
    "completed": true,
    "priority": "URGENT"
  }
  ```
- **Resposta Sucesso (200 OK):**
  ```json
  {
    "id": 1,
    "task": "Preparar apresentação comercial",
    "due_date": "2026-10-15T14:00:00.000Z",
    "completed": true,
    "priority": "URGENT",
    "estimated_duration_minutes": 90,
    "createdAt": "2026-10-12T16:30:00.000Z"
  }
  ```

---

### 6. Excluir Tarefa
- **DELETE** `/tasks/:id`
- **Resposta Sucesso (200 OK):**
  ```json
  {
    "message": "Tarefa excluída com sucesso"
  }
  ```
- **Resposta Não Encontrada (404 Not Found):**
  ```json
  {
    "message": "Tarefa não encontrada"
  }
  ```

---

## 🔮 Roadmap do Projeto

Consulte a documentação completa de requisitos em [`docs/Evoluções/evolutions.md`](docs/Evoluções/evolutions.md).

### ✅ Implementado:
- [x] CRUD completo de tarefas (`POST`, `GET`, `GET :id`, `PATCH :id`, `DELETE :id`).
- [x] Separação de responsabilidades em camadas (`Controller`, `Service`, `Repository`, `Routes`).
- [x] Validação rigorosa de payloads e parâmetros com middleware Zod.
- [x] Tratamento de erros HTTP padronizado (`400`, `404`, `500`).
- [x] Sistema de Prioridades de tarefas (`LOW`, `MEDIUM`, `HIGH`, `URGENT`).
- [x] Estimativa de duração de tarefas em minutos (`estimated_duration_minutes`).

### 🔜 Próximas Funcionalidades:
- [ ] **Tags e Categorização:** Associação de múltiplas tags/categorias por tarefa (Trabalho, Pessoal, Estudos).
- [ ] **Subtarefas:** Divisão de atividades em subtarefas com rastreamento percentual de progresso.
- [ ] **Recorrência Inteligente:** Criação periódica automática (diária, dias úteis, semanal, mensal).
- [ ] **Planejamento Inteligente:** Algoritmo para sugerir ordem de execução baseado em tempo disponível, prazo e prioridade.
- [ ] **Criação Rápida com Linguagem Natural:** Interpretação textual inteligente para extrair prazos, prioridades e durações.
- [ ] **Interface Frontend:** Desenvolvimento da interface gráfica moderna para consumo da API.

---

Desenvolvido para fins de aprendizado, arquitetura de software e produtividade contínua! 🚀
