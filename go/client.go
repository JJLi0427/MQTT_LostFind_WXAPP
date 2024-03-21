package main

import (
	"database/sql"
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

func main() {
	// 数据库连接信息
	dbUser := "wxapp"
	dbPass := "233666"
	dbHost := "121.43.238.224:3306"
	dbName := "wxapp"

	// 构建连接："用户名:密码@tcp(地址:端口)/数据库名"
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s)/%s", dbUser, dbPass, dbHost, dbName))

	if err != nil {
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("Successfully connected to the database.")

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
		payload := string(msg.Payload())
		if msg.Topic() == "lost" {
			parts := strings.Split(payload, ",")
			if len(parts) == 4 {
				user := parts[0]
				datatype := "lost"
				name := parts[1]
				area := parts[2]
				photo := parts[3]

				// 插入数据到数据库
				_, err := db.Exec("INSERT INTO sutff (username, type, name, area, photo) VALUES (?, ?, ?, ?, ?)", user, datatype, name, area, photo)
				if err != nil {
					log.Fatal(err)
				}
				fmt.Printf("Lost stuff add to wxapp {User: %s, Name: %s, Area: %s}\n", user, name, area)
			}
		}
		if msg.Topic() == "find" {
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
		if msg.Topic() == "exit" {
			fmt.Printf("    remot-eclient log out safely.\n")
		}
		if msg.Topic() == "error" {
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
