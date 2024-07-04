# Single link project

## Description

*Необходимо реализовать сервис, который будет состоять из 2х эндпойнтов:*

1. Создать одноразовую ссылку        

*Принимает строку, запоминает её и возвращает ссылку, по которой можно получить строку, одноразовая ссылка должна быть уникальна, т.е. в один момент времени, в сервисе не может быть 2х одинаковых активных одноразовых ссылок.* 
        
2. Получение значения по одноразовой ссылке, сгенерированной в 1-м эндпойнте.

*При получении значения по одноразовой ссылке необходимо проверять, активна ли она. Если ссылка уже использована, то следует вернуть сообщение об ошибке.*

<br/>

## Deps

- node v17.4.0
- npm v8.7.0

## First steps

1. Install packages

```bash
$ npm ci
```

2. Add config.json (root dir)

```bash
$ cp config.example.json config.json & nano config.json
```

3. Start application

```bash
$ npm run dev:link-worker
```

## Start application in Docker

> Add stringify config.json to docker-compose.yml
>
> Create network

#### Build

```bash
$ npm run build:docker
``` 

#### Start

```bash
$ docker-compose up -d
```

#### Stop

```bash
$ docker-compose down
```

#### Restart

```bash
$ docker-compose restart
```

#### List

```bash
$ docker-compose ps -a
```

#### Logs

```bash
$ docker-compose logs -f link-worker -n 200
```

## Testing

#### Run tests

```bash
$ npm run test
```

## Simple usage

#### Generate single link

**POST** `/api/v1/link`

```json
{
  "value": "Test phase for single link"
}
```

#### Use link

**GET** `/api/v1/link/{RESULT_KEY_FROM_GENERATE_STEP}`


