# Como realizar o deploy da API do BEE

1. Clonar o repositório
```SH
git clone https://github.com/WebII-2020-2/BEE.git
```

2. Entrar no pasta do projeto
```SH
cd BEE/API
```

3. Clonar o arquivo de variaveis de ambiente (linux)
```SH
cp .env.example .env
```

4. Preencher os dados da env como credenciais de banco, secret do JWT¹ e credencial da stripe².

- ¹Utilizamos o JWT como meio de autenticação entre o front-end e o back-end.

-  ²A stripe é uma operadora de pagamentos, que possui uma serie de funcionalidades que auxiliam o lojista em uma integração. Acesse o link da [stripe](https://stripe.com/) para ter uma visão completa.

5. Instalar as dependecias do projeto.
```SH
# para utilização do composer global
composer install

# para utilização do composer via php
php composer.phar install

# ou ainda
./composer.phar install
```

6. Gerar a key do laravel
```SH
php artisan key:generate
```

7. Realizar a migração das tabelas
```SH
php artisan migrate
```

8. Popular o banco de dados com um usuário admin.
```SH
php artisan db:seed --class=PopulateDatabase
```
---
Caso queira rodar o projeto para verificar se está funcionando corretamente
```SH
php artisan serve
```
Acesse o link informado no terminal por meio insomnia ou postman, adicionando os dados solicitados para API conforme a documentação de endpoints da API. [Documentação de endpoints](https://github.com/WebII-2020-2/BEE/blob/main/docs/documentacaoEndpoints.md).

---

Caso queira rodar o projeto no apache, é recomendavel que faça a utilização do arquivo .conf dentro da pasta /etc/apache2/sites-avaiable apontando para a pasta public do projeto. Além de adicionar o endereço ip e um host no arquivo /etc/hosts e ativar o a2ensite.

Uma informação detalhada sobre a utilização do apache pode ser encotrada no site da [DevMedia](https://www.devmedia.com.br/configuracoes-basicas-no-apache2-artigo-revista-infra-magazine-1/26395)
