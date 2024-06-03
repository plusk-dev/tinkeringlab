# Portal for Tinkerers' Lab, IIT JAMMU

![Screenshot from 2024-06-03 22-28-03](https://github.com/plusk-dev/tinkeringlab/assets/119429863/fa13c330-bcaf-45ab-ad9d-7aa9843dd747)

The Tinkerer's Lab at IIT JAMMU is a platform for the students of the college to manifest their creative ideas and provides great resources to do so.
Unfortunately ,the process of booking the resources int the lab is currently co-ordinated through google forms and the management of the requests is extremely cumbersome.
Therefore we have made a centralized portal for the easy management of resources and a simple booking process.

## Features
#### Admin Side

![Screenshot from 2024-06-03 22-25-45](https://github.com/plusk-dev/tinkeringlab/assets/119429863/c1783899-637c-438d-8c0a-e33eb31d5e5f)

The dashboard gives a basic overview of the resources available in the tinkerer's lab and provides a quick menu for request approval which is convenient in case the number of requests is low.

Component Overview example:

![Screenshot from 2024-06-03 22-26-01](https://github.com/plusk-dev/tinkeringlab/assets/119429863/fa92c9ea-dd94-427c-8fad-c4276e3d4747)



## Setup instructions
- Run `pip install -r requirements.txt`
this installs all the required  required to run the backend.
- Navigate to `frontend` and run `npm i` to install all the dependencies required to run the frontend.
- To host the backend locally, navigate to `backend` and run `uvicorn main:app --port 5000 --reload`. This hosts the backend locally on port 5000 in debug mode. Go to `https://127.0.0.1:5000/docs` to access the Swagger UI.
- To host the frontend locally, navigate to `frontend` and run `npm start`. This hosts the frontend on port 3000.
- Done
