# Portal para interação com serviço de reconhecimento emocional em música

Consultar:

https://blog.rocketseat.com.br/nodejs-express-sequelize/
http://docs.sequelizejs.com/manual/migrations.html#the-sequelizerc-file

## COMANDOS UTILIZADOS:
-----------------------------------------------------------------------------------------------------------------------------------
## Creating first Model (and Migration)
npx sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string

## Running Migrations
npx sequelize db:migrate

## Creating First Seed
npx sequelize seed:generate --name demo-user

Depois editar o ficheiro da pasta 'seeders' correspondente e editar
********************************************************************
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'demo@demo.com'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
********************************************************************

## Running Seeds
npx sequelize db:seed:all
