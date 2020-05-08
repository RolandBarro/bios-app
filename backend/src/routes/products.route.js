const express = require('express');
const router = express.Router();

const { ProductsController } = require('../controllers');

router.post('/', (req, res) => {
  const products = new ProductsController(req, { res });
  products.create();
});

router.get('/', (req, res) => {
  const products = new ProductsController(req, { res });
  products.list();
});

router.get('/test', (req, res) => {
  const products = new ProductsController(req, { res });
  products.test();
});

module.exports = router;
