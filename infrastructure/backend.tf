terraform {
  backend "gcs" {
    bucket = "tf-config-base"
    prefix = "state"
  }
}
