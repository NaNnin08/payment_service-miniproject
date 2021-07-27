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

## deploy in heroku cli:

--in terminal (must have heroku account)

1. heroku login (login to heroku account through web)
2. heroku create (for check if remove exits: git remove -v)
3. heroku config:set NPM_CONFIG_PRODUCTION=false (for install devDependensi)

--in dasboard heroku

1. in tab Resources -> add-ons -> in search Heroku Postgres (select free tier <if i don't false>)
2. click Heroku Postgres -> tab settings -> view credentials

-- in setting db (postgres)
Samakan dengan yang ada di view credentials
const sequelize = new Sequelize({
database: "d1npm8r613si1",
username: "badugvmmuiktnp",
password: "7644bd5514993de4227f29b4c098f5a25523c85b648d4e59994918899a05f883",
host: "ec2-35-170-85-206.compute-1.amazonaws.com",
port: 5432,
dialect: "postgres",
dialectOptions: {
ssl: {
require: true, // This will help you. But you will see nwe error
rejectUnauthorized: false, // This line will fix new error
},
},
});

--in root project make file with name: Procfile
-isinya: web: yarn node dist/server.generated.js

--in terminal

1. push change to heroku
   -git add .
   -git commit -m "deploy"
   -git push -u heroku main (if your master branch main) ##done
