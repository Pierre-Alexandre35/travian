# Vallorium (Inspired by Travian)

**Vallorium** is a persistent, browser-based multiplayer strategy game inspired by [Travian](https://www.travian.com/).

<p align="center">
  <a href="https://vallorium.com/">
    <img src="docs/img/vallorium_gameplay_2.png" alt="Vallorium Gameplay" width="60%" />
  </a>
</p>

### 🌐 [Play Now at vallorium.com »](https://vallorium.com/)

Each player selects a tribe (Romans, Gauls, or Teutons) and starts with a single village.  
A village includes 16 resource fields of four types: **corn, iron, wood**, and **clay**. These fields can be upgraded at a cost to increase their production. The village center allows players to build, upgrade, or demolish structures as their economy and strategy evolve.

A major part of the game is expansion:  
You can either **conquer** other players’ villages or **found** new ones on unclaimed land.  
To conquer, you'll need to raise an army—each tribe has its own unique units and strengths.

---

## 🗄️ Running

Please note this will only run the back-end that is still in development.

⚠️ **Docker** is required to launch the server. Build and start the application using:

```
cd travian
./scripts/build.sh
```

This script will:

- **Create and populate master tables**  
  Static tables that never change (e.g., lookup/reference data).

- **Create transaction tables**  
  Dynamic tables such as users or villages.

- **Insert dummy data**  
  Seed the transaction tables with sample records.

---

Default Credentials

- **Email:** `admin@example.com`
- **Password:** `admin123`

---

API Documentation

You can explore and test the API via Swagger UI:

http://localhost:8000/api/docs#/

---

## 🛠️ Technologies

- **Backend**: FastAPI
- **Frontend**: Vue 3
- **Database**: PostgreSQL (with plans to add **PostGIS** for geospatial support)
- **Infrastructure as Code**: Terraform

I chose **FastAPI** because it's the backend framework I'm most familiar with.  
The project structure is based on the [Buutu FastAPI-React cookiecutter template](https://github.com/Buuntu/fastapi-react).

Since many mechanics are based on distance and location (e.g., villages, resource fields), I plan to integrate **PostGIS** in the future to better support geospatial features.

Though I’m not a frontend expert, I chose **Vue 3** for its approachability—even if its community is smaller compared to React.

---

## ☁️ Hosting

The project is deployed on **Google Cloud Platform**:

- The frontend (Vue 3 app) is hosted via a **GCS bucket** (static hosting)
- The backend (FastAPI API) runs on **Cloud Run** or **Compute Engine**
- The **PostgreSQL** database is also hosted on **Compute Engine**

---

## 🤝 Contributions

I'm currently working on this project solo, and I’d love to collaborate—especially on the frontend.  
The frontend is still in its early stages, so we can decide together whether to stick with **Vue** or switch to **React**.

Feel free to open an issue or submit a pull request if you're interested!

---

backend
GET: query parameters
POST: request body
