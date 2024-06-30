# Travian Clone - Browser Game

I had this project in my mind since a long time. I've always been a huge fan of the popular browser game called Travian. Travian is a browser based MMOG where you compete with thousands of other players by buuilding up your village, building, ressources, fields, troops in order to have the largest global population accross the server. 

The goal of the project is to have exactly the same logic as the original, but with some UI enhancements, as well as being cross-platform.

The project was on-hold for almost a year due to personnal issues, and I am now going to invest more time in this project and using a different approach. When I started Travian-clone, I was working on every aspects at the same time (front-end using Vue3, working on the data-modeling, user authentification, ...). This is currently a single-person company and it was very difficult to work on every aspect at the same time with a limited amount of time. So I decided to continue this project with a different approch:
- Use Trello
- Front-end at the end. Focus 100% on the back-end and data-modeling. 

## Technologies  
### Project Management
- Trello

### Database tools
- Datagrip (used for data modeling, created schemas)
- PostgreSQL

### Backend
- FastAPI
- Custom-made ORM (just because I wanted to try to do it without an ORM)
- Oauth2 (users authentification)
- Poetry (dependencies management) 

### Front
- Vue3
- Axios

### Infra
Everything will be hosted on the cloud, on Google Cloud Platform:
- ~~Kubernetes~~ Cloud Run  
- Terraform 

poetry install
poetry run python asgi.py

## Project Management 

Trello board is available [here](https://trello.com/b/v930U8AG/travian)
. with 5 different labels:
- backend
- frontend
- database (including data modeling)
- docs
- infra (hosted on Google Cloud Platform)






- MPA
- Axios Create a service to handle API calls. For instance, create a file named api.js:
// api.js

import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api/v1',  // Assuming your API endpoint is at /api/v1
  withCredentials: true  // Important for sending cookies with requests
});

export default apiClient;

- Pinia


poetry run python asgi.py
brew install python-tk@3.12

npm install 
npm run dev

curl -X 'POST' \
  'http://127.0.0.1:8000/api/v1/token' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=&username=pierre12&password=12341234&scope=&client_id=&client_secret='
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJwaWVycmUxMiIsImV4cCI6MTcxOTY1MTg1N30.En0cXZR-Yl1O13gTp5pSWmkUiRkNdjVUmcMXKuH4S9E","token_type":"bearer"}%