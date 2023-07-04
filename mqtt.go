package main

import (
	"fmt"
	"log"
	"time"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

func main() {
	// 创建一个MQTT客户端实例
	opts := MQTT.NewClientOptions().AddBroker("43.142.90.79:1883")
	opts.SetClientID("mqtt-client")
	opts.SetUsername("t1")
	opts.SetPassword("1234556")
	// 设置消息接收处理函数
	opts.SetDefaultPublishHandler(func(client MQTT.Client, msg MQTT.Message) {
		go func() {
			fmt.Printf("Received message: %s from topic: %s\n", msg.Payload(), msg.Topic())
		}()
	})
	// 创建一个MQTT客户端
	client := MQTT.NewClient(opts)
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		log.Fatal(token.Error())
	}
	// 订阅一个主题
	topic := "q"
	qos := 1
	if token := client.Subscribe(topic, byte(qos), nil); token.Wait() && token.Error() != nil {
		log.Fatal(token.Error())
	}
	fmt.Printf("Subscribed to topic: %s\n", topic)
	// 发布一条消息
	message := "pcp"
	if token := client.Publish(topic, byte(qos), false, message); token.Wait() && token.Error() != nil {
		log.Fatal(token.Error())
	}
	fmt.Printf("Published message: %s to topic: %s\n", message, topic)
	// 等待一段时间，以便接收到消息
	time.Sleep(60 * time.Second)
	// 取消订阅主题
	if token := client.Unsubscribe(topic); token.Wait() && token.Error() != nil {
		log.Fatal(token.Error())
	}
	fmt.Printf("Unsubscribed from topic: %s\n", topic)
	// 断开MQTT连接
	client.Disconnect(250)
	fmt.Println("Disconnected from MQTT broker")
}
