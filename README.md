![image](https://github.com/JJLi0427/MQTT_LostFind_wxapp/assets/133590809/7a21a1f9-a1ca-4930-97d7-b4a306f5227a)# A Lost and Find WXAPP Base on MQTT Communication 
![GitHub watchers](https://img.shields.io/github/watchers/JJLi0427/MQTT_LostFind_wxapp)
![GitHub Repo stars](https://img.shields.io/github/stars/JJLi0427/MQTT_LostFind_wxapp)
![GitHub forks](https://img.shields.io/github/forks/JJLi0427/MQTT_LostFind_wxapp)

### Contributors
<a href="https://github.com/JJLi0427/MQTT_LostFind_wxapp/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=JJLi0427/MQTT_LostFind_wxapp" />
</a>

### Menu
- [English Introduction](##Introduction)
- [中文介绍](##中文简介)
- [Dependencies](##Dependencise)
- [Quick start](##Quick-start)
- [Todo](##Todo)
- [License](##License)

## Introduction
We are a group of students from Beijing Jiaotong University aiming to develop a campus lost and found mini program. Having recognized the lightweight, convenient, and secure nature of the MQTT communication protocol, we have chosen to build our project around it. Currently, we have successfully crafted a comprehensive mini program interface and interactive logic. For the communication related to lost and found items, we have developed a communication client using Go language to interact with the backend database effectively.

### Project Structure

### Database Design

### MQTT Communication

### WXAPP Design

## 中文简介

### 架构设计

### 数据库

### MQTT通信
1. 设计目标：
   用于物联网中，提高信息传递的安全以及效率。
2. 连接模式：
   MQTT采用轻量级的发布/订阅模式，客户端可以订阅特定的主题，服务器发布消息时，所有订阅了该主题的客户端都会收到消息。
3. 效率：
   MQTT比DBAPI更加高效。
4. 安全性：
   在wxapp中，丢失物品和找到物品的操作这两个关键信息用MQTT传递，保证了数据传输的安全性。
6. 客户端开发：
   go语言客户端自带高并发，性能好。
   总而言之，在物联网应用中，MQTT是更优的选择。
### 小程序设计

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
2. -[ ] Fix some bug

## License
This project is licensed under the [MIT License](https://opensource.org/license/MIT) - see the [LICENSE.txt](https://github.com/JJLi0427/MQTT_LostFind_wxapp/blob/main/LICENSE.txt) file for details.
