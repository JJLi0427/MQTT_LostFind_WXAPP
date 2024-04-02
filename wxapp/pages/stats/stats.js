// pages/stats/stats.js
Page({
  data: {
    user: {
      list: [
        
     ],
     totalUser: 0,
     activeNumber: 0,
    },
    todayFound: 0,
    totalFound: 0,
  },

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
  },
})