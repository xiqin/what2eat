//index.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');

Page({
  data: {
    btnText: '看看今天吃什么',
    btnTextArr: [
      '不想吃？那换一个', '还不行？再换', '别挣扎了，就吃它吧', 
    ],
    clickCount: 0,
    items: [],
    name: '***',
    height: 0
  },

  //随机获取美食
  getRandom: function () {
    let itemsLen = this.data.items.length;
    if(itemsLen <=0){
      wx.showToast({
        title: "请先添加美食谱\r\n或点击右下角设置按钮初始化美食谱",
        mask: true,
        icon: 'none',
        duration: 2000
      });
      return false;
    }

    // let num = Math.floor(Math.random() * itemsLen);
    // let btnLen = this.data.btnTextArr.length;
    // let n = this.data.clickCount;

    let that = this,
        max = itemsLen > 9 ? 9 : itemsLen,
        now = this.data.name;
    let sid = setInterval(function(){
      let num = Math.floor(Math.random() * itemsLen);
      //避免连续多次随机到同一美食
      // while (now == that.data.items[num].name && itemsLen > 1) {
      //   num = Math.floor(Math.random() * itemsLen);
      // }

      that.setData({
        name: that.data.items[num].name,
        clickCount: that.data.clickCount + 1
      })

      if (that.data.clickCount > max && that.data.name != now) {
        clearInterval(sid);
        that.setData({
          // name: this.data.items[num].name,
          // btnText: this.data.clickCount > 4 ? '咋滴还没你想吃的了？' : this.data.btnTextArr[n],
          // clickCount: this.data.clickCount + 1
          btnText: '不想吃，换一个',
          clickCount: 0
        })
      }
    },100);
  },

  //页面滑动
  handletouchtart: function(event){
    wx.navigateTo({
      url: '/pages/create/create'
    })
  },
  
  onLoad: function () {
    try {
      var res = wx.getSystemInfoSync()
      this.setData({
        height: res.windowHeight + 'px'
      })

    } catch (e) {
    }

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let data = wx.getStorageSync('food-items');

    this.setData({
      items: data,
      clickCount: 0
    });
  },

})
