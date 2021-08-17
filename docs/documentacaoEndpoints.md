Documentação sobre os endpoints, retornos e envios da API.

# Índice

- [Usuário](#user)
- [Categoria](#category)
- [Produto](#product)
- [Promoção](#promotion)
- [Venda](#orderAdmin)
- [Relatório](#reports)
- [Banner](#banner)
- [Endereço](#address)
- [Cartão](#card)
- [Compra](#orderUser)

---

<div id="user"></div>

# Usuário

Registrar - POST
-----
http://endpointofdeploy/api/register

- Header: Authotization: Bearer `{Token}`
- Body ```JSON```:
```JSON
{
	"name": "Fábio Lima",
	"email": "fabio@bee.com",
	"password": "fabio@@123",
	"cpf": "12312312312",
	"phone": "7799999999",
	"birth_date": "1998-08-22",
}
```

- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": {
    "token": {
      "access_token": "TOKEN",
      "token_type": "bearer",
      "expires_in": "3600"
    },
    "user": {
      "name": "Fábio Lima",
      "image": "BASE64IMAGE",
      "level_access": 2
    }
  },
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 4,
    "error_message": "Não foi possivel salvar o usuário."
  }
}
```

---
Sair - POST
-----

http://endpointofdeploy/api/logout

- Header: Authotization: Bearer `{Token}`

---
Logar - POST
-----

http://endpointofdeploy/api/login

- Header: Authotization: Bearer ```{Token}```
- Body ```JSON```:
```JSON
{
	"email": "fabio@bee.com",
	"password": "fabio@@123"
}
```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": {
    "token": {
      "access_token": "TOKEN",
      "token_type": "bearer",
      "expires_in": "3600"
    },
    "user": {
      "name": "Fabio Lima",
      "image": "BASE64IMAGE",
      "level_access": 2
    }
  },
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Credenciais incorretas."
  }
}
```

---
Esqueci a senha - POST
-----

http://endpointofdeploy/api/forgot/password

- Body ```JSON```:
```JSON
{
	"email": "fabio@bee.com"
}
```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": null,
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "E-mail não enviado."
  }
}
```

---
Nova senha - POST
-----

http://endpointofdeploy/api/reset/password

- Body ```JSON```:
```JSON
{
	"token": "TOKENENVIADONOEMAIL",
    "password": "fabio@@123"
}
```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": null,
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Token expirado."
  }
}
```

---
Dados do usuário - POST
-----

http://endpointofdeploy/api/get

- Header: Authotization: Bearer ```{Token}```

- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": {
    "name": "Fabio Lima",
    "email": "fabio@bee.com",
    "cpf": null,
    "birth_date": null,
    "phone": null,
    "image": "BASE64IMAGE",
    "level_access": 2
  },
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel listar o usuário."
  }
}
```

<div id="category"></div>

-----

Adicionar uma categoria - POST
-----
http://endpointofdeploy/api/category/add

- Header: Authorization: Bearer ```{Token}```
- Body ```JSON```:
```JSON
{
   "name":"Grãos",
   "description":"Categoria desinada a grãos em geral."
}
```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": {
    "name": "Cerais",
    "description": "Categoria desinada a cereais em geral.",
    "updated_at": "2021-06-18T11:35:17.000000Z",
    "created_at": "2021-06-18T11:35:17.000000Z",
    "id": 5
  },
  "error": null
}
```
- Response ```ERRRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel salvar a categoria."
  }
}
```

---
Atualizar uma categoria - POST
-----
http://endpointofdeploy/api/category/update/1

- Header: Authorization: Bearer ```{Token}```
- Body ```JSON```:
```JSON
{
   "name":"Grãos",
   "description":"Categoria designada a grãos em geral."
}
```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": null,
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel atualizar a categoria."
  }
}
```

---
Deletar uma categoria - POST
-----
http://endpointofdeploy/api/category/delete/1

- Header: Authorization: Bearer ```{Token}```
- Response ```SUCESSO```:
```JSON
{
    "success": true,
    "data": null,
    "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel deletar a categoria."
  }
}
```


---
Listar categoria - GET
-----
http://endpointofdeploy/api/category/list

- Response ```SUCESSO```: 
```JSON
{
  "success": true,
  "data": [
    {
      "id": 8,
      "name": "Grãos",
      "description": "grãos teste",
      "count_products": 0
    },
    {
      "id": 9,
      "name": "Apícolas",
      "description": "produtos derivados de abelha e afins",
      "count_products": 0
    },
    {
      "id": 19,
      "name": "Laticinios",
      "description": "Leites e derivados",
      "count_products": 0
    },
    {
      "id": 29,
      "name": "Bean",
      "description": "Bean test datas",
      "count_products": 9
    },
    {
      "id": 48,
      "name": "teste1",
      "description": "teste1",
      "count_products": 0
    },
    {
      "id": 49,
      "name": "teste",
      "description": "teste",
      "count_products": 0
    }
  ],
  "error": null
}
```

- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel listar as categorias."
  }
}
```
---
Listar uma categoria pelo id - GET
-----
http://endpointofdeploy/api/category/list/1

- Header: Authorization: Bearer ```{Token}```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": {
    "id": 8,
    "name": "Grãos",
    "description": "grãos teste",
    "count_products": 0
  },
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel listar a categoria."
  }
}
```

---
Listar categorias mais vendidas - GET
-----
http://endpointofdeploy/api/category/best

- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Graõs"
    }
  ],
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel listar as categorias em destaque."
  }
}
```

<div id="product"></div>

# Produto

Adicionar um produto - POST
-----
http://endpointofdeploy/api/product/add

- Header: Authorization: Bearer ```{Token}```
- Body ```JSON```:
```JSON
{
   "name":"Granola",
   "unity":"g",
   "quantity":8,
   "unitary_value":3.45,
   "description":"Granola 100% organica",
   "image":"BASE64IMAGE",
   "category_id":3
}
```

- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": null,
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel salvar o produto."
  }
}
```

---
Atualizar um produto - POST
-----
http://endpointofdeploy/api/product/update/1

- Header: Authorization: Bearer ```{Token}```
- Body ```JSON```:
```JSON
{
   "name":"Granola",
   "unity":"g",
   "quantity":8,
   "unitary_value":3.45,
   "description":"Granola 100% organica",
   "image":"BASE64IMAGE",
   "category_id":3
}
```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": null,
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel atualizar o produto."
  }
}
```

---
Listar de produto - GET
-----
http://endpointofdeploy/api/product/list

- Header: Authorization: Bearer ```{Token}```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Bean (Test)",
      "unity": "Kg",
      "quantity": 50,
      "unitary_value": 5.99,
      "description": "Beans for Test",
      "image": "BASE64IMAGE",
      "category_id": 1,
      "category": "Graõs"
    }
  ],
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel listar os produtos."
  }
}
```

---
Listar de produto pelo id- GET
-----
http://endpointofdeploy/api/product/list/1

- Header: Authorization: Bearer ```{Token}```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Bean (Test)",
    "unity": "Kg",
    "quantity": 50,
    "unitary_value": 5.99,
    "description": "Beans for Test",
    "image": "BASE64IMAGE",
    "category_id": 1,
    "category": "Graõs"
  },
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel listar o produto."
  }
}
```

---
Deletar um produto - POST
-----
http://endpointofdeploy/api/product/delete/1

- Header: Authorization: Bearer ```{Token}```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": null,
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel deletar o produto."
  }
}
```

---
Listar produtos mais vendidos - GET
-----
http://endpointofdeploy/api/product/best

- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Granola",
      "unitary_value": 3.45,
      "image": "BASE64IMAGE"
    }
  ],
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel listar os produtos em destaque."
  }
}
```

---
Listar de produto pelo nome- GET
-----
http://endpointofdeploy/api/product/search
- Body ```JSON```:

```JSON
{
	"name":"ean"
}
```
- Response ```SUCESSO```:

```JSON
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Bean (Test)",
    "unity": "Kg",
    "quantity": 50,
    "unitary_value": 5.99,
    "description": "Beans for Test",
    "image": "BASE64IMAGE",
    "category_id": 1,
    "category": "Graõs"
  },
  "error": null
}
```

- Response ```ERRO```:

```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel listar o produto."
  }
}
```

<div id="orderAdmin"></div>

# Vendas - Admin
---
Atualizar uma venda - POST
-----
http://endpointofdeploy/api/order/update/1

- Header: Authorization: Bearer ```{Token}```
- Body ```JSON```:
```JSON
{
	"tracking_code": "ASA2A5S2AS512ABR",
	"status_order": 2
}
```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": null,
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel atualizar a venda."
  }
}
```

---
Listar de vendas - GET
-----
http://endpointofdeploy/api/order/list

- Header: Authorization: Bearer ```{Token}```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": [
    {
      "id": 1,
      "quantity": 2,
      "value_total": 10.35,
      "status_order": 2,
      "name_user": "Fábio Lima",
      "selled_date": "19-05-2021"
    }
  ],
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel listar as vendas."
  }
}
```

---
Listar de venda pelo id- GET
-----
http://endpointofdeploy/api/order/list/1

- Header: Authorization: Bearer ```{Token}```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": {
    "id": 8,
    "invoice": "123",
    "selled_date": "19-06-2021",
    "value_total_products": 9.9,
    "value_shipping": 10.00,
    "value_total": 19.9,
    "quantity": 2,
    "status_order": 6,
    "tracking_code": "BR63197GA2",
    "shipped_date": "2021-06-20",
    "estimated_date": "2021-06-30",
    "finished_date": null,
    "name_user": "Fábio Lima",
    "address": {
      "public_place": "Rua das bananas",
      "district": "Bananal",
      "number": "101",
      "complement": "Apto 01",
      "zip_code": "101101",
      "city": "Bananal",
      "state": "Bananal",
      "reference_point": "Proximo ao Bananal"
    },
    "payment_method": "Cartão de crédito",
    "products": [
      {
        "name": "Donut",
        "unitary_value_product": 2.45,
        "quantity": 2,
        "unitary_value_selled": 2.45
      },
      {
        "name": "Fries",
        "unitary_value_product": 5,
        "quantity": 1,
        "unitary_value_selled": 5
      }
    ]
  },
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel listar a venda."
  }
}
```

<div id="reports"></div>

# Relatório

Listar de meses - GET
-----
http://endpointofdeploy/api/reports/list

- Header: Authorization: Bearer ```{Token}```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": {
    "months": [
      "05\/2021"
    ]
  },
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel listar os mêses fechados."
  }
}
```

---
Listar de relatório pela data- GET
-----
http://endpointofdeploy/api/reports/list/05-2021

- Header: Authorization: Bearer ```{Token}```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": {
    "orders": [
      {
        "quantity": 2,
        "value_total": 20.35,
        "selled_date": "19-05-2021"
      }
    ],
    "value_total": 20.35,
    "product_total": 2
  },
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel listar o relatório."
  }
}
```

<div id="banner"></div>

# Banner

Adicionar um banner- POST
-----
http://endpointofdeploy/api/banner/add

- Header: Authorization: Bearer ```{Token}```
- Body ```JSON```:
```JSON
{
   "title":"Banner",
   "description":"Descrição teste",
   "active": 1,
   "image":"BASE64IMAGE",
   "products":[
      1
   ]
}
```

- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": null,
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel salvar o banner."
  }
}
```

---
Atualizar um banner- POST
-----
http://endpointofdeploy/api/banner/update/1

- Header: Authorization: Bearer ```{Token}```
- Body ```JSON```:
```JSON
{
   "title":"Banner",
   "description":"Descrição teste",
   "active":1,
   "image":"BASE64IMAGE",
   "product":[
      1
   ]
}
```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": null,
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel atualizar o banner."
  }
}
```

---
Listar de banner- GET
-----
http://endpointofdeploy/api/banner/list

- Header: Authorization: Bearer ```{Token}```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Banner",
      "description": "descrição teste",
      "active": 1,
      "image": "BASE64IMAGE",
      "product":[
         {
          "id": 1
         }
      ]
    }
  ],
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel listar os banners."
  }
}
```

---
Listar de banner pelo id- GET
-----
http://endpointofdeploy/api/banner/list/1

- Header: Authorization: Bearer ```{Token}```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Banner",
    "description": "Descrição teste",
    "active": 1,
    "image": "BASE64IMAGE",
     "products": [
      {
        "id": 1,
        "name": "Granola",
        "quantity": 8,
        "unitary_value": 3.45,
        "value_promotion": -26.55,
        "image": "BASE64IMAGE"
      }
    ]
  },
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel listar o banner."
  }
}
```

---
Deletar um banner- POST
-----
http://endpointofdeploy/api/banner/delete/1

- Header: Authorization: Bearer ```{Token}```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": null,
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel deletar o banner."
  }
}
```

<div id="address"></div>

# Endereço

Adicionar um endereço - POST
-----
http://endpointofdeploy/api/address/add

- Header: Authorization: Bearer ```{Token}```
- Body ```JSON```:
```JSON
{
	"public_place": "Rua das bananas",
	"district": "Bananal",
	"number": "10",
	"complement": "Banana",
	"zip_code": "101010",
	"city": "Bananal",
	"state": "Ba",
	"reference_point": "Bananui"
}
```

- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": null,
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel salvar o endereço."
  }
}
```

---
Atualizar um endereço - POST
-----
http://endpointofdeploy/api/address/update/1

- Header: Authorization: Bearer ```{Token}```
- Body ```JSON```:
```JSON
{
	"public_place": "Rua das bananas",
	"district": "Bananal",
	"number": "10",
	"complement": "Banana",
	"zip_code": "101010",
	"city": "Bananal",
	"state": "Ba",
	"reference_point": "Bananui1"
}
```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": null,
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel atualizar o endereço."
  }
}
```

---
Listar endereços - GET
-----
http://endpointofdeploy/api/address/list

- Header: Authorization: Bearer ```{Token}```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": [
    {
      "public_place": "Rua das bananas",
      "district": "Bananal",
      "number": "10",
      "complement": "Banana",
      "zip_code": "101010",
      "city": "Bananal",
      "state": "Ba",
      "reference_point": "Bananui1"
    },
    {
      "public_place": "Rua das bananas",
      "district": "Bananal",
      "number": "10",
      "complement": "Banana",
      "zip_code": "101010",
      "city": "Bananal",
      "state": "Ba",
      "reference_point": "Bananui"
    },
    {
      "public_place": "Rua das bananas",
      "district": "Bananal",
      "number": "10",
      "complement": "Banana",
      "zip_code": "101010",
      "city": "Bananal",
      "state": "Ba",
      "reference_point": " "
    }
  ],
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel listar os endereços."
  }
}
```

---
Listar endereço pelo id- GET
-----
http://endpointofdeploy/api/address/list/1

- Header: Authorization: Bearer ```{Token}```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": {
    "public_place": "Rua das bananas",
    "district": "Bananal",
    "number": "10",
    "complement": "Banana",
    "zip_code": "101010",
    "city": "Bananal",
    "state": "Ba",
    "reference_point": "Bananui1"
  },
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel listar o endereço."
  }
}
```

---
Deletar um endereço - POST
-----
http://endpointofdeploy/api/address/delete/1

- Header: Authorization: Bearer ```{Token}```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": null,
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel deletar o endereço."
  }
}
```

<div id="card"></div>

# Cartão

Adicionar um cartão - POST
-----
http://endpointofdeploy/api/card/add

- Header: Authorization: Bearer ```{Token}```
- Body ```JSON```:
```JSON
{
	"flag": "Visa",
	"number": "0000000000000001",
	"security_code": 345,
	"expiration_date": "07/2025",
	"holder": "Fábio Lima",
	"type": 1
}
```

- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": null,
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel salvar o cartão."
  }
}
```

---
Atualizar um cartão - POST
-----
http://endpointofdeploy/api/card/update/1

- Header: Authorization: Bearer ```{Token}```
- Body ```JSON```:
```JSON
{
	"flag": "Visa",
	"number": "0000000000000002",
	"security_code": 345,
	"expiration_date": "07/2025",
	"holder": "Fábio Lima",
	"type": 1
}
```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": null,
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel atualizar o cartão."
  }
}
```

---
Listar cartões - GET
-----
http://endpointofdeploy/api/card/list

- Header: Authorization: Bearer ```{Token}```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": [
    {
      "id": 3,
      "flag": "Visa",
      "number": "***********00001",
      "security_code": "***",
      "expiration_date": "07\/2025",
      "holder": "Fábio Lima",
      "type": "1",
      "payment_method_id": 1
    }
  ],
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel listar os cartões."
  }
}
```

---
Listar cartão pelo id- GET
-----
http://endpointofdeploy/api/card/list/1

- Header: Authorization: Bearer ```{Token}```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": {
    "id": 3,
    "flag": "Visa",
    "number": "***********00001",
    "security_code": "***",
    "expiration_date": "07\/2025",
    "holder": "Fábio Lima",
    "type": "1"
  },
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel listar o cartão."
  }
}
```

---
Deletar um cartão - POST
-----
http://endpointofdeploy/api/card/delete/1

- Header: Authorization: Bearer ```{Token}```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": null,
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel deletar o cartão."
  }
}
```

<div id="orderUser"></div>

# Compra

Realizar compra - POST
-----
http://endpointofdeploy/api/order/add

- Header: Authorization: Bearer ```{Token}```
- Body ```JSON```:
```JSON
{
	"address_id": 1,
	"card_id": 1,
	"send_value": 15.5,
	"send_estimated_date": "2021-08-15",
	"products": [
		{
			"id": 1,
			"quantity": 3
		},
		{
			"id": 2,
			"quantity": 10
		}
	]
}
```

- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": null,
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possível realizar a compra."
  }
}
```

```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Produto indisponível."
  }
}
```

```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Falha ao tokenizar cartão."
  }
}
```

```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Produto com valor divergente na stripe."
  }
}
```

```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Venda não criada na stripe."
  }
}
```

```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Cartão de crédito negado."
  }
}
```

Ver pedidos - GET
-----
http://endpointofdeploy/api/order/user/list

- Header: Authorization: Bearer ```{Token}```

- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": [
    {
      "invoice": "611859a17464b",
      "quantity": 1,
      "value_total": 26.25,
      "status_order": 3,
      "selled_date": "2021-08-15",
      "card": [
        "***********24242",
        "Visa"
      ]
    }
  ],
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possível lista os pedidos."
  }
}
```

Ver pedido especifico - GET
-----
http://endpointofdeploy/api/order/user/list/611859a17464b

- Header: Authorization: Bearer ```{Token}```

- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": {
    "id": 12,
    "invoice": "611859a17464b",
    "selled_date": "2021-08-15",
    "value_total_products": 32.25,
    "value_shipping": 15.5,
    "value_total": 47.75,
    "quantity": 1,
    "status_order": 3,
    "send_method": null,
    "tracking_code": null,
    "shipped_date": null,
    "estimated_date": "2021-08-15",
    "finished_date": null,
    "address": {
      "public_place": "Rua das bananas",
      "district": "Bananal",
      "number": "4242424242424242",
      "complement": "Banana",
      "zip_code": "101010",
      "city": "Bananal",
      "state": "Ba",
      "reference_point": "Bananui"
    },
    "payment_method": "Cartão de crédito",
    "card": [
      "***********24242",
      "Visa"
    ],
    "products": [
      {
        "name": "Avocado",
        "unitary_value_product": 10.75,
        "quantity": 3,
        "unitary_value_selled": 10.75,
        "image": "IMAGEBASE64HERE"
      }
    ]
  },
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possível listar o pedido."
  }
}
```


<div id="promotion"></div>

# Promoção
Adicionar uma Promoção - POST
-----
http://endpointofdeploy/api/promotion/add

- Header: Authorization: Bearer ```{Token}```
- Body ```JSON```:
```JSON
{
   "name":"desconto",
   "type":"1",
   "value":"30",
   "start_date":"2021-06-25",
   "end_date":"2021-06-30",
   "products": [
     1
   ]
}
```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": null,
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel salvar a promoção."
  }
}
```

---
Atualizar uma promoção - POST
-----
http://endpointofdeploy/api/promotion/update/1

- Header: Authorization: Bearer ```{Token}```
- Body ```JSON```:
```JSON
{
        "name": "pao de queijo", 
	"type": "1",
	"value": "30",
	"start_date": "2021-06-25",
	"end_date": "2021-06-30",
	"products": [
		2
	]
}
```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": null,
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel atualizar a promoção."
  }
}
```

---
Listar de promoção - GET
-----
http://endpointofdeploy/api/promotion/list

- Header: Authorization: Bearer ```{Token}```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": [
    {
      "id": 3,
      "name": "amenduim",
      "type": 1,
      "value": 30,
      "image": null,
      "mime_type": null,
      "start_date": "2021-06-25",
      "end_date": "2021-06-30",
      "products": [
          1,
          2
      ]
    }
  ],
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel listar as promoções."
  }
}
```

---
Listar de promoção pelo id- GET
-----
http://endpointofdeploy/api/promotion/list/1

- Header: Authorization: Bearer ```{Token}```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": 
    {
      "id": 3,
      "name": "amenduim",
      "type": 1,
      "value": 30,
      "image": null,
      "mime_type": null,
      "start_date": "2021-06-25",
      "end_date": "2021-06-30",
      "products": [
          1,
          2
      ]
    }
   ,
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel listar o produto."
  }
}
```

---
Listar de promoção com produto pelo id- GET
-----
http://endpointofdeploy/api/promotion/get/products/1

- Header: Authorization: Bearer ```{Token}```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": {
    "name": "desconto",
    "products": [
      {
        "id": 1,
        "name": "Granola",
        "image": "BASE64IMAGEHERE",
        "previous_value": 3.45,
        "value_promotion": 2.95
      }
    ]
  },
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel listar o produto."
  }
}
```

---
Deletar uma promoção - POST
-----
http://endpointofdeploy/api/promotion/delete/1

- Header: Authorization: Bearer ```{Token}```
- Response ```SUCESSO```:
```JSON
{
  "success": true,
  "data": null,
  "error": null
}
```
- Response ```ERRO```:
```JSON
{
  "success": false,
  "data": null,
  "error": {
    "code": 2,
    "error_message": "Não foi possivel deletar a promoção."
  }
}
```