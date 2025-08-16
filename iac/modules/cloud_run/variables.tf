variable "name" {
  type        = string
  description = "Cloud Run service name"
}

variable "region" {
  type        = string
  description = "GCP region for the service"
}

variable "image" {
  type        = string
  description = "Container image to deploy"
}
