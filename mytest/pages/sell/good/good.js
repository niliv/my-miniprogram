var constants = require('../../../config/constants.js');
var utils = require('../../../utils/util.js');
var fail = require('../../template/fail/fail.js');
var api = require('../../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    height: '',
    goodId: '',
    goodsImg: '',
    goodsName: '',
    goodsDetail: '',
    goodsMonthSellcount: '',
    goodsPrice: '',
    ico_share: '../../../' + constants.ico_share
  },
  failOnclick: function () {
    var pages = getCurrentPages();
    fail.default.onReflash(pages);
    this.setData({
      isShow: true
    })
  },
  getGoodsDetail: function () {
    var that = this;
    utils.request(api.Goods_Detail, { goods_id: that.data.goodId }).then(
      res => {
        let sheight = utils.getImageScale();
        that.setData({
          height: sheight,
          goodsImg: res.goods_img || '../../../' + constants.img_default,
          goodsName: res.goods_name || '',
          goodsDetail: res.goods_detail || '',
          goodsMonthSellcount: res.goods_month_sellcount || 0,
          goodsPrice: res.goods_price || 0
        })
        wx.hideLoading();
      },
      err => {
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
    utils.setPageTitle(constants.PageTitle_GoodsDetail);
    var that = this;
    that.setData({
      goodId: options.goodId || ''
    })
    this.getGoodsDetail();
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