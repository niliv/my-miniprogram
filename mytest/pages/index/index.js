var utils = require('../../utils/util.js');
var api = require('../../config/api.js');
var constants = require('../../config/constants.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // imgUrls: [],
    // indicatorDots: constants.IndicatorDots,
    // autoplay: constants.Autoplay,
    // interval: constants.Interval,
    // duration: constants.Duration,
    img_fail: '../../' + constants.img_fail,
    ico_zb: '../../' + constants.ico_zb,
    ico_phone: '../../' + constants.ico_phone,
    ico_time: '../../' + constants.ico_time,
    ico_picture: '../../' + constants.ico_picture,
    ico_notice: '../../' + constants.ico_notice,
    img_call: '../../' + constants.img_call,
    img_mina: '../../' + constants.img_mina,
    img_first: '../../' + constants.img_first,
    img_drop: '../../' + constants.img_drop,
    isShow: true,
    storeImg: '',
    height: 0,
    address: '',
    phone: '',
    delivery_time: '',
    new_user_reduction: '',
    minaDiscount: ''
  },
  onShareAppMessage: function () {
    debugger;
    return {
      title: constants.AppTitle,
      desc: constants.AppDesc,
      path: constants.AppHome
    }
  },
  setHeight: function (e) {
    let sheight = utils.getImageScale(e);
    console.log(sheight)
    this.setData({
      height: sheight
    })
  },
  getStoreDetail: function(){
    var that = this;
    utils.request(api.Store_Detail, { shopId: app.globalData.storeId}).then(
      res=>{
        console.log(res)
        wx.setNavigationBarTitle({
          title: res.store_name || constants.title_default
        }),
        that.setData({ 
          storeImg: res.store_img || '../../' + constants.img_default,
          address: res.address || constants.address_default,
          phone: res.phone || constants.phone_default,
          delivery_time: res.delivery_time || constants.time_default,
          new_user_reduction: res.new_user_reduction || "0",
          minaDiscount: 10 - (+(res.weixin_order_reduction || "0"))*10 + ''
        })
        wx.setStorage({
          key: 'storeInfo',
          data: res,
        })
      },
      err=>{
        wx.hideLoading();
        that.setData({
          isShow: false
        })
        utils.showErrorToast(constants.Msg_DataError);
        console.log(err)
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setHeight();
    
    this.getStoreDetail();
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