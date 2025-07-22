# Desafio Winnin API

API desenvolvida como parte do desafio para vaga de Engenheiro Backend Node.js Sênior. Este projeto implementa uma API para gerenciamento de usuários, produtos e pedidos.

## Plano para o desenvolvimento e motivação para as escolhas

Para este desenvolvimento, escolhi o Clean Architecture pela familiaridade com esta arquitetura, pois estou utilizando ultimamente. Apesar de o projeto ser simples, achei legal desenvolver nesta arquitetura para compartilhar o conhecimento.

Inicialmente criei o projeto em REST.

Como utilizei use-cases, utilizei estes mesmos use-cases nas chamdas GraphQL. Isso tornou o projeto flexível podendo ter a camada de aplicação sendo utilizada por uma infraestrutura tanto REST como GraphQL.

Neste caso, a criação de pedido ficou em um único use-case, contendo o controle de transações.

Tentei manter o máximo quanto aos principios de OOP, SOLID, Clean Architecture e DDD.

Foi utilizada IA para as instruções de execução do projeto em uma sessão mais abaixo.


## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **NestJS**: Framework para construção de aplicações escaláveis
- **TypeScript**: Linguagem de programação tipada
- **PostgreSQL**: Banco de dados relacional
- **TypeORM**: ORM para interação com o banco de dados
- **GraphQL**: API Query Language para consultas flexíveis
- **Docker**: Containerização da aplicação

## Arquitetura e Padrões

O projeto segue os princípios da **Clean Architecture** e **DDD**, organizando o código em camadas:

### Camadas da Aplicação

1. **Domain**: Contém as entidades de domínio e regras de negócio centrais
   - Entidades: `User`, `Product`, `Order`, `OrderItem`
   - Interfaces de domínio

2. **Application**: Implementa os casos de uso da aplicação
   - Use Cases: `CreateUserUseCase`, `FindUserByIdUseCase`, `CreateOrderUseCase`, etc.
   - Interfaces de repositórios e serviços
   - Commands para padronização de entrada de dados

3. **Infrastructure**: Implementações concretas de interfaces e adaptadores
   - Persistência: Implementações TypeORM dos repositórios
   - GraphQL: Resolvers e tipos GraphQL
   - Configuração: Módulos NestJS, configuração de banco de dados, etc.

### Padrões de Design Utilizados

- **Repository Pattern**: Abstração da camada de persistência
- **Dependency Injection**: Inversão de controle para melhor testabilidade
- **Command Pattern**: Encapsulamento de solicitações como objetos
- **Unit of Work**: Gerenciamento de transações através de abstrações
- **Mapper Pattern**: Conversão entre entidades de domínio e modelos de persistência

### Destaques de Implementação

- **Abstração de Transações**: Implementação de `ITransactionManager` e `ITransactionService` para desacoplar o código de negócio da infraestrutura de banco de dados
- **Encapsulamento de Persistência**: Operações de banco de dados encapsuladas nos repositórios
- **Validações de Negócio**: Regras como validação de e-mail único implementadas nos casos de uso
- **API Dual**: Suporte simultâneo para REST (via controllers) e GraphQL (via resolvers)

## Executando o Projeto

### Pré-requisitos

- Docker e Docker Compose instalados

### Passos para Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/desafio-winnin-api.git
   cd desafio-winnin-api
   ```

2. Execute a aplicação com Docker Compose:
   ```bash
   docker-compose up
   ```

   Isso irá:
   - Criar um container PostgreSQL na porta 5432
   - Criar um container para a API na porta 3000
   - Executar as migrações do banco de dados automaticamente
   - Iniciar a aplicação

3. Acesse as interfaces:
   - GraphQL Playground: http://localhost:3000/graphql
   - Documentação Swagger: http://localhost:3000/api/doc

### Variáveis de Ambiente

As principais variáveis de ambiente estão configuradas no arquivo `docker-compose.yml`. Caso precise personalizar, crie um arquivo `.env` baseado no `.env.example`.

## Exemplos de Uso

### GraphQL

**Criar um usuário:**
```graphql
mutation {
  createUser(input: {
    name: "João Silva",
    email: "joao.silva@email.com"
  }) {
    id
    name
    email
  }
}
```

**Buscar todos os usuários:**
```graphql
query {
  users {
    id
    name
    email
    created_at
  }
}
```

**Buscar um usuário específico por Id:**
```graphql
query {
  user(id: 1) {
    id
    name
    email
    created_at
  }
}
```

**Buscar um usuário específico com seus pedidos:**
```graphql
query {
  user(id: 1) {
    id
    name
    email
    orders {
      id
      total
      created_at
    }
  }
}
```

**Criar um produto:**
```graphql
mutation {
  createProduct(input: {
    name: "Smartphone XYZ",
    price: 1299.99,
    stock: 50
  }) {
    id
    name
    price
    stock
  }
}
```

**Buscar todos os produtos:**
```graphql
query {
  products {
    id
    name
    price
    stock
    created_at
  }
}
```

**Buscar um produto específico por Id:**
```graphql
query {
  product(id: 1) {
    id
    name
    price
    stock
    created_at
  }
}
```

**Criar um pedido:**
```graphql
mutation {
  createOrder(input: {
    user_id: 1,
    items: [
      {
        product_id: 1,
        quantity: 2
      }
    ]
  }) {
    id
    total
    items {
      quantity
      price
    }
  }
}
```

**Buscar usuário com pedidos e detalhes dos produtos:**
```graphql
query {
  user(id: 1) {
    id
    name
    email
    orders {
      id
      total
      created_at
      items {
        id
        quantity
        price
        product {
          id
          name
          price
        }
      }
    }
  }
}
```

## Estrutura do Banco de Dados

- **users**: Armazena informações dos usuários
- **products**: Catálogo de produtos disponíveis
- **orders**: Pedidos realizados pelos usuários
- **order_items**: Itens incluídos em cada pedido