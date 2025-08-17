resource "google_cloud_run_v2_service" "service" {
  name     = var.service_name
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    service_account = var.service_account_email # optional, can omit

    scaling {
      min_instance_count = var.min_instances
      max_instance_count = var.max_instances
    }


    containers {
      image = "europe-west9-docker.pkg.dev/${var.project}/${var.repository_id}/fastapi:${var.image_tag}"

      ports { container_port = 8080 }
    }
  }
}


resource "google_artifact_registry_repository" "backend" {
  project        = var.project
  location       = var.region
  repository_id  = "backend-repo"
  format         = "DOCKER"
  description    = "Docker repo for backend images"
  # depends_on    = [google_project_service.artifactregistry]  # optional if ordering is guaranteed elsewhere
}