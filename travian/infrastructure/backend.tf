terraform {
  backend "gcs" {
    bucket = "infra-terraform-backend"
    prefix = "state"
  }
}