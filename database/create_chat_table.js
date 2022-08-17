const { options } = require("./options/sqlite3DB")
const knex = require("knex")(options);

knex.schema.createTable("chat", (table) => {
    table.increments('id');
    table.string('email');
    table.string('fecha');
    table.string('message')
}).then (() => {
    console.log("Chat creado");
}).catch ((error) => {
    console.log(error);
}).finally (() => {
    knex.destroy();
})