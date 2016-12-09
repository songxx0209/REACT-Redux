// Learn more on how to config.
// - https://github.com/dora-js/dora-plugin-proxy#规则定义

module.exports = {
  'GET /wx/voteActive/option/getss'(req, res) {
    setTimeout(() => {
      res.json(require('mockjs').mock({
        success: true,
        data: {
          'type1|30': [{
            'addDate': '@now()',
            'exhibitId|+1': 1000,
            'exhibitName|1': ['冰雪奇缘SDFSDF', '超能陆战队SSSSSS', '美国队长3SSSSSS', '阿凡达AAAAA', '肖申克的救赎SDFSADF', '教父ASDFASF', '低俗小说ASDFASDF', '辛德勒的名单ASDFASDFASDF', '盗梦空间ASDFASDFASD', '蝙蝠侠：黑暗骑士', '星球大战ASDFASDFASDFASDF', '指环王', '美丽心灵', '当幸福来敲门'],
            'exhibitImg': 'http://img.cache.pdawo.com/uploads/20130801/dgep0fyqtpq.jpg',
            'exhibitSrc': 'http://resource.handsight.com.cn/TVHelp01/video/1477301768422_7247.mp4',
            'description': 'sdas;dlfaa;sdlflsdfsld;sldkf;sldfk;sldkf',
            'voteCount': /[0-9]{4,6}/,
            'detailDescription':'上面代码中，变量 HelloMessage 就是一个组件类。模板插入时，会自动生成 HelloMessage 的一个实例',
            'voted|1': '3',
            'priority':/[1-3]{1}/
          }],

          'type2|20': [{
            'addDate': '@now()',
            'exhibitId|+1': 1000,
            'exhibitName|1': ['冰雪奇缘SDFSDF', '超能陆战队SSSSSS', '美国队长3SSSSSS', '阿凡达AAAAA', '肖申克的救赎SDFSADF', '教父ASDFASF', '低俗小说ASDFASDF', '辛德勒的名单ASDFASDFASDF', '盗梦空间ASDFASDFASD', '蝙蝠侠：黑暗骑士', '星球大战ASDFASDFASDFASDF', '指环王', '美丽心灵', '当幸福来敲门'],
            'exhibitImg': 'http://img.cache.pdawo.com/uploads/20130801/dgep0fyqtpq.jpg',
            'exhibitSrc': 'http://resource.handsight.com.cn/TVHelp01/video/1477301768422_7247.mp4',
            'description': 'sdas;dlfaa;sdlflsdfsld;sldkf;sldfk;sldkf',
            'voteCount': /[0-9]{4,6}/,
            'detailDescription':'上面代码中，变量 HelloMessage 就是一个组件类。模板插入时，会自动生成 HelloMessage 的一个实例',
            'voted|1': '3',
            'priority':/[1-3]{1}/
          }],
          'type3|20': [{
            'addDate': '@now()',
            'exhibitId|+1': 1000,
            'exhibitName|1': ['冰雪奇缘SDFSDF', '超能陆战队SSSSSS', '美国队长3SSSSSS', '阿凡达AAAAA', '肖申克的救赎SDFSADF', '教父ASDFASF', '低俗小说ASDFASDF', '辛德勒的名单ASDFASDFASDF', '盗梦空间ASDFASDFASD', '蝙蝠侠：黑暗骑士', '星球大战ASDFASDFASDFASDF', '指环王', '美丽心灵', '当幸福来敲门'],
            'exhibitImg': 'http://img.cache.pdawo.com/uploads/20130801/dgep0fyqtpq.jpg',
            'exhibitSrc': 'http://resource.handsight.com.cn/TVHelp01/video/1477301768422_7247.mp4',
            'description': 'sdas;dlfaa;sdlflsdfsld;sldkf;sldfk;sldkf',
            'voteCount': /[0-9]{4,6}/,
            'detailDescription':'上面代码中，变量 HelloMessage 就是一个组件类。模板插入时，会自动生成 HelloMessage 的一个实例',
            'voted|1': '3',
            'priority':/[1-3]{1}/
          }],
        },
      })
    );
    },
  100);
  },

'GET /wx/voteActive/option/get'(req, res) {
    setTimeout(() => {
      res.json(require('mockjs').mock({
        success: true,
        "appId": "523452",
        'datas|40': [
          {
            "activeId": "1",
            "orderId|+1": 1000,
            "optionId|+1": 1,
            'contentType|+1': [1, 2, 3],
            "title|1": ["盗梦空间是一部很好看的电影","美人鱼-星爷","奇异博士","海贼王","名侦探柯南","火影忍者"],        
            "img": "http://img.cache.pdawo.com/uploads/20130801/dgep0fyqtpq.jpg",
            "content": "AngularJS是Google开源的一款JavaScript MVC框架，弥补了HTML在构建应用方面的不足，其通过使用指令（directives）结构来扩展HTML词汇，使开发者可以使用HTML来声明动态内容，从而使得Web开发和测试工作变得更加容易。",
            "link|+1": [ 'https://v.qq.com/iframe/player.html?vid=k00228zkgf3&tiny=0&auto=0', 
                          'http://img.cache.pdawo.com/uploads/20130801/dgep0fyqtpq.jpg', 
                          'http://www.runoob.com/try/demo_source/horse.ogg'
                        ],
            "author|1": ["秦豆加","小伟",'小牛','小张','小王'], 
            "source": "2", 
            "sourceName": "xx大学",   //加上该字段
            "description": "道姆·柯布（莱昂纳多·迪卡普里奥 Leonardo DiCaprio 饰",  
            "voteCount": /[0-9]{4,6}/,
          }
        ],
      })
    );
    },
  100);
  },

  'GET /wx/voteActive/voting'(req, res) {
    setTimeout(() => {
      res.json(require('mockjs').mock({
        success: true,
        data: 3,
        msg:'怎么了',
      })
    );
    },
  100);
  },

};

//  address:'@county(true)',
//  "age|20-45": 100,
