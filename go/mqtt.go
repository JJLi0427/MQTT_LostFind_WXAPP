package main

import (
	"fmt"
	"log"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

func main() {
	// Create an MQTT client instance
	opts := MQTT.NewClientOptions().AddBroker("13.208.206.214:1883")
	opts.SetClientID("Goclient")
	//opts.SetUsername("t1")
	//opts.SetPassword("1234556")
	// Set the message handler for receiving messages
	opts.SetDefaultPublishHandler(func(client MQTT.Client, msg MQTT.Message) {
		go func() {
			fmt.Printf("\nReceived message: %s from topic: %s\n", msg.Payload(), msg.Topic())
		}()
	})
	// Create an MQTT client
	client := MQTT.NewClient(opts)
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		log.Fatal(token.Error())
	}
	// Function selection menu
	fmt.Println("Please select an option:")
	fmt.Println("1. Add subscription topic")
	fmt.Println("2. Send message")
	fmt.Println("3. Exit")
	for {
		var option string
		fmt.Print("Enter your option: ")
		fmt.Scanln(&option)
		switch option {
		case "1":
			// Add subscription topic
			var topic string
			fmt.Print("Enter the topic you want to subscribe to: ")
			fmt.Scanln(&topic)
			qos := 1
			if token := client.Subscribe(topic, byte(qos), nil); token.Wait() && token.Error() != nil {
				log.Fatal(token.Error())
			}
			fmt.Printf("Subscribed to topic: %s\n", topic)
		case "2":
			// Send message
			var topic, message string
			fmt.Print("Enter the message topic: ")
			fmt.Scanln(&topic)
			fmt.Print("Enter the message content: ")
			fmt.Scanln(&message)
			qos := 1
			if token := client.Publish(topic, byte(qos), false, message); token.Wait() && token.Error() != nil {
				log.Fatal(token.Error())
			}
			fmt.Printf("\nSent message: {\n\"msg\": %s \n} to topic: %s\n", message, topic)
		case "3":
			// Exit the program
			fmt.Println("Program exited")
			client.Disconnect(250)
			return
		default:
			fmt.Println("Invalid option, please try again")
		}
	}
}
