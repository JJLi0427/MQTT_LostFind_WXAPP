package main

import (
	"database/sql"
	"log"
	"strconv"
	"strings"
)

// 连接到数据库
func connectDatabase(config Config) *sql.DB {
	db, err := sql.Open(
		"mysql",
		strings.Join([]string{
			config.DatabaseServer.User,
			":",
			config.DatabaseServer.Password,
			"@tcp(",
			config.DatabaseServer.Host,
			":",
			strconv.Itoa(config.DatabaseServer.Port),
			")/",
			config.DatabaseServer.Database,
		}, ""),
	)
	if err != nil {
		log.Fatal(err)
	}
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}
	log.Printf(
		"Connected to the database at: %s:%d\n",
		config.DatabaseServer.Host,
		config.DatabaseServer.Port,
	)
	log.Printf(
		"Successfully connected to database: %s\n",
		config.DatabaseServer.Database,
	)
	return db
}
