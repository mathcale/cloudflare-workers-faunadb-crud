<!-- markdownlint-disable MD033 MD041 -->
<p align="center">
  <img src="docs/img/cfworkers-love-fauna.png" alt="Project logo" width="250px">
  <h1 align="center">Cloudflare Workers + FaunaDB CRUD</h1>
  <p align="center">Simple REST API with CRUD operations using FaunaDB, Cloudflare Workers and Typescript</p>
  <p align="center">
    <a href="https://insomnia.rest/run/?label=Cloudflare%20Workers%20%2B%20FaunaDB%20CRUD&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fmathcale%2Fcloudflare-workers-faunadb-crud%2Fmain%2Fdocs%2Finsomnia-collection.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
  </p>
</p>

## Tech

- NodeJS v14, through [nvm](https://github.com/nvm-sh/nvm)
- [Yarn v1](https://classic.yarnpkg.com)
- [Typescript v3.9](https://www.typescriptlang.org/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [FaunaDB](https://fauna.com/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/cli-wrangler)

## Endpoints

**Base URL:** `https://cloudflare-workers-faunadb-crud.mathcale.workers.dev`

| Route      | Method | Description                | Headers                                                        | Request model              | Response model                 |
| ---------- | ------ | -------------------------- | -------------------------------------------------------------- | -------------------------- | ------------------------------ |
| /todos     | GET    | List all todos             | `Accept: application/json`                                     | -                          | [View model](#get-todos-res)   |
| /todos/:id | GET    | Get todo data by its ID    | `Accept: application/json`                                     | -                          | [View model](#get-todo-res)    |
| /todos     | POST   | Create new todo            | `Content-Type: application/json`<br>`Accept: application/json` | [View model](#create-todo) | [View model](#create-todo-res) |
| /todos/:id | PATCH  | Set todo completion status | `Content-Type: application/json`<br>`Accept: application/json` | [View model](#edit-todo)   | [View model](#edit-todo-res)   |
| /todos/:id | DELETE | Delete todo                | `Accept: application/json`                                     | -                          | -                              |

## Request models

### [POST /todos](#create-todo-req)

| Field       | Type   | Description      | Required? |
| ----------- | ------ | ---------------- | --------- |
| description | String | Todo description | Yes       |

### [PATCH /todos/:id](#edit-todo-req)

| Field     | Type    | Description                                | Required? |
| --------- | ------- | ------------------------------------------ | --------- |
| completed | Boolean | Indicates if this todo is completed or not | Yes       |

## Response models

### [GET /todos](#get-todos-res)

```json
{
  "todos": [
    {
      "id": "300071157801943554",
      "description": "Pass AWS exam",
      "completed": true,
      "createdAt": "2021-05-31T02:43:26.188Z",
      "completedAt": "2021-05-31T02:51:24.825Z"
    }
  ]
}
```

### [GET /todos/:id](#get-todo-res)

```json
{
  "id": "300071157801943554",
  "description": "Pass AWS exam",
  "completed": true,
  "createdAt": "2021-05-31T02:43:26.188Z",
  "completedAt": "2021-05-31T02:51:24.825Z"
}
```

### [POST /todos](#create-todo-res)

```json
{
  "id": "300074156933775874",
  "description": "Buy milk",
  "completed": false,
  "createdAt": "2021-05-31T03:31:06.296Z",
  "completedAt": ""
}
```

### [PATCH /todos/:id](#edit-todo-res)

```json
{
  "id": "300074156933775874",
  "description": "Buy milk",
  "completed": true,
  "createdAt": "2021-05-31T03:31:06.296Z",
  "completedAt": "2021-05-31T03:32:11.892Z"
}
```
