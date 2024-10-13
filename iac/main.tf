# Google Provider Configuration
provider "google" {
  project = "voltaic-sensor-438416-h9"  # Your existing project
  region  = "europe-west9"  # Your existing region
}

# Google Storage Bucket Configuration for Static Website
resource "google_storage_bucket" "static_site" {
  name          = "peillac.xyz"  # Your bucket name
  location      = "EU"
  force_destroy = true

  uniform_bucket_level_access = true  # Bucket-level access control

  website {
    main_page_suffix = "index.html"  # Website settings
    not_found_page   = "404.html"
  }

  cors {  # CORS configuration
    origin          = ["http://image-store.com"]
    method          = ["GET", "HEAD", "PUT", "POST", "DELETE"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

# Service Account for GCS Deployment
resource "google_service_account" "gcs_deploy_sa" {
  account_id   = "gcs-deploy-sa"
  display_name = "GCS Deploy Service Account"
}

# Assign Storage Admin Role to Service Account
resource "google_project_iam_member" "gcs_deploy_sa_storage_admin" {
  project = "voltaic-sensor-438416-h9"  # Use the same project
  member  = "serviceAccount:${google_service_account.gcs_deploy_sa.email}"
  role    = "roles/storage.admin"
}

# Assign Object Viewer Role to Service Account (for public access)
resource "google_project_iam_member" "gcs_deploy_sa_object_viewer" {
  project = "voltaic-sensor-438416-h9"
  member  = "serviceAccount:${google_service_account.gcs_deploy_sa.email}"
  role    = "roles/storage.objectViewer"
}

# Assign Object Creator Role to Service Account for GCS (new role added)
resource "google_storage_bucket_iam_member" "gcs_deploy_sa_object_creator" {
  bucket = google_storage_bucket.static_site.name  # Reference your bucket
  member = "serviceAccount:${google_service_account.gcs_deploy_sa.email}"
  role   = "roles/storage.objectCreator"
}

# Make the GCS Bucket Public (allow all users to view objects)
resource "google_storage_bucket_iam_member" "gcs_public_access" {
  bucket = google_storage_bucket.static_site.name  # Reference your bucket
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
