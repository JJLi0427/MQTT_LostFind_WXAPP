// pages/found/found.js
import mqtt from "../../utils/mqtt.min.js";
var newitem = {}
newitem.imgsrc = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    found:{
      list:[

     ],
     totalFound: "",
    },
    mylost:{
      list:[

     ],
     totalLost: 0,
    },
    client: null,
  },

  FindTheRow(e){
    var index = e.currentTarget.dataset.index;
    var foundItem = this.data.mylost.list[index];
    var phone = ""
    var name = ""

    wx.showModal({
      title: '是否已找回？',
      confirmColor: "#ff461f",
      success: (res) => {
        if (!res.confirm) {
          return
        }
        var nid = e.currentTarget.dataset.nid;    
        wx.request({
          url:"http://121.43.238.224:8520/api/lostuser",
          method:"POST",
          data:{id:nid},
          success:(res) => {
            console.log(res)
          }
        })
        wx.request({
          url:"http://121.43.238.224:8520/api/getphone",
          method:"POST",
          data:{user:name},
          success:(res) => {
            phone = res
          }
        })
        // wx.request({
        //   url:"http://121.43.238.224:8520/api/found",
        //   method:"POST",
        //   data:{id:nid},
        //   success:(res) => {
        //     console.log(res.data.data);
        //   },
        //   fail:(err) => {console.log(err);}
        // })
        const clientId = new Date().getTime()
        this.data.client = mqtt.connect(`wxs://lostfind.cn:8084/mqtt`, {
          ...this.data.mqttOptions,
          clientId,
        })
        if (this.data.client) {
          this.data.client.publish("find",String(nid));
        }
        setTimeout(()=>{
          this.data.client.end();
          this.data.client = null;
        },1000)
        wx.showModal({
          title: '请联系',
          content: name + ': (+86)' + phone,
          confirmColor: "#ff461f",
          success: (res) => {
            if (!res.confirm) {
              return
            }
          }
        })
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
   
        // wx.showLoading({
        //   title: '处理中',
        //   mask:true
        // })
        // this.setData({
        //   "mylost.list":dataList,
        //   "mylost.totalLost":totalLost,
        //   "found.list": findList,
        //   "found.totalFound": totalFound
        // })
        // wx.hideLoading()
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
    let that = this;
    wx.request({
      url:"http://121.43.238.224:8520/api/sutffbytype",
      method:"POST",
      // data:{nm:"Jiajun Li"},
      data:{tp:"lost"},
      success:(res) => {
        //静态用户数据绑定
        res.data.data.forEach(function(value,index,data){
          value.userName = "LJJ";
          value.phoneNumber = "18888888888";
          console.log("value:",value,"index:",index,"data:",data);
        });
        //------
        that.setData({
          "mylost.list": res.data.data,
          "mylost.total": res.data.data.length
        })
      },
      fail:(err) => {console.log(err);}
    })
    wx.request({
      url:"http://121.43.238.224:8520/api/sutffbytype",
      method:"POST",
      data:{tp:"find"},
      success:(res) => {
        that.setData({
          "found.list": res.data.data,
          "found.totalFound": res.data.data.length
        })
      },
      fail:(err) => {console.log(err);}
    })
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