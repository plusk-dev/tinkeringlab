import requests

response = requests.get("http://127.0.0.1:5000/bookings/all", headers={
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjIwMjN1bWEwMjAxQGlpdGphbW11LmFjLmluIiwiaWF0IjoxNzA5OTgyMTgzfQ.28pQQjAJoIRzB3ZI86jHuiIw1zJdJo7UxMEgJeNwFXg"
})
print(response.json())
