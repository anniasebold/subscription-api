<p align="center">
  <a href="http://nestjs.com/" target="blank">
  <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
  </a>
</p>

## Descrição

API desenvolvida por:
- Annia Luiza Sebold
- Miguel dos Santos Flores

Subscription API para controle de Assinaturas do Facoffee.


API criada para a matéria de Técnicas Avançadas de Desenvolvimento de Software.

## Configuração do banco de dados

Foi utilizado o banco MariaDB, para rodar é necessário ter o Docker instalado na sua máquina.
```bash
docker run --name subscription-database -p 3306:3306 -e MARIADB_ROOT_PASSWORD=123 -d mariadb:latest
```

## Versão do Node

Foi utilizado a **v18.17.0** ou **lts/hydrogen**.

## Swagger

Para acessar a documentação Swagger acesse http://localhost:3222/swagger .

## Instalação

```bash
$ npm install
```

## Rodando a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testes unitários

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
