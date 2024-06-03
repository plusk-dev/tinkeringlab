## Setup instructions
- Run `pip install -r requirements.txt`
this installs all the required  required to run the backend.
- Navigate to `frontend` and run `npm i` to install all the dependencies required to run the frontend.
- To host the backend locally, navigate to `backend` and run `uvicorn main:app --port 5000 --reload`. This hosts the backend locally on port 5000 in debug mode. Go to `https://127.0.0.1:5000/docs` to access the Swagger UI.
- To host the frontend locally, navigate to `frontend` and run `npm start`. This hosts the frontend on port 3000.
- Done