package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, Go server on Windows!")
}

func imageHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "image endpoint hit")
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	err := r.ParseMultipartForm(10 << 20) // 10 MB max
	if err != nil {
		http.Error(w, "Error parsing form", http.StatusBadRequest)
		return
	}

	file, handler, err := r.FormFile("image")
	if err != nil {
		http.Error(w, "Error retrieving file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	fmt.Fprintf(w, "file recieved")

	dst, err := os.Create("./uploaded_" + handler.Filename)
	if err != nil {
		http.Error(w, "Error saving file", http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	_, err = io.Copy(dst, file)
	if err != nil {
		http.Error(w, "Error writing file", http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "Image uploaded successfully: %s\n", handler.Filename)
}

func main() {
	http.HandleFunc("/", handler)
	http.HandleFunc("/image", imageHandler)
	
	fmt.Println("Server listening on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
