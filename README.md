# Feathers Playground
#Website hosted at https://feathers-playground.netlify.app/

```bash
# Clone repo from github.
git clone https://github.com/lottjerry/vue-feathers-app.git
```

### Install dependencies

```bash
# npm
npm install
```

```bash
# yarn
yarn install
```

## Create database
Only setup required is for the user to create a database named app in MySQL.

## Edit necessary files to connect to your MySQL database
Go inside the server folder then go inside the src folder. Edit the file named knex.js (The database adapter used to connect to MySQL database and configure database schema).

replace user with your username, password with your password and database from the database name you choose from your Environment Variables.
Example: user: USERNAME, password: PASSWORD, datbase: DATABASE

## Start client and server
### Yarn
```bash
# Inside the server folder
yarn dev
```
```bash
# Inside the client folder
yarn serve
```

### NPM
```bash
# Inside the server folder
npm run dev
```
```bash
# Inside the client folder
npm run serve
```
