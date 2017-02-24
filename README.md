# Dovelobutto API

Hosted on https://dovelobutto.herokuapp.com

## GET /products

Returns the first 10 products.

- params:
  - name: filter by name.

- return:

  The first 10 products found with the relative bin.
  If a name was specified and but product was found, the API will still return the product, with `null` as bin value.

**E.g.**:

GET https://dovelobutto.herokuapp.com/products?name=pla

Response:
```application/json
{
    "data": [
        {
            "name": "pla",
            "bin": null
        },
        {
            "bin": {
                "id": 4,
                "name": "Plastica e lattine"
            },
            "name": "bicchieri di plastica"
        },
        {
            "bin": {
                "id": 4,
                "name": "Plastica e lattine"
            },
            "name": "bottiglie di plastica"
        },
        {
            "bin": {
                "id": 4,
                "name": "Plastica e lattine"
            },
            "name": "buste per alimenti in plastica"
        },
        {
            "bin": {
                "id": 4,
                "name": "Plastica e lattine"
            },
            "name": "contenitori in plastica per uova"
        },
        {
            "bin": {
                "id": 4,
                "name": "Plastica e lattine"
            },
            "name": "coperchi in plastica"
        },
        {
            "bin": {
                "id": 4,
                "name": "Plastica e lattine"
            },
            "name": "piatti di plastica"
        },
        {
            "bin": {
                "id": 1,
                "name": "Indifferenziata"
            },
            "name": "posate di plastica"
        },
        {
            "bin": {
                "id": 1,
                "name": "Indifferenziata"
            },
            "name": "righelli in plastica"
        },
        {
            "bin": {
                "id": 4,
                "name": "Plastica e lattine"
            },
            "name": "sacchetti di plastica e nylon"
        }
    ]
}
```

## POST /products

Submit a new products with the user email

- params:
  - name: product's name
  - email: a valid email
- returns:
  - 200: correctly submitted
  - 422: invalid request

**E.g.**:

post https://dovelobutto.herokuapp.com/products?name=pla

Body:
```
{
    "name": "test",
    "email": "test@pugliasos.it"
}
```

Response:
```
200 OK
```
