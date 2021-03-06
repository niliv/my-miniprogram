var common = require('../../utils/common.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    txt:'',
    person: { address: '1321', remark: '3fdsf' },
    msg: '123'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('index launch')
    var app = getApp();
    this.setData({
      txt: app.globalData
    })
    console.log(common.name)
    common.sayHello('yuankun');
  },
  clickMe:(e)=>{
    console.log(e.currentTarget.dataset.id)
    console.log(e.currentTarget.dataset.title)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('index ready')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('index show')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('index hide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('index unload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('index refresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('index reachbottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('index share')
  }
})