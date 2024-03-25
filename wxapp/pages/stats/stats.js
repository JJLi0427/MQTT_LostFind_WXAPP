// pages/stats/stats.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: {
      list: [
        
     ],
     totalUser: 0,
     activeNumber: 0,
    },
    todayFound: 0,
    totalFound: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad(options) {
    let that = this;
    wx.request({
      url:"http://121.43.238.224:8520/api/sutffcount",
      success:(res) => {
        that.setData({
          totalFound: res.data.data[0].sutffcount
        })
      },
      fail:(err) => {console.log(err);}
    })
    wx.request({
      url:"http://121.43.238.224:8520/api/usercount",
      success:(res) => {
        that.setData({
          "user.totalUser": res.data.data[0].usercount
        })
      },
      fail:(err) => {console.log(err);}
    })
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