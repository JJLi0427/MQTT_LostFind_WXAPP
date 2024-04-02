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
		// 往数据库中存储失物信息
		_, err := db.Exec(
			"INSERT INTO sutff (username, type, name, area, photo) VALUES (?, ?, ?, ?, ?)",
			user,
			datatype,
			name,
			area,
			photo,
		)
		dbMutex.Unlock() // 解锁
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
}

// 处理 "delete" 主题的消息
func handleDeleteTopic(payload string, db *sql.DB) {
    id, err := strconv.Atoi(payload)
    if err != nil {
        log.Fatal(err)
    }

    // 删除数据库中指定物品
    dbMutex.Lock()
    _, err = db.Exec(
        "DELETE FROM sutff WHERE id = ?", 
        id,
    )
    dbMutex.Unlock()
    if err != nil {
        log.Fatal(err)
    }
    log.Printf("Lost item with ID:%d has been deleted\n", id)
}

// 处理 "find" 主题的消息
func handleFindTopic(payload string, db *sql.DB) {
	id, err := strconv.Atoi(payload)
	if err != nil {
		log.Fatal(err)
	}

	// 更新数据库中的数据
	dbMutex.Lock()
	_, err = db.Exec(
		"UPDATE sutff SET type = ? WHERE id = ?", 
		"find", 
		id,
	)
	dbMutex.Unlock()
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("Lost item with ID:%d has been marked as found\n", id)
}

// 处理 "signup" 主题的消息
func handleSignupTopic(payload string, db *sql.DB) {
	parts := strings.Split(payload, ",")
	if len(parts) == 4 {
		userid := parts[0]
		name := parts[1]
		phonenumber := parts[2]
		dbMutex.Lock()

		// 往数据库中存储新用户信息
		_, err := db.Exec(
			"INSERT INTO user (userid, name, phonenumber) VALUES (?, ?, ?)",
			userid,
			name,
			phonenumber,
		)
		dbMutex.Unlock()
		if err != nil {
			log.Fatal(err)
		}
		log.Printf(
			"New user add to database {User: %s, Name: %s, Phone: %s}\n",
			userid,
			name,
			phonenumber,
		)
	}
}


// 处理接收到的消息
func handleMessage(client mqtt.Client, msg mqtt.Message, db *sql.DB) {
	log.Printf("Recevie topic[%s]  message: %s\n", msg.Topic(), msg.Payload())
	payload := string(msg.Payload())
	
	// 根据主题处理消息
	switch msg.Topic() {
		case "lost":
			handleLostTopic(payload, db)
		case "delete":
			handleDeleteTopic(payload, db)
		case "find":
			handleFindTopic(payload, db)
		case "signup":
			handleSignupTopic(payload, db)
		case "exit":
			log.Println("remot-eclient log out safely.")
		case "error":
			log.Println("remot-eclient lost connection, please try again later.")
	}
	// 可以基于此位置进一步开发，处理更多的主题
}

