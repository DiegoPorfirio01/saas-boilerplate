# Projeto Full Stack com Fastify, Prisma, Next.js 14 e Docker 🚀

## Descrição

Este projeto é uma aplicação full stack composta por uma API construída com Fastify e Prisma, e uma interface frontend usando Next.js 14. Além disso, utilizamos Docker para criar um ambiente de desenvolvimento consistente e isolado. A aplicação frontend faz uso de cache e componentes de servidor para otimização de desempenho e SEO.

## Tecnologias Utilizadas

### Backend

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Fastify**: Framework web rápido e eficiente para Node.js.
- **Prisma**: ORM e gerenciador de banco de dados.
- **Swagger**: Ferramenta para documentação de APIs.
- **CASL**: Biblioteca para controle de acesso baseado em permissões (RBAC).
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.

### Frontend

- **Next.js 14**: Framework React para aplicações web modernas.
- **React**: Biblioteca para construção de interfaces de usuário.
- **Cache**: Implementação de cache para otimização de desempenho.
- **Server Components**: Uso de componentes de servidor para renderização, melhor performance e otimização para SEO.

### Contêinerização

- **Docker**: Plataforma para desenvolvimento, envio e execução de aplicações em contêineres.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

├── apps
│ ├── api
│ │ ├── src
│ │ │ ├── controllers
│ │ │ ├── models
│ │ │ ├── routes
│ │ │ ├── services
│ │ │ └── index.ts
│ │ ├── prisma
│ │ │ └── schema.prisma
│ │ ├── tsconfig.json
│ │ └── package.json
│ └── web
│ ├── pages
│ ├── components
│ ├── public
│ ├── styles
│ ├── tsconfig.json
│ └── package.json
├── docker
│ ├── api.Dockerfile
│ ├── web.Dockerfile
│ └── docker-compose.yml
├── package.json
└── turbo.json

- **apps/api**: Código fonte da API backend.
  - **src/controllers**: Controladores que lidam com as requisições HTTP.
  - **src/models**: Modelos de dados utilizados pela aplicação.
  - **src/routes**: Define as rotas da API.
  - **src/services**: Lógica de negócios e comunicação com o banco de dados.
  - **src/index.ts**: Ponto de entrada da aplicação.
  - **prisma/schema.prisma**: Esquema do banco de dados Prisma.
  - **tsconfig.json**: Configurações do TypeScript para a API.

- **apps/web**: Código fonte da aplicação frontend.
  - **pages**: Páginas da aplicação Next.js.
  - **components**: Componentes reutilizáveis da aplicação.
  - **public**: Arquivos públicos.
  - **styles**: Estilos da aplicação.
  - **tsconfig.json**: Configurações do TypeScript para o frontend.

- **docker**: Arquivos de configuração do Docker.
  - **api.Dockerfile**: Dockerfile para o backend.
  - **web.Dockerfile**: Dockerfile para o frontend.
  - **docker-compose.yml**: Arquivo de configuração do Docker Compose.

## Instalação e Configuração

### Pré-requisitos

- Node.js
- pnpm (Package manager)
- Docker

### Passos para Configuração

1. **Clone o repositório**:
    ```bash
    git clone https://github.com/DiegoPorfirio01/saas-next-festfy.git
    cd saas-next-festfy
    ```

2. **Instale as dependências na pasta raiz**:
    ```bash
    pnpm install
    ```

3. **Gere o cliente Prisma**:
    ```bash
    cd apps/api
    pnpm prisma generate
    ```

4. **Execute o ambiente de desenvolvimento com Docker**:
    ```bash
    docker-compose up --build
    ```

5. **Acesse a aplicação**:
    - API: `http://localhost:3333`
    - Documentação da API: `http://localhost:3333/docs`
    - Frontend: `http://localhost:3000`
      

## Permissões RBAC com CASL

Utilizamos a biblioteca `@casl/ability` para gerenciar permissões baseadas em funções (RBAC). As habilidades e permissões são definidas de acordo com as regras de negócios e aplicadas aos recursos da API para garantir acesso seguro e controlado.

## Server Components e Otimização para SEO

Utilizamos Server Components no Next.js 14 para renderização no servidor, o que melhora significativamente o desempenho e a experiência do usuário. Além disso, a renderização no servidor proporciona uma melhor otimização para motores de busca (SEO), garantindo que o conteúdo da aplicação seja facilmente indexado pelo Google e outros buscadores.

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Para isso, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma nova branch: `git checkout -b minha-feature`.
3. Faça suas alterações e commit: `git commit -m 'Minha nova feature'`.
4. Envie para a branch original: `git push origin minha-feature`.
5. Crie um pull request.

## Licença

Este projeto está licenciado sob a licença MIT.


Estamos animados para construir esta aplicação e esperamos que você também esteja! Se tiver dúvidas ou sugestões, sinta-se à vontade para abrir uma issue no repositório. Vamos criar algo incrível juntos!

