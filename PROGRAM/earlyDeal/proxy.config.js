// Learn more on how to config.
// - https://github.com/dora-js/dora-plugin-proxy#规则定义

module.exports = {
  'GET /video/getVideoContent'(req, res) {
    setTimeout(() => {
      res.json(require('mockjs').mock({
        success: true,
        data: {
          id: 1,
          videoTypeId: 1,
          posterImg: 'http://img5.mtime.cn/mg/2016/10/31/134504.97389220_270X405X4.jpg',
          videoName: '魔法精灵',
          issueTime: '2016年10月28日中国上映',
          durationTime: '92分钟',
          attribute: '动画/冒险/喜剧',
          showMode: '3D/中国巨幕',
          director: '迈克·米歇尔 沃尔特·道恩',
          screenPlay: '乔纳森·阿贝尔 格伦·伯杰',
          dramaPlot: '影片讲述的是“魔发精灵”这群可爱的精灵们与他们的天敌－－“博啃族”进行对抗的冒险旅程，最终Poppy公主带领同伴们找到了能够拯救整个精灵族群的终极秘影片讲述的是“魔发精灵”这群可爱的精灵们与他们的天敌－－“博啃族”进行对抗的冒险旅程，最终Poppy公主带领同伴们找到了能够拯救整个精灵族群的终极秘密武器密武器',
          'actors|4': [
            {
              chineseName: '@Name',
              originalName: '@Name',
              roleName: '@Name',
              avatar: 'http://img31.mtime.cn/ph/2016/06/06/103058.78691212_50X50.jpg',
            },
          ],
          msg: 'success',
          success: true,
          artiles: [],
        },
      }));
    }, 500);
  },
  'GET /video/getVideoList': require('mockjs').mock({
    success: true,
    'data|26': [{
      posterImg: 'http://img31.mtime.cn/mt/2014/02/22/225637.45613935_270X405X4.jpg',
      videoName: '@Name',
      'id|+1': 0,
      'videoTypeId|1': [0, 1, 2],
      attribute: '动作/冒险/奇幻',
      issueTime: '2016年11月4日中国上映.',
    }],
  }),
  'GET /video/getThemeList': require('mockjs').mock({
    success: true,
    'data|26': [{
      'videoId|+1': 0,
      'id|+1': 0,
      'videoName': '@Name',
      'videoTypeId': 1,
      'themeTypeId ': 1,
      'title': '@Name',
      'issueTime': '2016-6-7',
      'imgUrl': 'http://static.bootcss.com/www/assets/img/headroom.png',
      'source': '桃桃电影',
      'summary': '人人都爱安娜·肯德里克不管别人怎么说',
      'content': '每一个人都不会有太多的11年，然而对于每一个个人，11年有太多的故事，太多的记忆，难得的是，魔兽这段记忆从未中断。…',
    }],
  }),
  'GET /video/add'(req, res) {
    setTimeout(() => {
      res.json(require('mockjs').mock({
        success: true,
        msg: '成功',
      }));
    }, 1500);
  },
}
