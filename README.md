# Vallorium (Inspired by Travian)

**Vallorium** is a persistent, browser-based multiplayer strategy game inspired by [Travian](https://www.travian.com/).

<p align="center">
  <img src="docs/img/vallorium_gameplay_2.png" alt="Vallorium Gameplay" width="60%" />
</p>

Each user has to select a tribe (roman, gauls or tetons) and start with one village. A village has 16 crops of 4 kinds (corn, iorn, wood and cray), each farm can be upgrade for a cost and will produce higher once upgraded. A village also has a center where the user can build, upgrade or even destroy buildings. One major aspect of this game is to have new village, you can either attack and conquer other villages players or found a village on a empty crop. For the first option, it will be adviced to raised an army and each tribe has different kind of troops.

## Technologies

- **Backend**: FastAPI
- **Frontend**: Vue 3
- **Database**: PostgreSQL (may add the **PostGIS** later on)
- **Infrastructure as Code**: Terraform

I choose fastAPI because that's the backend framework that I am the most familiar with, my backend structure is based on the [Buutu FastAPI-React cookiecutter template](https://github.com/Buuntu/fastapi-react)) . Since many of the game mechanics are map and distance-based (e.g., villages and fields), I may add **PostGIS** in a future version to better support geospatial queries.

Although I don't have frontend expertise, I chose **Vue 3** for its approachability, even if the community is smaller compared to React.

## Hosting

The project is hosted on **Google Cloud Platform**:

- The frontend (Vue 3 app) is served from a **GCS bucket** (static hosting).
- The backend (FastAPI API) runs on **Cloud Run** or **Compute Engine**.
- The PostgreSQL database is also hosted on **Compute Engine**.
