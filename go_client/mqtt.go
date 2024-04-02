package main

import (
	"database/sql"
	"strconv"
	"strings"
	"time"

	"log"

	mqtt "github.com/eclipse/paho.mqtt.golang"
)

// 项目必须的主题
var extraTopics = []string{
	"lost", 
	"delete",
	"find", 
	"signup", 
	"exit", 
	"error",
}


// 创建MQTT客户端
func createMqttClient(config Config) mqtt.Client {
	opts := mqtt.NewClientOptions()
	broker := strings.Join(
		[]string{
			config.MqttServer.Host,
			strconv.Itoa(config.MqttServer.Port),
		},
		":",
	)
	opts.AddBroker(broker)
	timestamp := time.Now().Unix()
	clientID := strings.Join(
		[]string{
			"receiveclient_",
			strconv.FormatInt(timestamp, 10),
		},
		"",
	)
	opts.SetClientID(clientID)
	client := mqtt.NewClient(opts)
	log.Printf("Created MQTT client with ID: %s\n", clientID)
	// 建立连接
	token := client.Connect()
	if token.Wait() && token.Error() != nil {
		log.Fatal(token.Error())
	}
	// 打印连接到服务器的 IP 和端口
	log.Printf("Connected to MQTT broker at: %s\n", broker)
	return client
}

// 订阅主题
func subscribeTopics(client mqtt.Client, config Config, db *sql.DB) {
	messageHandler := func(client mqtt.Client, msg mqtt.Message) {
		// 启动一个新的goroutine来处理这个消息
		go handleMessage(client, msg, db)
	}
	// 添加新的主题
    for _, extraTopic := range extraTopics {
        topics = append(topics, extraTopic)
    }
	for _, topic := range topics {
		token := client.Subscribe(topic, 0, messageHandler)
		if token.Wait() && token.Error() != nil {
			log.Fatal(token.Error())
		}
		log.Printf("Subscribe: %s\n", topic)
	}
}
