
// controllers

// models
const { Product } = require('../models');

class ProductsController {
  constructor(data, resources) {
    this.data = data;
    this.res = resources.res;
  }

  async create() {
    
    try {
      const { body } = this.data;  

      const product = new Product(body);
      const result = await product.save();

      if (result) {
        return this.res.status(200)
          .send({ success: true, status: 200, message: 'New product saved!', data: result });
      }
    } catch(error) {
      this.res.status(500)
        .send({ success: false, status: 500, message: 'Product not saved!', error });

      throw new Error('Saving new product. ', error);
    }
  }

  async list() {
    // try {
      const { query } = this.data;
      const search = {
        isDeleted: false,
      };

      if (query.search) {
        const regexValue = { $regex: query.search.toLowerCase().replace(/[+]/g,'\\+'), $options: 'i' }
        search.$or = [
          { name: regexValue },
          { shortDescription: regexValue },
          { detailDescription: regexValue },
          { supplier: regexValue },
          { sku: regexValue },
        ];
      }

      console.log('search: ', search);

      const list = await Product.find(search, '-__v -isDeleted').sort({ 'name': 'asc' });
      
      return this.res.status(200)
          .send({ success: true, status: 200, message: 'Success!', data: list });

    // } catch(error) {
    //   this.res.status(500)
    //     .send({ success: false, status: 500, message: 'Error fetching products!', error });

    //   throw new Error('Fetching products. ', error);
    // }
  }

  test() {
    this.res.status(200).send({ success: true, status: 200, message: 'Success!', data: 1 });
  }
}

module.exports = ProductsController;
