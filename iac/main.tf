/*
 service account for CI CD
 */

resource "google_service_account" "sa-name" {
  account_id = "github-ci-cd-service-account"
  display_name = "github-ci-cd-service-account"
}

resource "google_project_iam_member" "member-role" {
  for_each = toset([
    "roles/iam.serviceAccountTokenCreator",
    "roles/storage.objectAdmin",
  ])
  role = each.key
  member = "serviceAccount:${google_service_account.sa-name.email}"
  project = var.project_id
}

/*
 front end 
 */
resource "google_storage_bucket" "public_domain_name" {
  name          = "travian.lol"
  location      = var.region
  project       = var.project_id
  storage_class = "STANDARD"
  uniform_bucket_level_access = true
  versioning {
    enabled = false
  }
  website {
    main_page_suffix = "index.html"
    not_found_page   = "error/404.html"
  }
}

resource "google_storage_bucket_iam_member" "member" {
  bucket = google_storage_bucket.public_domain_name.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

/*
 back end 
 */
 resource "google_cloud_run_service" "run_service" {
  name = "app"
  location = "us-central1"

  template {
    spec {
      containers {
        image = "gcr.io/google-samples/hello-app:1.0"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  # Waits for the Cloud Run API to be enabled
  depends_on = [google_project_service.enabled_services]
}