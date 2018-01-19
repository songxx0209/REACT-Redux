// Learn more on how to config.
// - https://github.com/dora-js/dora-plugin-proxy#规则定义

module.exports = {
  // 'GET /api/tables': require('mockjs').mock({
  //   success: true,
  //   data: [{name:'@Name'}],
  // }),
  'GET /get/goods' (req, res) {
    setTimeout(() => {
      res.json(require('mockjs').mock({
        success: true,
        'data': [{
          key: '1',
          goods: 'book',
          price: 12.49,
          quantity: 0,
          check:false,
          type:1,
        }, {
          key: '2',
          goods: 'music CD',
          price: 14.99,
          quantity: 0,
          check:false,
          type:2,
        }, {
          key: '3',
          goods: 'chocolate bar',
          price: 0.85,
          quantity: 0,
          check:false,
          type:1,
        }, {
          key: '4',
          goods: 'imported box of chocolates',
          price: 10.00,
          quantity: 0,
          check:false,
          type:91,
        }, {
          key: '5',
          goods: 'imported bottle of perfume',
          price: 47.50,
          quantity: 0,
          check:false,
          type:92,
        }, {
          key: '6',
          goods: 'bottle of perfume',
          price: 18.99,
          quantity: 0,
          check:false,
          type:2,
        }, {
          key: '7',
          goods: 'packet of headache pills',
          price: 9.75,
          quantity: 0,
          check:false,
          type:1,
        }, {
          key: '8',
          goods: 'imported watch',
          price: 27.99,
          quantity: 0,
          check:false,
          type:92,
        }, {
          key: '9',
          goods: 'box of imported cake',
          price: 11.25,
          quantity: 0,
          check:false,
          type:91,
        }],
      })
    );
    },
  500);
  },

  '/api/users' (req, res) {
    res.json({
      success: true,
      data: [{
        name: 'lyn',
        age: 28,
      }, {
        name: 'Lee',
        age: 30,
      }],
    });
  },

};

//  address:'@county(true)',
//  "age|20-45": 100,
