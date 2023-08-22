// pages/add/add.js
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
          "photo":"/images/iphone.jpg"
        },
        {
          "id":2,
          "name":"Macbook Pro 15'",
          "area":"YF312",
          "photo":"/images/macbook.jpg"
        },
        {
          "id":3,
          "name":"airpods Pro 2th",
          "area":"SX105",
          "photo":"/images/airpods.jpg"
        }
     ],
     total: 3
    }
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
        // wx.request({
        //   url: api.bank + nid + '/',
        //   method:'DELETE',
        //   success:(res) =>{
        //     let total = this.data.mylost.total - 1
        //     if(total <0){
        //       total = 0
        //     } 
        //     this.setData({
        //       ["mylost.list"]:dataList,
        //       ["mylost.total"]:total,
        //     })
        //   },
        //   complete() {
        //     wx.hideLoading()
        //   }
        // })
       
      }
    })
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