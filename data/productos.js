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
  }
};

const getById = async (id) => {
  try {
    const producto = await knex
    .from('productos') 
    .select('*') 
    .where({ id }) 
    .then((data) => { 
      return data;
    }).catch((error) => {    
      throw new Error('Producto no encontrado', error)
    });
  } catch (error) {
    throw new Error('Producto no encontrado', error)
  } 
} 

const add = (product) => {
  try {
    knex('productos')
    .insert(product)
    .then(() => {
      return ('Producto ingresado existosamente')
    }).catch ((error) => {
        throw new Error ('Producto no se pudo ingresar', error)
    })
  } finally {
      knex.destroy
  }
}

const deleteById = (id) => {
  try {
    knex
    .from('productos')
    .where('id', '=' , i)
    .del()
    .then(() => {
      return ('Producto eliminado exitosamente')
    }).catch((error) => {
      throw new Error ('Producto no se pudo eliminar', error)
    })
  } finally {
    knex.destroy
  }
};


module.exports = { list, getById, add, deleteById };