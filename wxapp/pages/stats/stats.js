// pages/stats/stats.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{
      list:[      //后面加上数据库需要重新定向最新的添加进来的人
        {         //因为我们不确定最新的是否为第一个，也许可以加一个新的标注               
          "id":1, //金程需要添加一个计数在jsonresponse里
          "username": "lijj",
          "name":"airpods Pro",
          "area":"SX105",
          "photo":"/images/airpods.jpg"
        }
     ],
     total: 3,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})