const express = require("express");
const { Router } = require("express");
const productsList = Router();

const Contenedor = require("../controller/productsController")

productsList.get("/", (req, res) => {
  const productos = Contenedor.getAll()
  res.status(200).json(productos); 
});


module.exports = productsList;