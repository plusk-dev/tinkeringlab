# Portal for Tinkerers' Lab, IIT JAMMU

![Screenshot from 2024-06-03 22-28-03](https://github.com/plusk-dev/tinkeringlab/assets/119429863/fa13c330-bcaf-45ab-ad9d-7aa9843dd747)

The Tinkerer's Lab at IIT JAMMU is a platform for the students of the college to manifest their creative ideas and provides great resources to do so.
Unfortunately ,the process of booking the resources int the lab is currently co-ordinated through google forms and the management of the requests is extremely cumbersome.
Therefore we have made a centralized portal for the easy management of resources and a simple booking process.

## Features
### Admin Side
###### Please note that all the data tables shown below are equipped with pagination and search features
#### Dashboard
![Screenshot from 2024-06-03 22-25-45](https://github.com/plusk-dev/tinkeringlab/assets/119429863/c1783899-637c-438d-8c0a-e33eb31d5e5f)

The dashboard gives a basic overview of the resources available in the tinkerer's lab and provides a quick menu for request approval which is convenient in case the number of requests is low.

![Screenshot from 2024-06-03 22-26-01](https://github.com/plusk-dev/tinkeringlab/assets/119429863/fa92c9ea-dd94-427c-8fad-c4276e3d4747)

##### Component Overview table shown above....the others are implemented the same way.

#### Inventory

![Screenshot from 2024-06-03 23-37-52](https://github.com/plusk-dev/tinkeringlab/assets/119429863/26aa664a-dfaa-46c1-bb37-b69706dc6cc0)


A really simple and intuitive interface for the inventory that allows you to handle the resources in the lab.

#### Better Navigation through requests
###### For sessions:

![Screenshot from 2024-06-03 22-26-32](https://github.com/plusk-dev/tinkeringlab/assets/119429863/360add4e-4b12-43c8-8985-1b7bb45d057a)


###### For Workstations:


![Screenshot from 2024-06-03 22-26-37](https://github.com/plusk-dev/tinkeringlab/assets/119429863/54594ba6-5c37-4ee0-b1bc-f0af97e79e54)


###### For Components:


![Screenshot from 2024-06-03 22-26-48](https://github.com/plusk-dev/tinkeringlab/assets/119429863/d499fda5-5f63-4a76-9001-78723ab382bf)


###### Request Archive (A history of all the requests):


![Screenshot from 2024-06-03 22-27-02](https://github.com/plusk-dev/tinkeringlab/assets/119429863/57fba1e5-1829-440e-9d73-47aadce7bcfa)


#### Landing page customization

![Screenshot from 2024-06-03 22-27-35](https://github.com/plusk-dev/tinkeringlab/assets/119429863/829a6504-fcc6-4c37-824d-e51079e419ed)

This interface lets you control the events displayed on the landing page.

#### Hierarchy management


![Screenshot from 2024-06-03 23-56-43](https://github.com/plusk-dev/tinkeringlab/assets/119429863/767352c1-dee4-431a-8a4b-a2684610a4ee)

This great feature allows you to manage access and roles of different users. 


## Setup instructions
- Run `pip install -r requirements.txt`
this installs all the required  required to run the backend.
- Navigate to `frontend` and run `npm i` to install all the dependencies required to run the frontend.
- To host the backend locally, navigate to `backend` and run `uvicorn main:app --port 5000 --reload`. This hosts the backend locally on port 5000 in debug mode. Go to `https://127.0.0.1:5000/docs` to access the Swagger UI.
- To host the frontend locally, navigate to `frontend` and run `npm start`. This hosts the frontend on port 3000.
- Done
