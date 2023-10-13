// pages/one/one.js
var newMsg = {}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: "伍六七",
    account: "21288888",
    phoneNumber: "1888288888",
    imagePath: "/images/one.png",
  },

  getUser:function() {
    let outer = this;
    wx.getUserInfo({
      success: function (res) {
        console.log('success', res)
        outer.setData({
          name: res.userInfo.nickName,
          imagePath: res.userInfo.avatarUrl,
        });
      },
      fail: function(res) {
        console.log('fail', res)
      }
    })
  },
  nameInput(e){
    newMsg.name = e.detail.value
  },
  accountInput(e){
    newMsg.account = e.detail.value
  },
  phoneNumberInput(e){
    // console.log("Phone Number Input: " + e.detail.value)
    newMsg.phoneNumber = e.detail.value
  },
  updateMsg(e){
    if(newMsg.account != "" && newMsg.name != "" && newMsg.phoneNumber != "") {
      this.setData({
        "account": newMsg.account,
        "name": newMsg.name,
        "phoneNumber": newMsg.phoneNumber,
      })
      wx.showToast({
        title: "更新成功",
      })
    }
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