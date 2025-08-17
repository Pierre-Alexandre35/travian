resource "google_cloud_run_service" "service" {
  name     = var.name
  location = var.region

  template {
    spec {
      containers {
        image = var.image

        # Tell Cloud Run which port your container listens on:
        ports {
          container_port = 8080
        }

        # (Do NOT set PORT here — Cloud Run will inject it automatically)
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}
