# Travian Clone - Browser Game

I had this project in my mind since a long time. I've always been a huge fan of the popular browser game called Travian. Travian is a browser based MMOG where you compete with thousands of other players by buuilding up your village, building, ressources, fields, troops in order to have the largest global population accross the server. 

The goal of this project is to have a complete Travian-like game, available online. 


## Technologies  

### Database tools
- Datagrip (used for data modeling, created schemas)
- PostgreSQL

### Backend
- FastAPI
- Custom-made ORM (just because I wanted to try to do it without an ORM)
- Oauth2 (users authentification) 

### Front
- Vue3
- ~~Axios~~ Fetch 

### Infra
Everything will be hosted on the cloud, on Google Cloud Platform:
- ~~Kubernetes~~ Cloud Run  
- Terraform 


poetry install
poetry run python asgi.py

## Project Management 

We are using the free version of Jira to plan and manage our workload. Currently, there is a single Jira board avaibale [here] ([myLib/README.md](https://trello.com/b/v930U8AG/travian
))with 5 different labels:
- backend
- frontend
- database (including data modeling)
- docs
- infra (hosted on Google Cloud Platform)

