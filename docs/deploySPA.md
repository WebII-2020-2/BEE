# Como realizar o deploy da API do BEE

1. Clonar o repositório

```SH
git clone https://github.com/WebII-2020-2/BEE.git
```

2. Entrar no pasta do projeto

```SH
cd BEE/SPA
```

3. Clonar o arquivo de variaveis de ambiente (linux)

```SH
cp .env.example .env
```

4. Preencher os dados da env como a rota base da API e o secret do JWT.

- Utilizamos o JWT como meio de autenticação entre o front-end e o back-end.

1. Instalar as dependecias do projeto: `yarn install`

2. Iniciar o servidor: `yarn start`

3. Fazer o build do projeto: `yarn build`
