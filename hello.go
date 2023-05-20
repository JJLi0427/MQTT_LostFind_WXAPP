package main

import (
	"DC/usefunc"
	"fmt"
)

func main() {
	print("test\n")
	fmt.Println("HELLO WORLD!")
	sum := usefunc.Add(1, 1)
	fmt.Println(sum)
}
