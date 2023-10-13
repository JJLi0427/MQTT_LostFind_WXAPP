// pages/add/add.js
import mqtt from "../../utils/mqtt.min.js";
var newitem = {}
newitem.imgsrc = ""
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mylost:{
      list:[
        {
          "id":1,
          "name":"iPhone 14 ProMax",
          "area":"SY201",
          "photo":"/images/iphone.jpg",
          "phoneNumber": ""
        },
        {
          "id":2,
          "name":"Macbook Pro 15'",
          "area":"YF312",
          "photo":"/images/macbook.jpg",
          "phoneNumber": ""
        },
        {
          "id":3,
          "name":"airpods Pro",
          "area":"SX105",
          "photo":"/images/airpods.jpg",
          "phoneNumber": ""
        }
     ],
     total: 3,
    },
    imgsrc:'/images/photo.png',
    client: null
  },

  doDeleteRow(e){
    wx.showModal({
      title: '确认是否删除？',
      confirmColor: "#ff461f",
      success: (res) => {
        if (!res.confirm) {
          return
        }
        var nid = e.currentTarget.dataset.nid
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
    // 需要运用数据库发来的信息
    // 在addttem里面调用
  },
  chooseimg(e) {
		wx.chooseMedia({
			count: 1, // 最多可以选择的文件个数
			mediaType: ['image'], // 文件类型
			sizeType: ['original'], // 是否压缩所选文件
			sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: res=>{
        this.setData({
          imgsrc:res.tempFiles[0].tempFilePath
        })
        newitem.photo = res.tempFiles[0].tempFilePath
      }
		})
  },
  additem(e){
    if(newitem.name != "" && newitem.area != "" && newitem.phoneNumber != ""){
      let total = this.data.mylost.total + 1
      this.setData({
        "mylost.total":total 
      })
      newitem.id = total
      this.setData({
        "mylost.list": this.data.mylost.list.concat(newitem)
      })
      const clientId = new Date().getTime()
      this.data.client = mqtt.connect(`wxs://lostfind.cn:8084/mqtt`, {
        ...this.data.mqttOptions,
        clientId,
      })
      if (this.data.client) {
        this.data.client.publish("lost",newitem.name+","+newitem.area);
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