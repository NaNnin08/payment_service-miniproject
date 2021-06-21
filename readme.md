##### Membuat Swagger

1. install module (swagger-jsdoc swagger-ui-express)
2. buat file swagger.json

## Nodemon supaya bisa debug gunakan :

### edit nodemon.json

{
"verbose": false,
"watch": [
"./server"
],
"exec" : "babel-node ./server/server.js"
},

### untuk built-up :

{
"verbose": false,
"watch": [
"./server"
],
"exec": "webpack --mode=development --config webpack.config.server.js && node ./dist/server.generated.js"
}
