variable "project_id" {
  description = "The GCP project id"
  type        = string
}
variable "region" {
  default     = "us-central1"
  description = "GCP region"
  type        = string
}
variable "namespace" {
  description = "The namespace for resource naming"
  type        = string
}