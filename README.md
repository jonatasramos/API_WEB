API/WEB
=============

Página web com CRUD de itens e categorias

- Para realizar o bakend projeto foi utilizado o Laravel seguindo 
os padrões MVC.

- O frontend foi desenvolvido com angular na versão 9.

- Utilizado JWT para a autenticação de usuários.

- A linguagem utilizada para a manipulação do banco de dados foi SQL,
as instruções para a execução do mesmo estarão abaixo.

## API

- Execute:

```bash
composer install
```

- Criar um banco de dados com o nome de sua preferência.

- Em seguida altere o arquivo .env com nas seguintes informações:

```
DB_HOST=
DB_USER=
DB_PASS=
DB_DATABASE=
DB_PORT=
```
- Após a instalação do composer dentro de /api inicie a instalação do banco de dados: 

```bash
php artisan migrate
```

- Criar um usuário na tabela user, para acesso a api.

- Rode o projeto com: 

```bash
php artisan serve
```

##WEB

- Execute ``` npm install ``` dentro de web, em seguida ``` ng serve ```.

## Pontos a Trabalhar (com mais tempo)

- Melhor abstração dos componentes, criando novos componentes para reutilização, 
sem repetição de trechos de código.

- Melhoria na API utilizando ElasticSearch.

 








