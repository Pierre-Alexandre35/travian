resource "google_project_service" "registry_api" {
  project = var.project
  service = "artifactregistry.googleapis.com"
}

resource "google_artifact_registry_repository" "backend" {
  depends_on   = [google_project_service.registry_api]
  project      = var.project
  location     = var.region
  repository_id = "backend-repo"
  description  = "Docker repo for backend images"
  format       = "DOCKER"
}

data "google_project" "proj" {}

resource "google_artifact_registry_repository_iam_member" "pull" {
  depends_on = [google_artifact_registry_repository.backend]
  project    = var.project
  location   = var.region
  repository = google_artifact_registry_repository.backend.repository_id

  role   = "roles/artifactregistry.reader"
  member = "serviceAccount:${data.google_project.proj.number}-compute@developer.gserviceaccount.com"
}