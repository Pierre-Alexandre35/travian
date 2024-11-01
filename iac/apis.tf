# Enable Cloud Run API
resource "google_project_service" "cloud_run_api" {
  project = google_project.gcp_prod_project.project_id
  service = "run.googleapis.com"
}

# Enable Cloud Build API
resource "google_project_service" "cloud_build_api" {
  project = google_project.gcp_prod_project.project_id
  service = "cloudbuild.googleapis.com"
}
