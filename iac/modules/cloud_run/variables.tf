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
