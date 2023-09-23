package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	mqtt "github.com/eclipse/paho.mqtt.golang"
)

func main() {
	// 创建MQTT客户端连接配置
	opts := mqtt.NewClientOptions()
	opts.AddBroker("lostfind.cn:1883") // 设置MQTT代理服务器地址
	opts.SetClientID("Goclient")

	// 创建MQTT客户端
	client := mqtt.NewClient(opts)
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		log.Fatal(token.Error())
	}

	// 接收消息的回调函数
	messageHandler := func(client mqtt.Client, msg mqtt.Message) {
		fmt.Printf("接收到主题[%s]的消息: %s\n", msg.Topic(), msg.Payload())
	}
	

	// 订阅主题
	topics := []string{"lost", "find"}
	for _, topic := range topics {
		if token := client.Subscribe(topic, 0, messageHandler); token.Wait() && token.Error() != nil {
			log.Fatal(token.Error())
		}
		fmt.Printf("已订阅主题: %s\n", topic)
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
