const { options } = require('../database/options/sqlite3DB');
const knex = require('knex')(options);

const list = async () => {
    try {
        const mensajes = await knex('chat').select('*');
        return mensajes;
    } catch (err) {
        throw new Error('No se pueden leer los mensajes', err)
    }
}

const add = async (mensaje) => {
    try {
        knex('chat')
            .insert(mensaje)
            .then(() => {
                return ('Mensaje enviado existosamente')
            }).catch((error) => {
                throw new Error('Error al enviar mensaje', error)
            })
    } finally {
        knex.destroy
    }
}

module.exports = { list, add };