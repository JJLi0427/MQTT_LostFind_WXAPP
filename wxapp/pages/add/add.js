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
        wx.request({
          url:"http://121.43.238.224:8520/api/sutffdel",
          method:"POST",
          data:{id:nid},
          success:(res) => {
            console.log(res);
          },
          fail:(err) => {
            console.log(err);
          }
        })

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
			count: 1, // 最多可以选择的文件个数
			mediaType: ['image'], // 文件类型
			sizeType: ['original'], // 是否压缩所选文件
			sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
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
      console.log(app.globalData.uname);
      let total = this.data.mylost.total + 1
      this.setData({
        "mylost.total":total 
      })
      newitem.id = total
      this.setData({
        "mylost.list": this.data.mylost.list.concat(newitem)
      })
      //MQTT publish demo
      const clientId = new Date().getTime()
      this.data.client = mqtt.connect(`wxs://101.201.100.189:8084/mqtt`, {
        ...this.data.mqttOptions,
        clientId,
      })
      if (this.data.client) {
        this.data.client.publish("lost",app.globalData.uname+","+newitem.name+","+newitem.area+","+newitem.photo);
        //return;
        wx.showToast({
          title: "发送成功",
        })
      }
      setTimeout(()=>{
        this.data.client.end();
        this.data.client = null;
      },1000)
    }
  },
  disconnect() {
    this.data.client.end();
    this.data.client = null;
  },

  onLoad(options) {

  },

  onReady() {
  },

  onShow() {
    console.log("name:"+app.globalData.uname)
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