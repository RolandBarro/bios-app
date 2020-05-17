
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

      const data = {
        ...body,
        _id: null,
      };

      const product = new Product(data);
      const result = await product.save();

      if (result) {
        return this.res.status(200)
          .send({ success: true, status: 200, message: 'Item saved!', data: result });
      }
    } catch(error) {
      this.res.status(500)
        .send({ success: false, status: 500, message: 'Item not saved!', error });

      throw new Error('Saving new Item. ', error);
    }
  }

  async updated() {
    try {
      const { body } = this.data; 
      
      if (!body._id) {
        throw new Error('Unable update item. Item id is required.');
      }

      const query = {
        _id: body._id,
      };

      await Product.findOneAndUpdate(query, 
        {
          $set: {
            ...body,
            lastUpdated: Date.now(),
          }
        },
        (err, result) => {
          if (err) {
            this.res.status(500).send({status: 500, type: 'error', message: 'Failed to update item.', err});
            return;
          }
                  
          this.res.status(200).send({status: 200, type: 'success', message: 'Student removed successfully!', data: result });
          return;
        }
      );
    } catch(error) {
      this.res.status(500)
        .send({ success: false, status: 500, message: 'Item not saved!', error });

      throw new Error('Saving new Item. ', error);
    }
  }

  async list() {
    try {
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

      console.log('search: ', JSON.stringify(search));

      const list = await Product.find(search, '-__v -isDeleted').sort({ 'name': 'asc' });
      
      return this.res.status(200)
          .send({ success: true, status: 200, message: 'Success!', data: list });

    } catch(error) {
      this.res.status(500)
        .send({ success: false, status: 500, message: 'Error fetching products!', error });

      throw new Error('Fetching products. ', error);
    }
  }

  test() {
    this.res.status(200).send({ success: true, status: 200, message: 'Success!', data: 1 });
  }
}

module.exports = ProductsController;
