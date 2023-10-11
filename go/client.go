package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"time"

	mqtt "github.com/eclipse/paho.mqtt.golang"
)

func main() {
	// 创建MQTT客户端连接配置
	opts := mqtt.NewClientOptions()
	opts.AddBroker("lostfind.cn:1883") // 设置MQTT代理服务器地址
	opts.SetClientID("receiveclient")
	timestamp := time.Now().Unix() // 获取当前时间戳
	clientID := fmt.Sprintf("receiveclient_%d", timestamp)
	opts.SetClientID(clientID)

	// 创建MQTT客户端
	client := mqtt.NewClient(opts)
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		log.Fatal(token.Error())
	}

	// 接收消息的回调函数
	messageHandler := func(client mqtt.Client, msg mqtt.Message) {
		fmt.Printf("Recevie topic[%s]  message: %s\n", msg.Topic(), msg.Payload())
		if (msg.Topic() == "exit") {
			fmt.Printf("    remot-eclient log out safely.\n")
		}
		if (msg.Topic() == "error") {
			fmt.Printf("    remot-eclient lost connection, please try again later.\n")
		}
	}

	// 订阅主题
	topics := []string{"lost", "find", "exit", "error"}
	for _, topic := range topics {
		if token := client.Subscribe(topic, 0, messageHandler); token.Wait() && token.Error() != nil {
			log.Fatal(token.Error())
		}
		fmt.Printf("Subscribe: %s\n", topic)
	}

	// 等待消息处理
	waitForInterrupt()

	// 断开MQTT连接
	client.Disconnect(250)
}

func waitForInterrupt() {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	<-c
}
