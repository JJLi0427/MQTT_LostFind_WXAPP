package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"time"

	mqtt "github.com/eclipse/paho.mqtt.golang"
	_ "github.com/go-sql-driver/mysql"
)

// Config 结构体用于存储配置信息
type Config struct {
	DatabaseServer struct {
		Host     string `json:"host"`
		Port     int    `json:"port"`
		User     string `json:"user"`
		Password string `json:"password"`
		Database string `json:"database"`
	} `json:"database server"`

	MqttServer struct {
		Host  string   `json:"host"`
		Port  int      `json:"port"`
		Topic []string `json:"topic"`
	} `json:"mqtt server"`
}

// loadConfig 函数用于从配置文件中加载配置
func loadConfig() Config {
	config := Config{}
	file, err := os.ReadFile("./config.json")
	if err != nil {
		log.Fatal(err)
	}
	err = json.Unmarshal(file, &config)
	if err != nil {
		log.Fatal(err)
	}
	return config
}

// 连接到数据库函数
func connectDatabase(config Config) *sql.DB {
	db, err := sql.Open(
		"mysql", fmt.Sprintf(
			"%s:%s@tcp(%s:%d)/%s",
			config.DatabaseServer.User,
			config.DatabaseServer.Password,
			config.DatabaseServer.Host,
			config.DatabaseServer.Port,
			config.DatabaseServer.Database,
		),
	)
	if err != nil {
		log.Fatal(err)
	}
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Successfully connected to the database.")
	return db
}

// 创建MQTT客户端
func createMqttClient(config Config) mqtt.Client {
	opts := mqtt.NewClientOptions()
	opts.AddBroker(fmt.Sprintf("%s:%d", config.MqttServer.Host, config.MqttServer.Port))
	timestamp := time.Now().Unix()
	clientID := fmt.Sprintf("receiveclient_%d", timestamp)
	opts.SetClientID(clientID)
	client := mqtt.NewClient(opts)
	// 建立连接
	token := client.Connect()
	if token.Wait() && token.Error() != nil {
		log.Fatal(token.Error())
	}
	return client
}

// 订阅主题
func subscribeTopics(client mqtt.Client, config Config, db *sql.DB) {
	messageHandler := func(client mqtt.Client, msg mqtt.Message) {
		handleMessage(client, msg, db)
	}
	for _, topic := range config.MqttServer.Topic {
		if token := client.Subscribe(topic, 0, messageHandler); token.Wait() && token.Error() != nil {
			log.Fatal(token.Error())
		}
		fmt.Printf("Subscribe: %s\n", topic)
	}
}

// 处理 "lost" 主题的消息
func handleLostTopic(payload string, db *sql.DB) {
	parts := strings.Split(payload, ",")
	if len(parts) == 4 {
		user := parts[0]
		datatype := "lost"
		name := parts[1]
		area := parts[2]
		photo := parts[3]
		insertIntoDatabase(
			db,
			user,
			datatype,
			name,
			area,
			photo,
		)
	}
}

// 处理 "find" 主题的消息
func handleFindTopic(payload string, db *sql.DB) {
	id, err := strconv.Atoi(payload)
	if err != nil {
		log.Fatal(err)
	}
	// 更新数据库中的数据
	_, err = db.Exec("UPDATE sutff SET type = ? WHERE id = ?", "find", id)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Stuff with id %d has been marked as found\n", id)
}

// 处理接收到的消息
func handleMessage(client mqtt.Client, msg mqtt.Message, db *sql.DB) {
	fmt.Printf("Recevie topic[%s]  message: %s\n", msg.Topic(), msg.Payload())
	payload := string(msg.Payload())
	switch msg.Topic() {
	case "lost":
		handleLostTopic(payload, db)
	case "find":
		handleFindTopic(payload, db)
	case "exit":
		fmt.Printf("    remot-eclient log out safely.\n")
	case "error":
		fmt.Printf("    remot-eclient lost connection, please try again later.\n")
	}
}

// 往数据库里存储失物信息
func insertIntoDatabase(
	db *sql.DB,
	user string,
	datatype string,
	name string,
	area string,
	photo string,
) {
	_, err := db.Exec(
		"INSERT INTO sutff (username, type, name, area, photo) VALUES (?, ?, ?, ?, ?)",
		user,
		datatype,
		name,
		area,
		photo,
	)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf(
		"Lost stuff add to wxapp {User: %s, Name: %s, Area: %s}\n",
		user,
		name,
		area,
	)
}

// 等待中断信号
func waitForInterrupt() {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	<-c
}

func main() {
	config := loadConfig()              // 加载配置
	db := connectDatabase(config)       // 连接到数据库
	client := createMqttClient(config)  // 创建MQTT客户端
	subscribeTopics(client, config, db) // 订阅主题
	waitForInterrupt()                  // 等待中断信号
	client.Disconnect(1000)             // 断开MQTT客户端连接
}
