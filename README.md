# A Lost and Find WXAPP Base on MQTT Communication 
![GitHub watchers](https://img.shields.io/github/watchers/JJLi0427/MQTT_LostFind_wxapp)
![GitHub Repo stars](https://img.shields.io/github/stars/JJLi0427/MQTT_LostFind_wxapp)
![GitHub forks](https://img.shields.io/github/forks/JJLi0427/MQTT_LostFind_wxapp)

### Contributors
<a href="https://github.com/JJLi0427/MQTT_LostFind_wxapp/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=JJLi0427/MQTT_LostFind_wxapp" />
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
#### For lost item
| id  | username  | type | name       | area   | photo             |
|-----|-----------|------|------------|--------|-------------------|
| 43  | Wuliuqi   | find | huawei     | yf502  | /images/photo.png |
| 44  | Wuliuqi   | find | computer   | sy321  | /images/photo.png |
| 46  | Jiajunli  | find | iphone     | sx501  | /images/photo.png |
| 52  | Jiajunli  | lost | airpods    | yf101  | /images/photo.png |
| 53  | Jiajunli  | find | watch      | sd206  | /images/photo.png |
| 54  | longshuo  | find | cup        | sy303  | /images/photo.png |
| 55  | longshuo  | lost | key        | sy401  | /images/photo.png |  

#### For WXAPP user
| studentid | username    | phonenumber      |
|-----------|-------------|------------------|
| 21271260  | JiajunLi    | 13538082049      |
| 21281165  | longshuo    | 12222222222      |
| 22222222  | Wuliuqi     | 18888888888      |
| 22222223  | Josewalker  | 16600923289      |

### MQTT Communication
In the field of Internet of Things communication, MQTT is the protocol of choice for most people. This protocol adopts a publish/subscribe model, where only subscribers to specific topics can receive specific messages. All communications are relayed through the MQTT server, enhancing both security and transmission efficiency. By developing a lost and found mini-program based on this, we can ensure timely and secure information dissemination within the campus.

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
- [失物表](#For-lost-item)存储了丢失物品相关的信息
- [用户表](#For-WXAPP-user)存储了用户相关的数据

### MQTT通信
在物联网通信中，MQTT 是大部分人的首选，这个协议采用的是发布/订阅模式，只有订阅了特定的主题才能收到特定的消息，所有通信都是基于 MQTT 服务器做的中转，这提高了安全性和传输的效率。基于此开发失物招领小程序，我们可以保证校园内的信息发布及时和安全。

### 小程序设计
我们总共为这个失物招领小程序设计了五个页面:   
- `主页`: 是小程序的入口，也是所有功能页面的入口
- `用户页`: 显示用户信息，所有用户都需要在这个页面先登录
- `丢失页`: 用户可以在这个页面上传和管理他们的失物
- `寻得页`: 找到了失物的用户可以在这个页面更新信息
- `总结页`: 程序运行历史记录总结

## Dependencise
1. We choose MySQL as our project database
2. Use DBAIPI for WXAPP on load and some page on show
3. Use a js MQTT project help WXAPP connect the go client

## Quick start
Build go MQTT clinet from source code client.go and run it:
```bash
GOOS={$YOUR_SYSTEM} GOARCH={$YOUR_CPU} go build client.go -o clinet
./clinet
```
Load WXAPP project through wechat developer application:
## Todo
1. -[ ] WXAPP implements online user registration
2. -[ ] WXAPP realize lost items'photo upload

## License
This project is licensed under the [MIT License](https://opensource.org/license/MIT) - see the [LICENSE.txt](https://github.com/JJLi0427/MQTT_LostFind_wxapp/blob/main/LICENSE.txt) file for details.
