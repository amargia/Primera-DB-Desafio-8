const express = require("express");
const { Router } = require("express");
const products = Router();

const Contenedor = require("../controller/productsController")

products.get("/", (req, res) => {
  const productos = Contenedor.getAll()
  res.render('products', {productos});  
});

products.post("/", (req, res) => { 
  const {title, price, thumbnail} = req.body
  Contenedor.create(title, price, thumbnail)  
  const productos = Contenedor.getAll()
  res.redirect('/');   
});

module.exports = products;