var utils = require('../../utils/util.js');
var api = require('../../config/api.js');
var constants = require('../../config/constants.js');
var fail = require('../template/fail/fail.js');
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
    minaDiscount: '',
    latitude: '',
    longitude: '',
    notice: '',
    cAdddress: '',
    cAddIsShow: true
  },
  failOnclick: function(){
    var pages = getCurrentPages();
    console.log(pages)
    console.log(fail)
    fail.default.onReflash(pages);
    this.setData({
      isShow: true
    })
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
          address: utils.cutstr((res.address || constants.address_default),34),
          phone: res.phone || constants.phone_default,
          delivery_time: res.delivery_time || constants.time_default,
          new_user_reduction: res.new_user_reduction || "0",
          minaDiscount: 10 - (+(res.weixin_order_reduction || "0"))*10 + '',
          notice: utils.cutstr((res.notice || constants.notice_default),80)
        })
        wx.setStorage({
          key: constants.Storage_StoreInfo,
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
    this.getCustomLocation();
    
  },
  openLocation:function(){
    if (this.data.address === constants.address_default) {
      utils.showErrorToast(constants.Msg_AddrError);
      return;
    }
    var that=this;
    utils.getLocalStorage(constants.Storage_StoreInfo,
      res=>{
        that.setData({
          latitude: res.data.latitude || '30.657420',
          longitude: res.data.longitude || '104.065840',
        })
        wx.openLocation({
          longitude: Number(that.data.longitude),
          latitude: Number(that.data.latitude),
          scale: 18
        })
      }, 
      err=>{
        utils.showErrorToast(constants.Msg_AddrError);
        console.log(err)
    })
  },
  callPhone: function(){
    if (this.data.phone === constants.phone_default){
      utils.showErrorToast(constants.Msg_PhoneError);
      return;
    }
    utils.phone(this.data.phone, err => {
      utils.showErrorToast(constants.Msg_PhoneError);
      console.log(err)
    })
  },
  getCustomLocation: function(){
    var that = this
    wx.getSetting({
      success: function(res){
        if (res.authSetting[constants.Scope_UserLocation]) {
          utils.getUserLocationInfo(function(addr){
            that.setData({
              cAddress: addr.formatted_addresses.recommend,
              cAddIsShow: true
            })
          })
        }else{
          wx.openSetting({
            success: function(res){
              if (res.authSetting[constants.Scope_UserLocation]) {
                utils.getUserLocationInfo(function (addr) {
                  that.setData({
                    cAddress: addr.formatted_addresses.recommend,
                    cAddIsShow: true
                  })
                })
              }else{
                that.setData({
                  cAddIsShow: false
                })
              }
            }
          })
        }
      }
    })
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
    return {
      title: constants.AppTitle,
      desc: constants.AppDesc,
      path: constants.AppHome
    }
  }
})