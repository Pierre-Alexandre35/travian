variable "project" {
  type    = string
  default = "vallorium-core-prod"
}

variable "region" {
  type    = string
  default = "europe-west9"
}

variable "zone" {
  type    = string
  default = "europe-west9-b"
}

variable "api_name" {
  type        = string
  description = "Name for the API Cloud Run service"
  default     = "vallorium-api"
}

variable "api_image" {
  type        = string
  description = "Container image for the API"
  default     = "gcr.io/vallorium-001/backend:latest"
}

variable "github_owner" {
  description = "GitHub organization or user where the repo lives"
  type        = string
}

variable "github_repo" {
  description = "Name of the GitHub repository"
  type        = string
}