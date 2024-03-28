package main

import (
	"database/sql"
	"log"
	"strconv"
	"strings"

	mqtt "github.com/eclipse/paho.mqtt.golang"
)

// 处理 "lost" 主题的消息
func handleLostTopic(payload string, db *sql.DB) {
	parts := strings.Split(payload, ",")
	if len(parts) == 4 {
		user := parts[0]
		datatype := "lost"
		name := parts[1]
		area := parts[2]
		photo := parts[3]
		dbMutex.Lock() // 加锁
		insertIntoDatabase(
			db,
			user,
			datatype,
			name,
			area,
			photo,
		)
		dbMutex.Unlock() // 解锁
	}
}

// 处理 "find" 主题的消息
func handleFindTopic(payload string, db *sql.DB) {
	id, err := strconv.Atoi(payload)
	if err != nil {
		log.Fatal(err)
	}
	// 更新数据库中的数据
	dbMutex.Lock() // 加锁
	_, err = db.Exec("UPDATE sutff SET type = ? WHERE id = ?", "find", id)
	dbMutex.Unlock() // 解锁
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("Lost item with ID:%d has been marked as found\n", id)
}

// 处理接收到的消息
func handleMessage(client mqtt.Client, msg mqtt.Message, db *sql.DB) {
	log.Printf("Recevie topic[%s]  message: %s\n", msg.Topic(), msg.Payload())
	payload := string(msg.Payload())
	switch msg.Topic() {
	case "lost":
		handleLostTopic(payload, db)
	case "find":
		handleFindTopic(payload, db)
	case "exit":
		log.Println("remot-eclient log out safely.")
	case "error":
		log.Println("remot-eclient lost connection, please try again later.")
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
	log.Printf(
		"Lost item add to database {User: %s, Name: %s, Area: %s}\n",
		user,
		name,
		area,
	)
}
