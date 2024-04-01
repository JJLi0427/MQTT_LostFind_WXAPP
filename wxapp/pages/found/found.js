// pages/found/found.js
import mqtt from "../../utils/mqtt.min.js";
import {Base64} from "../../utils/base64";
var newitem = {}
newitem.imgsrc = ""

Page({
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
    phone : "phone",
    name : "name"
  },

  FindTheRow(e){
    var index = e.currentTarget.dataset.index;
    var foundItem = this.data.mylost.list[index];
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
            this.setData({
              name: res.data.data[0].username
            }, () => {
              wx.request({
                url:"http://121.43.238.224:8520/api/getphone",
                method:"POST",
                data:{user:this.data.name},
                success:(res) => {
                  this.setData({
                    phone: res.data.data[0].phonenumber
                  }, () => {
                    wx.showModal({
                      title: '请联系',
                      content: this.data.name + ': (+86)' + this.data.phone,
                      confirmColor: "#ff461f",
                      success: (res) => {
                        if (!res.confirm) {
                          return
                        }
                      }
                    })
                  })
                }
              })
            });
          }
        })
        const clientId = new Date().getTime()
        this.data.client = mqtt.connect(`wxs://101.201.100.189:8084/mqtt`, {
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

  onLoad(options) {
    let that = this;
    wx.request({
      url:"http://121.43.238.224:8520/api/sutffbytype",
      method:"POST",
      // data:{nm:"Jiajun Li"},
      data:{tp:"lost"},
      success:(res) => {
        let processedData = res.data.data.map(item => {
          item.photo = Base64.decode(item.photo);
          return item;
        });
        that.setData({
          "mylost.list": processedData,
          "mylost.total": processedData.length
        })
      },
      fail:(err) => {console.log(err);}
    })
    wx.request({
      url:"http://121.43.238.224:8520/api/sutffbytype",
      method:"POST",
      data:{tp:"find"},
      success:(res) => {
        let processedData = res.data.data.map(item => {
          item.photo = Base64.decode(item.photo);
          return item;
        });
        that.setData({
          "found.list": processedData,
          "found.totalFound": processedData.length
        })
      },
      fail:(err) => {console.log(err);}
    })
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