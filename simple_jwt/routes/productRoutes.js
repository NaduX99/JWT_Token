const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/role");

let products = [];

/*
  PUBLIC ROUTE
*/
router.get("/products", (req, res) => {
  res.json(products);
});

/*
  CREATE PRODUCT (Admin + Manager)
*/
router.post("/products", auth, authorize("Admin", "Manager"), (req, res) => {
  const { name, price } = req.body;

  const product = {
    id: products.length + 1,
    name,
    price
  };

  products.push(product);

  res.status(201).json({
    message: "Product created",
    product
  });
});

/*
  DELETE PRODUCT (Admin only)
*/
router.delete("/products/:id", auth, authorize("Admin"), (req, res) => {
  const id = Number(req.params.id);

  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const deleted = products.splice(index, 1);

  res.json({
    message: "Product deleted",
    deleted
  });
});

module.exports = router;