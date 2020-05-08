const router = require('express').Router();
const fs = require('fs');

// module.exports = (router) => {
//   fs.readdirSync(__dirname).forEach(function (file) {
    
//     const name = file.substr(0, file.indexOf('.'));

//     console.log('name: ', name);
    
//   });

//   return router;
// }


const products = require('./products.route');

router.use('/products', products);

module.exports = router;
