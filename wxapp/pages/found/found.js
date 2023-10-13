// pages/found/found.js

var newitem = {}
newitem.imgsrc = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    found:{
      list:[
        {
          "id":1,
          "name":"iPhone 12",
          "area":"SY101",
          "photo":"/images/iphone12.jpg",
          "userName": "lijj",
          "phoneNumber": "18888888888"
        },
        {
          "id":2,
          "name":"apple watch",
          "area":"YF412",
          "photo":"/images/watch.jpg",
          "userName": "lijj",
          "phoneNumber": "18888888888"
        },
     ],
     totalFound: 2,
    },
    mylost:{
      list:[
        {
          "id":1,
          "name":"iPhone 14 ProMax",
          "area":"SY201",
          "photo":"/images/iphone.jpg",
          "userName": "lijj",
          "phoneNumber": "18888888888"
        },
        {
          "id":2,
          "name":"Macbook Pro 15'",
          "area":"YF312",
          "photo":"/images/macbook.jpg",
          "userName": "lijj",
          "phoneNumber": "18888888888"
        },
        {
          "id":3,
          "name":"airpods Pro",
          "area":"SX105",
          "photo":"/images/airpods.jpg",
          "userName": "lijj",
          "phoneNumber": "18888888888"
        }
     ],
     totalLost: 3,
    },
  },

  FindTheRow(e){
    var index = e.currentTarget.dataset.index;
    var foundItem = this.data.found.list[index];
    var phoneNumber = foundItem.phoneNumber;
    var name = foundItem.userName;

    wx.showModal({
      title: '请联系',
      content: '请联系 ' + name + '（+86）' + phoneNumber,
      confirmColor: "#ff461f",
      success: (res) => {
        if (!res.confirm) {
          return
        }
      }
    })
    wx.showModal({
      title: '是否已找回？',
      confirmColor: "#ff461f",
      success: (res) => {
        if (!res.confirm) {
          return
        }
        var nid = e.currentTarget.dataset.nid;
        var index = e.currentTarget.dataset.index;
        var dataList = this.data.mylost.list;
        var findList = this.data.found.list;
        var removedItem = dataList.splice(index, 1)[0]; // Remove item from dataList and store it in removedItem
        
        let totalLost = this.data.mylost.totalLost - 1;
        let totalFound = this.data.found.totalFound + 1;
        
        findList.push(removedItem); // Add removed item to findList
        
        // Update the data in your component/state as needed
        this.setData({
          'mylost.list': dataList,
          'mylost.totalLost': totalLost,
          'found.list': findList,
          'found.totalFound': totalFound
        });
   
        wx.showLoading({
          title: '处理中',
          mask:true
        })
        this.setData({
          "mylost.list":dataList,
          "mylost.totalLost":totalLost,
          "found.list": findList,
          "found.totalFound": totalFound
        })
        wx.hideLoading()
      }
    })
  },

  additem(e){
    if(newitem.name != "" && newitem.area != ""){
      let total = this.data.mylost.total + 1
      this.setData({
        "mylost.total":total 
      })
      newitem.id = total
      this.setData({
        "mylost.list": this.data.mylost.list.concat(newitem)
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