variable "project" {
  type = string
}

variable "region" {
  type = string
}

variable "service_name" {
  type = string
}

variable "repository_id" {
  type = string
  # e.g., "backend-repo"
}

variable "image_name" {
  description = "Name of the Docker image (e.g., fastapi)"
  type        = string
}

variable "image_tag" {
  type = string
  # e.g., commit SHA (CI passes this)
}

variable "min_instances" {
  type    = number
  default = 0
}

variable "max_instances" {
  type    = number
  default = 10
}

variable "allow_unauth" {
  type    = bool
  default = true
}

variable "service_account_email" {
  type    = string
  default = null
}

variable "create_repo" {
  type    = bool
  default = true
}

variable "database_url" {
  type        = string
  description = "PostgreSQL database connection string"
}

variable "celery_broker_url" {
  type        = string
  description = "Redis URL for Celery broker"
}

variable "secret_key" {
  type        = string
  description = "Secret key for application"
}

variable "debug" {
  type        = string
  description = "Enable debug mode"
  default     = "false"
}