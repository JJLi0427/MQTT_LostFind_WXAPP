package main

import (
	"fmt"
	"log"
	"time"
	"math/rand"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

func main() {
	// mqtt客户端的属性
	var server string = "lostfind.cn:1883"
	opts := MQTT.NewClientOptions().AddBroker(server)
	rand.Seed(time.Now().UnixNano()) // 使用当前时间作为种子
	randomNum := fmt.Sprintf("%08d", rand.Intn(100000000)) // 生成8位随机数字符串
	opts.SetClientID("Goclient" + randomNum)
	opts.SetWill("error", "disconnect", 0, false) // 设置 Last Will 和 Testament，修改 "topic" 和 "offline" 为你想设置的主题和消息
	//opts.SetUsername("t1")
	//opts.SetPassword("1234556")
	// Set the message handler for receiving messages
	opts.SetDefaultPublishHandler(func(client MQTT.Client, msg MQTT.Message) {
		go func() {
			fmt.Printf("\n    Received: %s\n    topic: %s\n", msg.Payload(), msg.Topic())
		}()
	})
	// 新建客户端
	client := MQTT.NewClient(opts)
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		log.Fatal(token.Error())
	}

	// 连接成功
	fmt.Println("Connected to MQTT server: " + server)

	// 订阅消息列表
	subscriptions := make(map[string]byte)

	// 客户端功能列表
	fmt.Println("Please select an option:")
	fmt.Println("1. Add subscription topic")
	fmt.Println("2. Send message")
	fmt.Println("3. Remove subscription topic")
	fmt.Println("4. Exit")
	for {
		var option string
		fmt.Print("\nEnter your option: \n")
		fmt.Scanln(&option)
		switch option {
		case "1":
			// 添加订阅
			var topic string
			fmt.Print("\nEnter the topic you want to subscribe: \n")
			fmt.Scanln(&topic)
			qos := byte(1)
			if token := client.Subscribe(topic, qos, nil); token.Wait() && token.Error() != nil {
				log.Fatal(token.Error())
			}
			subscriptions[topic] = qos
			fmt.Printf("Subscribed topic: %s\n", topic)
		case "2":
			// 发送消息
			var topic, message string
			fmt.Print("\nEnter the message topic: \n")
			fmt.Scanln(&topic)
			fmt.Print("Enter the message content: \n")
			fmt.Scanln(&message)
			qos := byte(1)
			if token := client.Publish(topic, qos, false, message); token.Wait() && token.Error() != nil {
				log.Fatal(token.Error())
			}
			fmt.Printf("\n    Sent message: %s\n    topic: %s\n", message, topic)
		case "3":
			// 删除订阅
			fmt.Println("\nCurrent subscriptions:")
			for topic := range subscriptions {
				fmt.Println(topic)
			}
			var topic string
			fmt.Print("Enter the topic you want to unsubscribe: \n")
			fmt.Scanln(&topic)
			if token := client.Unsubscribe(topic); token.Wait() && token.Error() != nil {
				log.Fatal(token.Error())
			}
			delete(subscriptions, topic)
			fmt.Printf("Unsubscribed from topic: %s\n", topic)
		case "4":
			// 退出操作
			fmt.Println("Program exited")
			
			topic := "exit" // 退出主题
			message := "offline" // 修改为你想发送的下线消息
			qos := byte(0) // 设置 QoS
			if token := client.Publish(topic, qos, false, message); token.Wait() && token.Error() != nil {
				log.Fatal(token.Error())
			}
			
			client.Disconnect(250)
			return
		default:
			fmt.Println("Invalid option, please try again")
		}

		time.Sleep(100 * time.Millisecond)
	}
}
