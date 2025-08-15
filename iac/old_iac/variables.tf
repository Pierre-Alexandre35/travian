/*
variable "folder_id" {
  description = "The ID of the organization where the folder will be created."
  type        = string
}

variable "folder_name" {
  description = "The name of the folder for organizing projects."
  type        = string
  default     = "my-projects-folder"
}
*/
variable "existing_project_id" {
  description = "ID of the manually created Google Cloud project"
  type        = string
  default     = "travian-3919"  # Set this to your actual project ID
}
variable "region" {}
variable "bucket_name" {}
variable "service_account_id" {}
variable "billing_account_id" {}