output "cloud_run" {
  value = google_project_service.cloud_run
  description = "Output for the Cloud Run service"
}

output "cloud_build" {
  value = google_project_service.cloud_build
  description = "Output for the Cloud Build service"
}

output "artifact_registry" {
  value = google_project_service.artifact_registry
  description = "Output for the Artifact Registry service"
}

output "cloud_storage" {
  value = google_project_service.cloud_storage
  description = "Output for the Cloud Storage service"
}
