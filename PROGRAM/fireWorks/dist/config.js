function randomMac() {
  var mac = localStorage.getItem('mac');
  if (!mac) {
    var timestamp = new Date().getTime();
    var random = '';
    for (var i = 0; i < 4; i++) {
      random += Math.round(Math.random() * 9);
    }
    mac = 'hs' + timestamp + random;
    localStorage.setItem('mac', mac);
  }
  return mac;
}

var oMac = randomMac();

var ENV = {
  // api: 'http://servicebeta15.handsight.cn',
  api: 'http://service15.handsight.cn',
  // activeId: '16512461',
  activeId: '288435660',
  mac: oMac,
  appId: null,
  wordImg: 'http://resource.handsight.cn/voteActive/upload/img/1483688540066_3121.png',
  bigImg: 'http://resource.handsight.cn/voteActive/upload/img/1483688684960_6480.jpg',
  yesImg: 'http://resource.handsight.cn/voteActive/upload/img/1483692302656_7696.png',
  noImg: 'http://resource.handsight.cn/voteActive/upload/img/1483692515032_5915.png',
};
