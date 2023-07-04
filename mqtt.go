package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

func main() {
	// Create an MQTT client instance
	opts := MQTT.NewClientOptions().AddBroker("43.142.90.79:1883")
	opts.SetClientID("mqtt-client")
	opts.SetUsername("t1")
	opts.SetPassword("1234556")
	// Set the message received handler function
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
	// Function selection list
	fmt.Println("Please select an option:")
	fmt.Println("1. Add subscription topic")
	fmt.Println("2. Send message")
	fmt.Println("3. Quit")
	reader := bufio.NewReader(os.Stdin)
	for {
		fmt.Print("Enter your option: ")
		option, _ := reader.ReadString('\n')
		option = strings.TrimSuffix(option, "\n")
		switch option {
		case "1":
			// Add subscription topic
			fmt.Print("Enter the topic to subscribe to: ")
			topic, _ := reader.ReadString('\n')
			topic = strings.TrimSuffix(topic, "\n")
			qos := 1
			if token := client.Subscribe(topic, byte(qos), nil); token.Wait() && token.Error() != nil {
				log.Fatal(token.Error())
			}
			fmt.Printf("Subscribed to topic: %s\n", topic)
		case "2":
			// Send message
			fmt.Print("Enter the message topic: ")
			topic, _ := reader.ReadString('\n')
			topic = strings.TrimSuffix(topic, "\n")
			fmt.Print("Enter the message content: ")
			message, _ := reader.ReadString('\n')
			message = strings.TrimSuffix(message, "\n")
			qos := 1
			if token := client.Publish(topic, byte(qos), false, message); token.Wait() && token.Error() != nil {
				log.Fatal(token.Error())
			}
			fmt.Printf("Message sent: %s to topic: %s\n", message, topic)
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
