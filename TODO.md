# Empty Project
- mkdir project
- mkdir views
- mkdir controllers
- touch index.js, .gitignore
- add "node_modules/", ".env", "config/config.json" to .gitignore 
- git init
  
# Initialize Express
- npm init -y
- npm install express ejs sequelize pg connect-flash express-session bcryptjs
- Create index.js with express and and test.

# Sequelize
- "sequelize init"
- "CREATE DATABASE xyz;" (in Postgres)
- Edit "config/config.json" with proper values
## Create a model
- sequelize model:create --name dino --attributes "name:string, type:string" (as appropriate)
- sequelize db:migrate
- review in Postgres




## For Example: create a customers table.
- sequelize model:create --name customer --attributes "username:string, firstname:string, lastname:string, email:string, password:string, birtday:date, admin:boolean, bio:text, profile:text"

- sequelize model:create --name outfit --attributes "color:string, style:string, size:float, type:string, material:string, dinoId:integer"

- sequelize model:create --name pokemon --attributes "name:string"

- sequelize model:create --name hood --attributes "name:string, link:string, image:string, description:string"

- sequelize model:create --name place --attributes "city:string, state:string, lat:real, long:real"


# This is a N:M Relationship in Sequelize
- sequelize model:create --name category --attributes "name:string"
- sequelize model:create --name categoriesProjects --attributes "categoryId:integer, projectId:integer"


