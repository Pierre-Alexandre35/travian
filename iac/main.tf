/* commented out: main reason is that terraform apply works locally but on the CI using service accounts cannot create projects without a parent (=organisation).
However in order to create an organisation, we must sign up for Sign up for Google Workspace. So we keep the GCP "static" atm.

resource "google_folder" "iac_project_folder" {
  display_name = var.folder_name
}

output "folder_id" {
  value = google_folder.iac_project_folder.id
}

# Generate a random suffix for the project ID
resource "random_id" "project_suffix" {
  byte_length = 2  # 2 bytes = 4 hex characters (e.g., "abcd")
}

# Create the Google Cloud project with a generated project ID
resource "google_project" "gcp_prod_project" {
  name            = "travian-prod-3919"
  project_id      = "travian-3919"
  #folder_id      = var.folder_id
  #name            = "travian-prod-${random_id.project_suffix.hex}"
  #project_id      = "travian-${random_id.project_suffix.hex}"
  billing_account = var.billing_account_id   
}
*/

# Call the API module
module "api" {
  source     = "./modules/api"
  project_id = var.existing_project_id
}

# Create a Google Storage Bucket within the existing project
resource "google_storage_bucket" "static_site" {
  name                       = var.bucket_name
  location                   = "EU"
  force_destroy              = true
  uniform_bucket_level_access = true
  project                    = var.existing_project_id

  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }

  cors {
    origin          = ["http://image-store.com"]
    method          = ["GET", "HEAD", "PUT", "POST", "DELETE"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

# Create a Service Account within the existing project
resource "google_service_account" "gcs_deploy_sa" {
  account_id   = var.service_account_id
  display_name = "GCS Deploy Service Account"
  project      = var.existing_project_id
}

# Assign Storage Admin Role to the Service Account
resource "google_project_iam_member" "gcs_deploy_sa_storage_admin" {
  project = var.existing_project_id
  member  = "serviceAccount:${google_service_account.gcs_deploy_sa.email}"
  role    = "roles/storage.admin"
}

# Assign Object Viewer Role to Service Account for public access
resource "google_project_iam_member" "gcs_deploy_sa_object_viewer" {
  project = var.existing_project_id
  member  = "serviceAccount:${google_service_account.gcs_deploy_sa.email}"
  role    = "roles/storage.objectViewer"
}

# Assign Object Creator Role to Service Account for GCS
resource "google_storage_bucket_iam_member" "gcs_deploy_sa_object_creator" {
  bucket = google_storage_bucket.static_site.name
  member = "serviceAccount:${google_service_account.gcs_deploy_sa.email}"
  role   = "roles/storage.objectCreator"
}

# Make the GCS Bucket Public (allow all users to view objects)
resource "google_storage_bucket_iam_member" "gcs_public_access" {
  bucket = google_storage_bucket.static_site.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

# Create a Service Account Key for GitHub Actions Authentication
resource "google_service_account_key" "gcs_deploy_key" {
  service_account_id = google_service_account.gcs_deploy_sa.id
  private_key_type   = "TYPE_GOOGLE_CREDENTIALS_FILE"
}

# Output the Service Account Key for GitHub Actions
output "gcs_deploy_sa_key" {
  value       = google_service_account_key.gcs_deploy_key.private_key
  sensitive   = true
  description = "Service account key for deploying to GCS."
}

# Assign Cloud Build permissions to the Compute Engine default service account
resource "google_project_iam_member" "cloud_build_compute_role" {
  project = var.existing_project_id
  member  = "serviceAccount:${var.existing_project_id}-compute@developer.gserviceaccount.com"
  role    = "roles/cloudbuild.builds.builder"
}

# Create Artifact Registry repository for Docker images
resource "google_artifact_registry_repository" "docker_repo" {
  project       = var.existing_project_id
  location      = var.region
  repository_id = "python-backend-repo"
  description   = "Docker repository for Cloud Run"
  format        = "DOCKER"
}

# Assign Artifact Registry permissions to Cloud Build
resource "google_project_iam_member" "cloud_build_artifact_registry_pusher" {
  project = var.existing_project_id
  member  = "serviceAccount:${var.existing_project_id}@cloudbuild.gserviceaccount.com"
  role    = "roles/artifactregistry.writer"
}

# Deploy Cloud Run service
resource "google_cloud_run_service" "python_backend" {
  depends_on = [module.api]

  name     = "python-backend"
  project  = var.existing_project_id
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/cloudrun/hello"
        resources {
          limits = {
            memory = "512Mi"
            cpu    = "1"
          }
        }
      }
    }
  }

  autogenerate_revision_name = true

  traffic {
    percent         = 100
    latest_revision = true
  }
}

# Allow public access to Cloud Run service
resource "google_cloud_run_service_iam_member" "invoker" {
  project  = var.existing_project_id
  location = var.region
  service  = google_cloud_run_service.python_backend.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# Output Cloud Run URL
output "cloud_run_url" {
  value       = google_cloud_run_service.python_backend.status[0].url
  description = "URL of the deployed Python backend on Cloud Run."
}
