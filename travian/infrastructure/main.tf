# ------- Providers -------
provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_default_region
}

resource "google_storage_bucket" "static-site" {
  name          = "iesqdsqdee"
  location      = "EU"
  force_destroy = true

}