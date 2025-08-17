variable "project" {
  type        = string
  description = "GCP project where to create the trigger"
}

variable "github_owner" {
  type        = string
  description = "GitHub org/user"
}

variable "github_repo" {
  type        = string
  description = "GitHub repository name"
}

variable "branch" {
  type        = string
  description = "Branch to watch"
  default     = "main"
}

variable "filename" {
  type        = string
  description = "Path to cloudbuild.yaml in the repo"
  default     = "cloudbuild.yaml"
}