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
  # e.g., "api"
}

variable "image_tag" {
  type = string
  # e.g., commit SHA
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
  # NEW
}

variable "image_name" {
  description = "Docker image name in the Artifact Registry repo"
  type        = string
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
  description = "Secret key for FastAPI app"
}

variable "debug" {
  type        = string
  default     = "false"
  description = "Set to true to enable debug mode"
}
