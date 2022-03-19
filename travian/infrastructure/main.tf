# ------- Providers -------
provider "google" {
  profile = var.gcp_project
  region  = var.gcp_default_region
}