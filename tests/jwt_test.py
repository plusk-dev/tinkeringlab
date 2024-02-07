import requests

response = requests.get("http://127.0.0.1:5000/auth/", headers={
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjIwMjN1bWEwMjAxQGlpdGphbW11LmFjLmluIiwiaWF0IjoxNzA3MzI0NTg2fQ.N9JfWyq-x4yB4k6ek842OMZGa4cx9EJmE5QpGmMNu7E"
})
print(response.json())
