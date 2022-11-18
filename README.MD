E-COMMERCE BACK END - FABIAN GARAY

datasources:
    file
    mongo
    firebase

routes:
    api/products
    api/products/:id
    api/cart
    api/cart/:id
    api/cart/:id/productos
    api/cart/:id/productos/:productId

form schema to add product:
        name(String),
        thumbnail(String),
        price(Number),
        description(String),
        stock(Number),
        code(String)