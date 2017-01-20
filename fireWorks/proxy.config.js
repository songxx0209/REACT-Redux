// Learn more on how to config.
// - https://github.com/dora-js/dora-plugin-proxy#规则定义

module.exports = {
  'GET /rewardInfo/get': function (req, res) {
    setTimeout(() => {
      res.json(require('mockjs').mock({
        success: true,
        data: {
          rewardId: '1232412',
          rewardName: '一元紅包！',
        },
      })
      );
    }, 1500);
  },
};
