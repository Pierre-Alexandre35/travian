resource "google_cloud_run_v2_service" "service" {
  name     = var.service_name
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    service_account = var.service_account_email

    scaling {
      min_instance_count = var.min_instances
      max_instance_count = var.max_instances
    }

    containers {
      image = "europe-west9-docker.pkg.dev/${var.project}/${var.repository_id}/${var.image_name}:${var.image_tag}"
      ports {
        container_port = 8080
      }

      env {
        name  = "DATABASE_URL"
        value = var.database_url
      }

      env {
        name  = "CELERY_BROKER_URL"
        value = var.celery_broker_url
      }

      env {
        name  = "SECRET_KEY"
        value = var.secret_key
      }

      env {
        name  = "DEBUG"
        value = var.debug
      }
    }
  }
}
