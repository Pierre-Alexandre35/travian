module "project_apis" {
  source  = "./modules/apis"
  project = var.project
  apis    = [
    "run.googleapis.com",
    "compute.googleapis.com",
    "artifactregistry.googleapis.com",
    "secretmanager.googleapis.com",
    "cloudbuild.googleapis.com"   # Enable Cloud Build API for triggers
  ]
}

# 2) Provision Artifact Registry and IAM for pulling images
module "registry" {
  source  = "./modules/registry"
  project = var.project
  region  = var.region
}

# 3) Deploy Cloud Run service for the API
module "cloud_run" {
  source = "./modules/cloud_run"

  name   = var.api_name
  region = var.region
  image  = "europe-west9-docker.pkg.dev/${var.project}/backend-repo/backend:latest"

  depends_on = [
    module.project_apis,
    module.registry,
  ]
}

module "ci_trigger" {
  source       = "./modules/ci_trigger"
  project      = var.project
  github_owner = var.github_owner
  github_repo  = var.github_repo
  branch       = "main"            # or override
  filename     = "cloudbuild.yaml" # since you moved it to root
  depends_on = [
    module.project_apis,
    module.registry,
  ]
}

// --------------------------------------------------
// Read existing static DB IP and expose as output
// --------------------------------------------------
data "google_compute_address" "db" {
  name    = "db-static-ip"
  region  = var.region
  project = var.project
}

output "db_ip" {
  description = "Static external IP for the Postgres VM"
  value       = data.google_compute_address.db.address
}
