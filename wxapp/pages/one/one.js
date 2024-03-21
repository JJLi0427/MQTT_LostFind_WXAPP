// pages/one/one.js
const app = getApp()
var newMsg = {}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    account: "",
    phoneNumber: "",
    imagePath: "/images/one.png",
  },

  getUser:function() {

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
      let that = this;
      wx.request({
        url:"http://121.43.238.224:8520/api/user",
        method:"POST",
        data:{
          f_id:newMsg.account,
          f_name:newMsg.name,
          f_phone:newMsg.phoneNumber
        },
        success:(res) => {
          that.setData({
            account: res.data.data[0].studentid,
            name: res.data.data[0].username,
            phoneNumber: res.data.data[0].phonenumber
          }),
          wx.showToast({
            title: "登录成功",
          }),
          app.globalData.uname = newMsg.name;
        },
        fail:(err) => {
          console.log(err);
        },
      })
    }
    console.log("name:"+app.globalData.uname)
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