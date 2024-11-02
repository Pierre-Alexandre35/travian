# Travian Clone - Browser Game

I had this project in my mind since a long time. I've always been a huge fan of the popular browser game called Travian. Travian is a browser based MMOG where you compete with thousands of other players by buuilding up your village, building, ressources, fields, troops in order to have the largest global population accross the server.

The goal of the project is to have exactly the same logic as the original, but with some UI enhancements, as well as being cross-platform.

The project was on-hold for almost a year due to personnal issues, and I am now going to invest more time in this project and using a different approach. When I started Travian-clone, I was working on every aspects at the same time (front-end using Vue3, working on the data-modeling, user authentification, ...). This is currently a single-person company and it was very difficult to work on every aspect at the same time with a limited amount of time. So I decided to continue this project with a different approch:

- Use Trello
- Front-end at the end. Focus 100% on the back-end and data-modeling.

##

### Option 1: Deploy on GCP (Google Cloud Plarform) using Terraform

Requirements:

- You must already have a GCP Account with an active billing account associated. Note that New customers get $300 in free credit to try Google Cloud products and build a proof of concept.
- A verified domain name. Google Cloud Storage requires ownership verification of domains before creating buckets: https://search.google.com/search-console/welcome

1. Install the Google Cloud CLI, then initialize it by running the following command:

```bash
gcloud auth application-default login
```

2. Authenticate when using Terraform:

```bash
gcloud auth application-default login
```

3. Create a Terraform input variables file by duplicating the example file:

```bash
cp iac/terraform.tfvars.example iac/prod.tfvars
```

4. Fill up the `prod.tfvars` files with your varibles. You must change:

- `bucket_name` must be changed by your domain name.
- `billing_account_id` is the billing account ID that is available here: https://console.cloud.google.com/billing

5. Deploy the infrastructure:

```bash
terraform init
terraform plan -var-file="prod.tfvars"
terraform apply -var-file="prod.tfvars"
```

Backend

- Artifact Registry: This will store your Docker image, making it accessible for Cloud Run deployment.
- Cloud Run: This service will host your Dockerized Python backend.
- Cloud Build Permissions: Enable Cloud Build to deploy images from Artifact Registry to Cloud Run.
