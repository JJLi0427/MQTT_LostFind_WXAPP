# A Lost and Find WXAPP Base on MQTT Communication 
<div style="display:flex;">
  <img src="https://github.com/JJLi0427/MQTT_LostFind_WXAPP/assets/112649584/cc003934-f94b-47cd-b077-490bdcc4f28b" style="width:20%;">
  <img src="https://github.com/JJLi0427/MQTT_LostFind_WXAPP/assets/112649584/902bb7d2-b87d-4559-a12c-d7cd6ed9e0cf" style="width:16%;">
  <img src="https://github.com/JJLi0427/MQTT_LostFind_WXAPP/assets/112649584/4ee4251f-2bea-4d31-b44d-8796e06ce8aa" style="width:20%;">
  <img src="https://github.com/JJLi0427/MQTT_LostFind_WXAPP/assets/112649584/902bb7d2-b87d-4559-a12c-d7cd6ed9e0cf" style="width:16%;">
  <img src="https://github.com/JJLi0427/MQTT_LostFind_WXAPP/assets/112649584/542e9391-0a9b-4fce-ac33-8754bc45bf4f" style="width:20%;">
</div>

![Github Created At](https://img.shields.io/github/created-at/JJLi0427/MQTT_LostFind_WXAPP?style=flat)
![GitHub Release Date](https://img.shields.io/github/release-date/JJLi0427/MQTT_LostFind_WXAPP?style=flat)
![GitHub License](https://img.shields.io/github/license/JJLi0427/MQTT_LostFind_WXAPP?style=flat&labelColor=grey&color=brown)
![GitHub watchers](https://img.shields.io/github/watchers/JJLi0427/MQTT_LostFind_WXAPP?style=flat&logo=github&labelColor=grey&color=green)
![GitHub Repo stars](https://img.shields.io/github/stars/JJLi0427/MQTT_LostFind_WXAPP?style=flat&logo=github&labelColor=grey&color=orange)
![GitHub forks](https://img.shields.io/github/forks/JJLi0427/MQTT_LostFind_WXAPP?style=flat&logo=github&labelColor=grey&color=blue)


### Contributors
<a href="https://github.com/JJLi0427/MQTT_LostFind_WXAPP/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=JJLi0427/MQTT_LostFind_WXAPP" />
</a>

### Menu
- [Introduction](#Introduction)
- [中文简介](#中文简介)
- [Dependencies](#Dependencise)
- [Quick start](#Quick-start)
- [Todo](#Todo)
- [License](#License)

## Introduction
We are a group of students from Beijing Jiaotong University aiming to develop a campus lost and found mini program. Having recognized the lightweight, convenient, and secure nature of the MQTT communication protocol, we have chosen to build our project around it. Currently, we have successfully crafted a comprehensive mini program interface and interactive logic. For the communication related to lost and found items, we have developed a communication client using Go language to interact with the backend database effectively.

### Project Structure
![Project Structure](./display/projectstructure.jpg)
In this project, we adopt a front-end and back-end separation approach. The front-end interface retrieves data from the back-end database via DBAPI when the mini-program is launched or a page is displayed. In scenarios of uploading lost items or finding lost items, we use an MQTT client developed in Go language to make modifications to the mini-program on the server, thereby ensuring information security and efficient communication. 

### Database Design
#### *For lost item*
| id  | username  | type | name       | area   | photo             |
|-----|-----------|------|------------|--------|-------------------|
| 43  | Wuliuqi   | find | huawei     | yf502  | /images/photo.png |
| 44  | Wuliuqi   | find | computer   | sy321  | /images/photo.png |
| 46  | Jiajunli  | find | iphone     | sx501  | /images/photo.png |
| 52  | Jiajunli  | lost | airpods    | yf101  | /images/photo.png |
| 53  | Jiajunli  | find | watch      | sd206  | /images/photo.png |
| 54  | longshuo  | find | cup        | sy303  | /images/photo.png |
| 55  | longshuo  | lost | key        | sy401  | /images/photo.png |   
* `id` each lost item will auto have an id in this table
* `username` is the woner name of lost property, it help us link to user table
* `type` means the lost item status
* `name` is the lost item name
* `area` is where you lost it
* `photo` show the lost item photo, *we will improve this feature in the future*

#### *For WXAPP user*
| studentid | username    | phonenumber      |
|-----------|-------------|------------------|
| 21271260  | JiajunLi    | 13538082049      |
| 21281165  | longshuo    | 12222222222      |
| 22222222  | Wuliuqi     | 18888888888      |
| 22222223  | Josewalker  | 16600923289      |  
* `studentid` consistent with the student id in school  
* `usewrname` every need a username
* `phonenumber` it help to contact with you

### MQTT Communication
In the Internet of Things communication, MQTT is the first choice of most people, this protocol adopts a publish/subscribe model, only subscribed to a specific topic can receive a specific message, all communication is based on the MQTT server to do the relay, which improves the security and transmission efficiency. Based on this, we develop a communication client between the Lost and Found Mini Program and the back-end database, receive the subscribed messages and then operate the database, so that we can ensure the security of information release and the efficiency of communication on campus.    
#### *An example of our MQTT client runtime*
```shell
Successfully connected to the database.
Subscribe: lost
Subscribe: find
Subscribe: exit
Subscribe: error
Recevie topic[lost]  message: Jiajunli,airpods,yf101,/images/photo.png
Lost stuff add to wxapp {User: Jiajunli, Name: airpods, Area: yf101}
Recevie topic[find]  message: 57
Stuff with id 57 has been marked as found
```

### WXAPP Design
![Interface Design](./display/wxappdesign.jpg)
- `Home page`: Show the WXAPP function enterance
- `User page`: Show user information, everyone should long in WXAPP in tihs page at first
- `Lost page`: User can add and manage their lost item in this page
- `Find page`: If any user find a lost item, thry can upload in this page
- `Summary page`: Show the summary of WXAPP work history 

## 中文简介
团队来自于北京交通大学，项目旨在开发一个校园失物招领小程序。由于 MQTT 通信协议具有轻量，便捷和安全的特性，我们选择基于它构建我们的项目。目前项目已经实现了小程序界面和逻辑交互。对于失物招领相关的通信，我们使用 Go 语言的通信客户端，以便小程序与后端数据库进行高效的交互。

### 架构设计
在这个项目中，我们采用前后端分离的方式，前端界面在小程序启动或者页面展示时通过DBAPI从后端数据库中获取数据。在上传失物或者是寻得失物的场景，通过我们使用 Go 语言开发的 MQTT 客户端对服务器中的小程序做修改，以此保证信息安全和通信的高效。

### 数据库
我们设计了以下两个表来存储我们的业务数据:   
1. [失物表](#For-lost-item)存储了丢失物品相关的信息
   * 失物ID-id
   * 丢失用户名-username
   * 当前状态-type
   * 丢失地点-area
   * 照片-photo
2. [用户表](#For-WXAPP-user)存储了用户相关的数据
   * 学生ID-studentid
   * 用户名-username
   * 手机号-phonenumber

### MQTT通信
在物联网通信中，MQTT 是大部分人的首选，这个协议采用的是发布/订阅模式，只有订阅了特定的主题才能收到特定的消息，所有通信都是基于 MQTT 服务器做的中转，这提高了安全性和传输的效率。基于此开发失物招领小程序和后端数据库之间的通信客户端，接收订阅的消息然后再操作数据库，这样我们可以保证校园内的信息发布的安全性和通信的效率。 

### 小程序设计
我们总共为这个失物招领小程序设计了五个页面:   
- `主页`: 是小程序的入口，也是所有功能页面的入口
- `用户页`: 显示用户信息，所有用户都需要在这个页面先登录
- `丢失页`: 用户可以在这个页面上传和管理他们的失物
- `寻得页`: 找到了失物的用户可以在这个页面更新信息
- `总结页`: 程序运行历史记录总结

## Dependencise
1. [MySQL](https://www.mysql.com/) as our project database
2. [DBAIPI](https://www.51dbapi.com/) for WXAPP on load and some page on show
3. [EMQX](https://www.emqx.io/zh) help us build MQTT server 
4. [MQTT client wechat miniprogram](https://github.com/emqx/MQTT-Client-Examples/tree/master/mqtt-client-wechat-miniprogram) project help WXAPP connect the go client

## Quick start
1. Clone our repo or download our release code
2. Modify the code, use your database server and MQTT server IP/domain name
3. Build go MQTT clinet from source code client.go and run it:
```shell
cd ./go
go mod init client
go mod tidy
GOOS={$YOUR_SYSTEM} GOARCH={$YOUR_CPU} go build client.go -o {$EXE_FILE_NAME}
./{$EXE_FILE_NAME}
```
4. Load WXAPP project through [Weixin DevTools](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
## Todo
1. -[ ] WXAPP implements online user registration
2. -[ ] WXAPP realize lost items'photo upload

## License
This project is licensed under the [MIT License](https://opensource.org/license/MIT) - see the [LICENSE.txt](https://github.com/JJLi0427/MQTT_LostFind_wxapp/blob/main/LICENSE.txt) file for details.

