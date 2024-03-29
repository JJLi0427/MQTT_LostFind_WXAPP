package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"io"
	"log"
	"os"
	"os/signal"
	"sync"

	mqtt "github.com/eclipse/paho.mqtt.golang"
	_ "github.com/go-sql-driver/mysql"
)

var dbMutex sync.Mutex

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
		Topic []string `json:"other_topic"`
	} `json:"mqtt server"`
}

// 从配置文件中加载配置
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

	// 检查配置中的所有字段
	if config.DatabaseServer.Host == "" {
		log.Fatal("Config file is missing 'database server host'.")
	}
	if config.DatabaseServer.Port == 0 {
		log.Fatal("Config file is missing 'database server port'.")
	}
	if config.DatabaseServer.User == "" {
		log.Fatal("Config file is missing 'database server user'.")
	}
	if config.DatabaseServer.Password == "" {
		log.Fatal("Config file is missing 'database server password'.")
	}
	if config.DatabaseServer.Database == "" {
		log.Fatal("Config file is missing 'database server database'.")
	}
	if config.MqttServer.Host == "" {
		log.Fatal("Config file is missing 'mqtt server host'.")
	}
	if config.MqttServer.Port == 0 {
		log.Fatal("Config file is missing 'mqtt server port'.")
	}
	// if len(config.MqttServer.Topic) == 0 {
	// 	log.Fatal("Config file is missing 'mqtt server topic'.")
	// }

	return config
}

// 等待中断信号并关闭数据库和MQTT客户端
func waitForInterrupt(ctx context.Context, db *sql.DB, client mqtt.Client) {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	select {
	case <-c:
		log.Println("Interrupt signal received. Disconnecting...")
	case <-ctx.Done():
		log.Println("Context cancelled. Disconnecting...")
	}
	client.Disconnect(1000) // 断开MQTT客户端连接
	db.Close()              // 关闭数据库连接
	log.Println("Disconnected successfully.")
}

// logWriter 是一个自定义的 io.Writer，用于写入日志
type logWriter struct{}

// Write 实现了 io.Writer 的 Write 方法
func (lw logWriter) Write(p []byte) (n int, err error) {
	// 打开日志文件
	logFile, err := os.OpenFile("client.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		return 0, err
	}
	defer logFile.Close()

	// 写入日志到文件和控制台
	mw := io.MultiWriter(os.Stdout, logFile)
	return mw.Write(p)
}

func main() {
	// 设置日志输出到自定义的 Writer
	log.SetOutput(logWriter{})

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel() // 在main函数结束时取消上下文

	config := loadConfig()              // 加载配置
	db := connectDatabase(config)       // 连接到数据库
	client := createMqttClient(config)  // 创建MQTT客户端
	subscribeTopics(client, config, db) // 订阅主题
	waitForInterrupt(ctx, db, client)   // 等待中断信号
}
