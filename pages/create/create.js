const util = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    items : [],
    canOperate: false,
    selectArr: [],
    creating: false,
    animationData: {},
    textareaVal: ''
  },

  //调起添加框
  addItem: function(){
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })

    this.animation = animation;
    animation.top(0).step();

    this.setData({
      animationData: animation.export(),
      creating: true,
      canOperate: false,
      selectArr: [],
    })
  },

  //保存数据
  saveItems: function(e){
    let textArr = e.detail.value.textarea.split(';');
    textArr = textArr.filter(util.array_filter);
    textArr = [...new Set(textArr)];
    if(textArr.length <= 0){
      this.hideMask();
      return false;
    }

    let data = this.data.items;
    
    for(var i in textArr){
      if (util.array_obj_filter(data, textArr[i])){
        data.push({ "name": textArr[i], "selected": false });
      }
    }

    this.setData({
      items: data,
      creating: false,
    });
    util.setCache(data);
    this.hideMask();
  },

  //隐藏遮罩
  hideMask: function(){
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    });

    this.animation = animation;
    animation.top(-1000).step();

    this.setData({
      animationData: animation.export(),
      creating: false
    });
  },

  //长按
  openSelect: function(){
    this.setData({
      canOperate: true
    })
  },

  //点选
  selecting: function(event){
    if(!this.data.canOperate){
      return false;
    }
    let id = event.currentTarget.dataset.id;
    let items = this.data.items;
    let data = items[id];
    data.selected = !data.selected;
    
    //删除按钮是否disabled
    let index = this.data.selectArr.indexOf(id);
    if (index > -1){
      this.data.selectArr.splice(index, 1);
    }else{
      this.data.selectArr.push(id);
    }

    this.setData({
      items: items,
      selectArr: this.data.selectArr
    });
  },

  //删除
  delItems: function(){
    let oldData = this.data.items;
    let data = [];
    for (var i in oldData){
      if (oldData[i].selected == false){
        data.push(oldData[i]);
      }
    }

    this.setData({
      items: data,
      selectArr: [],
      canOperate: false
    });
    util.setCache(data);
  },

  //取消操作
  cancel: function(){
    //数据复位
    let selectArr = this.data.selectArr;
    for (var i in selectArr) {
      this.data.items[selectArr[i]].selected = false;
    }

    this.setData({
      items: this.data.items,
      selectArr: [],
      canOperate: false
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = wx.getStorageSync('food-items');
    if(data.length <= 0){
      data = util.initData;
      util.setCache(data);
    }
    
    this.setData({
      items: data
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      canOperate: false,
      selectArr: [],
      creating: false,
      animationData: {},
      textareaVal: ''
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})