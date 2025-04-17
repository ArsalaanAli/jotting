package main

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

const llmModel = "qwen/qwen2.5-vl-72b-instruct:free"

var apiKey string

func init() {
	// Automatically called before main()
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	apiKey = os.Getenv("OPENROUTER_API_KEY")
	if apiKey == "" {
		log.Fatal("API key not found in environment")
	}
}

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, Go server on Windows!")
}

func sendImage(w http.ResponseWriter, r *http.Request){
	imgBytes, err := os.ReadFile("uploaded_canvas.png")
    if err != nil {
        panic(err)
    }

    // Encode to base64
    encoded := base64.StdEncoding.EncodeToString(imgBytes)
    dataURI := fmt.Sprintf("data:image/jpeg;base64,%s", encoded)

    // Build request payload
    payload := map[string]interface{}{
        "model": "qwen/qwen2.5-vl-72b-instruct:free",
        "messages": []map[string]interface{}{
            {
                "role": "user",
                "content": []map[string]interface{}{
                    {
                        "type": "text",
                        "text": "What is in this image?",
                    },
                    {
                        "type": "image_url",
                        "image_url": map[string]interface{}{
                            "url": dataURI,
                        },
                    },
                },
            },
        },
    }

    // Convert to JSON
    jsonData, err := json.Marshal(payload)
    if err != nil {
        panic(err)
    }

    // Make HTTP request
    req, err := http.NewRequest("POST", "https://openrouter.ai/api/v1/chat/completions", bytes.NewBuffer(jsonData))
    if err != nil {
        panic(err)
    }

    req.Header.Set("Authorization", "Bearer " + apiKey)
    req.Header.Set("Content-Type", "application/json")

    // Send request
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    // Read and print response
    body, _ := ioutil.ReadAll(resp.Body)
    fmt.Println(string(body))
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
    http.HandleFunc("/sendImage", sendImage)
	
	fmt.Println("Server listening on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
