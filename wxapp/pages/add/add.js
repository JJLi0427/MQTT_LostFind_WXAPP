// pages/add/add.js
import mqtt from "../../utils/mqtt.min.js";
var newitem = {}
var app = getApp()
newitem.photo = "/images/photo.png"
Page({
  data: {
    mylost:{
      list:[

     ],
     total: "",
    },
    imgsrc:'/images/photo.png',
    client: null,
    username: "Jiajun Li"
  },
  doDeleteRow(e){
    wx.showModal({
      title: '确认是否删除？',
      confirmColor: "#ff461f",
      success: (res) => {
        if (!res.confirm) {
          return
        }
        var nid = e.currentTarget.dataset.nid;
        const clientId = new Date().getTime()
        this.data.client = mqtt.connect(`wxs://101.201.100.189:8084/mqtt`, {
          ...this.data.mqttOptions,
          clientId,
        })
        if (this.data.client) {
          this.data.client.publish("delete",String(nid));
        }
        setTimeout(()=>{
          this.data.client.end();
          this.data.client = null;
        },1000)
        var index = e.currentTarget.dataset.index
        var dataList = this.data.mylost.list
        dataList.splice(index,1)
        let total = this.data.mylost.total - 1
        wx.showLoading({
          title: '删除中',
          mask:true
        })
        this.setData({
          "mylost.list":dataList,
          "mylost.total":total
        })
        wx.hideLoading()
      }
    })
  },
  nameinput(e){
    newitem.name = e.detail.value
  },
  areainput(e){
    newitem.area = e.detail.value
  },
  setPhoneNumber(e){
    
  },
  chooseimg(e) {
		wx.chooseMedia({
			count: 1, 
			mediaType: ['image'], 
			sizeType: ['compressed'],
			sourceType: ['album'],
      success: res=>{
        newitem.setData({
          photo:wx.getFileSystemManager().readFileSync(res.tempFiles[0].tempFilePath, 'base64')
        }), 
        () => console.log(newitem.photo)
      }
		})
  },
  additem(e){
    if (newitem.photo == "/images/photo.png") {
      newitem.photo = wx.getFileSystemManager().readFileSync("/images/photo.png", 'base64')
    }
    if(newitem.name != "" && newitem.area != "" && newitem.phoneNumber != "" && app.globalData.uname != "app"){
      let total = this.data.mylost.total + 1
      this.setData({
        "mylost.total":total 
      })
      newitem.id = total
      this.setData({
        "mylost.list": this.data.mylost.list.concat(newitem)
      })
      const clientId = new Date().getTime()
      this.data.client = mqtt.connect(`wxs://101.201.100.189:8084/mqtt`, {
        ...this.data.mqttOptions,
        clientId,
      })
      if (this.data.client) {
        this.data.client.publish("lost",app.globalData.uname+","+newitem.name+","+newitem.area+","+newitem.photo);
        wx.showToast({
          title: "上传中",
        })
      }
      setTimeout(()=>{
        this.data.client.end();
        this.data.client = null;
      },1000)
    }
  },

  onLoad(options) {

  },

  onReady() {
  },

  onShow() {
    let that = this;
    wx.request({
      url:"http://121.43.238.224:8520/api/sutff",
      method:"POST",
      data:{
        nm:app.globalData.uname
      },
      success:(res) => {
        that.setData({
          "mylost.list": res.data.data,
          "mylost.total": res.data.data.length
        })
      },
      fail:(err) => {
        console.log(err);
      }
    })
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