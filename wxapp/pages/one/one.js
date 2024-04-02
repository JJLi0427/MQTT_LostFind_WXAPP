// pages/one/one.js
import mqtt from "../../utils/mqtt.min.js";
const app = getApp()
var newMsg = {}

Page({
  data: {
    name: "",
    account: "",
    phoneNumber: "",
    imagePath: "/images/one.png",
  },

  nameInput(e){
    newMsg.name = e.detail.value
  },

  accountInput(e){
    newMsg.account = e.detail.value
  },

  phoneNumberInput(e){
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
  },
  
  signIn() {
    if(newMsg.account != "" && newMsg.name != "" && newMsg.phoneNumber != "") {
      const clientId = new Date().getTime()
      this.data.client = mqtt.connect(`wxs://101.201.100.189:8084/mqtt`, {
        ...this.data.mqttOptions,
        clientId,
      })
      if (this.data.client) {
        this.data.client.publish("signup", newMsg.account+","+newMsg.name+","+newMsg.phoneNumber);
      }
      setTimeout(()=>{
        this.data.client.end();
        this.data.client = null;
      },1000)
      wx.showLoading({
        title: '注册中',
        mask: true
      })
      setTimeout(function () {
        wx.hideLoading(),
        this.updateMsg()
      }, 2000)      
      // this.updateMsg()
    }
  },

  onLoad(options) {

  },
})