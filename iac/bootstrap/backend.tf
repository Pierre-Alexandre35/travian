terraform {
  backend "gcs" {
    bucket = "tfstate-vallorium-eu"
    prefix = "tfstate/bootstrap"
  }
}