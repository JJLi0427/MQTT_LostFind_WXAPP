// pages/stats/stats.js
const mqtt = require("../../utils/mqtt.min.js");
let client = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: {
      list: [      //后面加上数据库需要重新定向最新的添加进来的人
        {         //因为我们不确定最新的是否为第一个，也许可以加一个新的标注               
          "id":1, //金程需要添加一个计数在jsonresponse里
          "username": "lijj",
          "name":"airpods Pro",
          "area":"SX105",
          "photo":"/images/airpods.jpg"
        }
     ],
     totalUser: 100,
     activeNumber: 10,
    },
    todayFound: 2,
    totalFound: 123,
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


    //mqtt code
    client = mqtt.connect("wxs://121.43.238.224:8084/mqtt");
    client.on('connect',() => {
    });
    client.subscribe('wx/todayFound', {
      qos: 0
    }, (err) => {
      if (!err) {
        console.log("订阅成功")
      }
    });
    client.on('message', (topic, message) => {
      if (topic.toString() == "wx/todayFound")
        this.setData({todayFound : this.data.todayFound + 1});
    });
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
    client.end();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    client = null;
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