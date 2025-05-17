# Enable Cloud Run API for deploying services
resource "google_project_service" "cloud_run" {
  project = var.project_id
  service = "run.googleapis.com"
  disable_on_destroy = false
}

# Enable Cloud Build API for building Docker images
resource "google_project_service" "cloud_build" {
  project = var.project_id
  service = "cloudbuild.googleapis.com"
  disable_on_destroy = false
}

# Enable Artifact Registry API for Docker image storage
resource "google_project_service" "artifact_registry" {
  project = var.project_id
  service = "artifactregistry.googleapis.com"
  disable_on_destroy = false
}

# Enable Cloud Storage API for GCS bucket management
resource "google_project_service" "cloud_storage" {
  project = var.project_id
  service = "storage.googleapis.com"
  disable_on_destroy = false
}

# Enable Cloud Billing API
resource "google_project_service" "cloud_billing" {
  project = var.project_id
  service = "cloudbilling.googleapis.com"
  disable_on_destroy = false
}
