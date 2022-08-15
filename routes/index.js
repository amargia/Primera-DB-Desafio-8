const express = require("express");
const router = express.Router();

const products = require("./productRouter");
const productsList = require("./productListRouter");
const home = require("./homeRouter");

//middlewares
router.use("/productos", products);
router.use("/lista-productos", productsList);
router.use("/", home);

module.exports = router;