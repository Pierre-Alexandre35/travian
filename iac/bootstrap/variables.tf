variable "project" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "Region"
  type        = string
  default     = "europe-west9"
}

variable "apis" {
  description = "List of APIs to enable"
  type        = set(string)
  default = [
    "run.googleapis.com",
    "artifactregistry.googleapis.com",
    "secretmanager.googleapis.com",
    "iamcredentials.googleapis.com"
  ]
}
