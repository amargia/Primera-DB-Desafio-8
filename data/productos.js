const { options } = require('../database/options/mariaDB');
const knex = require('knex')(options)

const list = async () => {
  try {
    const productos = await knex
    .from("productos")
    .select('*')
    .orderBy('price', 'desc');
    return productos;
  } catch (error) {
    throw new Error("No hay productos en DB" , error);
  } finally {
    knex.destroy();
  }
};

const getById = async (id) => {
  try {
    await knex
    .from('productos') 
    .select('*') 
    .where('id', id) 
    .then((data) => { 
      return data;
    }).catch((error) => {    
      throw new Error('Producto no encontrado', error)
    });
  } finally {
    knex.destroy();
  } 
} 

const add = async (product) => {
  try {
    await knex
    .insert(product)
    .into('productos')
    .then(() => {
      return ('Producto ingresado existosamente')
    }).catch ((error) => {
        throw new Error ('Producto no se pudo ingresar', error)
    })
  } finally {
      knex.destroy();
  }
}

const deleteById = (id) => {
  try {
    knex
    .from('productos')
    .where('id', '=' , id)
    .del()
    .then(() => {
      return ('Producto eliminado exitosamente')
    }).catch((error) => {
      throw new Error ('Producto no se pudo eliminar', error)
    })
  } finally {
    knex.destroy();
  }
};


module.exports = { list, getById, add, deleteById };