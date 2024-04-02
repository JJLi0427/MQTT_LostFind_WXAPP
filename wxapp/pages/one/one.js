// pages/one/one.js
const app = getApp()
var newMsg = {}
Page({
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
          wx.showToast({
            title: "登录失败",
          });
        },
      })
    }
    console.log("name:"+app.globalData.uname)
  },

  onLoad(options) {

  },

  onReady() {
  },

  onShow() {
  },

  onHide() {
  },

  onUnload() {
  },

  onPullDownRefresh() {
  },

  onReachBottom() {
  },

  onShareAppMessage() {
  }
})