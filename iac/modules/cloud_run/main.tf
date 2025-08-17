resource "google_cloud_run_v2_service" "service" {
  name     = var.service_name
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    # Optional; if null, Cloud Run will use the default compute SA
    service_account = var.service_account_email

    scaling {
      min_instance_count = var.min_instances
      max_instance_count = var.max_instances
    }

    containers {
      # Use the repo you pass in (e.g., "api") and the CI-provided tag
      image = "europe-west9-docker.pkg.dev/${var.project}/${var.repository_id}/fastapi:${var.image_tag}"
      ports { container_port = 8080 }
    }
  }
}

# (Optional) Allow unauthenticated access if desired
resource "google_cloud_run_v2_service_iam_member" "invoker_all" {
  count   = var.allow_unauth ? 1 : 0
  project = var.project
  location = var.region
  name     = google_cloud_run_v2_service.service.name

  role   = "roles/run.invoker"
  member = "allUsers"
}

# Artifact Registry repo — create only if asked (e.g., first run)
resource "google_artifact_registry_repository" "repo" {
  count         = var.create_repo ? 1 : 0
  project       = var.project
  location      = var.region
  repository_id = var.repository_id   # <- no hardcode; must match CI (e.g., "api")
  format        = "DOCKER"
  description   = "Docker repo for backend images"
}
