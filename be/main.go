package main

import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, Go server on Windows!")
}

func main() {
	http.HandleFunc("/", handler)
	fmt.Println("Server listening on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
