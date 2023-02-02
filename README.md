# middleware

**Middleware** é um projeto criado para resolver o teste disponível nesta página do [Notion](https://forest-beechnut-57c.notion.site/Teste-API-de-or-amento-51c33eb367764d598affbd68cf0cef91), sendo um middleware que trabalha com dados mockados, processando estes.

## Tecnologias

Linguagem: Typescript 4.9.5 / NodeJS 18.13.0
Gerenciador de dependências: Npm 8.19.2
Framework: Express 4.18.2
Framework de testes: Jest 29.4.1
Conteinerização: Docker 20.10.23

## Endpoints

- GET `/user/list` - Lista todas as pessoas usuárias registradas no mock

Exemplo de resposta:

```json
[
    {
        "id": 1,
        "name": "cvRhuZicvV",
        "tax": 79
    },
    {
        "id": 2,
        "name": "P5hBDBonm3",
        "tax": 121
    },
    {
        "id": 3,
        "name": "buTTe8n3gT",
        "tax": 82
    }
]
```

- GET `/product/list` - Lista todos os produtos registrados no mock

Exemplo de resposta:

```json
[
    {
        "id": 1,
        "name": "explicabo alias hic reprehenderit deleniti quos id reprehenderit consequuntur ipsam iure voluptatem ea culpa excepturi ducimus repudiandae ab",
        "price": 6945
    },
    {
        "id": 2,
        "name": "nostrum veritatis reprehenderit repellendus vel numquam soluta ex inventore ex",
        "price": 2435
    },
    {
        "id": 3,
        "name": "praesentium explicabo reprehenderit laudantium a pariatur ab sit pariatur quos",
        "price": 4985
    }
]
```

- GET `/cart/tax` - Calcula a taxa dos produtos que será paga, baseada em uma pessoa usuária.

Corpo:

```json
{
    "userId": 1,
    "productsIds": [1, 2]
}
```

Exemplo de resposta:

```json
{
    "products": [
        {
            "id": 1,
            "name": "explicabo alias hic reprehenderit deleniti quos id reprehenderit consequuntur ipsam iure voluptatem ea culpa excepturi ducimus repudiandae ab",
            "price": 6945,
            "priceWithTax": 8403.45
        },
        {
            "id": 2,
            "name": "nostrum veritatis reprehenderit repellendus vel numquam soluta ex inventore ex",
            "price": 2435,
            "priceWithTax": 2946.35
        }
    ],
    "totalPrice": 11349.80,
    "user": {
        "id": 2,
        "name": "P5hBDBonm3",
        "tax": 121
    }
}
```

Caso a pessoa usuária informada não exista, a resposta será um `BadRequest`:

```json
{"message": "Não existe uma pessoa usuária com ID 9999"}
```

Caso algum(s) dos produtos informados não exista, a resposta será um `BadRequest`:

```json
{"message": "Não existe um(s) produto(s) com ID 999 1000"}
```

## Como iniciar

### Variáveis de ambiente

Antes de tudo, o projeto possui duas variáveis de ambiente, a `USERS_SERVER`, e a `PRODUCTS_SERVER`, cada uma sendo referente a um recurso do mockend, e elas devem ser inseridas em um `.env` ou arquivo similar na raiz, ou no comando que executa a API.

Exemplo de `.env`:

```
USERS_SERVER=https://mockend.com/juunegreiros/BE-test-api/users
PRODUCTS_SERVER=https://mockend.com/juunegreiros/BE-test-api/products
```

### NPM

O projeto pode ser iniciado usando o Npm, com o comando `dev`

`npm run dev` ou `yarn dev`

```
> middleware@1.0.0 dev
> ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/index.ts

[INFO] 20:27:04 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.1, typescript ver. 4.9.5)
Debugger listening on ws://127.0.0.1:9229/2ce64113-8a3d-4254-b223-b9956bbd74b2
For help, see: https://nodejs.org/en/docs/inspector
Server on port 8000
http://localhost:8000
```

### Docker

O projeto também pode ser iniciado usando Docker, com a imagem `lissatransborda/middleware`

```
docker run -i --env USERS_SERVER=https://mockend.com/juunegreiros/BE-test-api/users --env PRODUCTS_SERVER=https://mockend.com/juunegreiros/BE-test-api/products -p 8000:8000 lissatransborda/middleware
```

## Testes

O projeto possui testes automatizados, com um coverage de 96.93%. Esses testes podem ser rodados usando o comando `test`.

`npm run test` ou `yarn test`

## Build

### NPM

Para fazer a build do projeto usando o NPM, use o comando `build`, que irá transpilar todo o Typescript em Javascript na pasta `dist`.

`npm run build` ou `yarn build`

```
> middleware@1.0.0 build
> tsc
```

### Docker

A build também pode ser feita pelo Docker, usando o `Dockerfile` do projeto.

``docker build -t middleware .``

```
Sending build context to Docker daemon  1.279MB
Step 1/8 : FROM node:latest
 ---> 3d8ab8fd7e2a
Step 2/8 : WORKDIR /app
 ---> Using cache
 ---> b8ddfdfba832
Step 3/8 : COPY package*.json ./
 ---> Using cache
 ---> eb3b6c2ecba7
Step 4/8 : RUN npm install
 ---> Using cache
 ---> 59a1ef1db111
Step 5/8 : COPY . .
 ---> c0e237f05603
Step 6/8 : RUN npm run build
 ---> Running in de1bc9c6d6d0

> middleware@1.0.0 build
> tsc

Removing intermediate container de1bc9c6d6d0
 ---> 6f6033ad79bd
Step 7/8 : EXPOSE 8000
 ---> Running in 665b46053292
Removing intermediate container 665b46053292
 ---> 178d3f972882
Step 8/8 : CMD ["node", "dist/index.js"]
 ---> Running in b021053cb154
Removing intermediate container b021053cb154
 ---> 85d99394e74b
Successfully built 85d99394e74b
Successfully tagged middleware:latest
```