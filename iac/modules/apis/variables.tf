variable "project" {
  type        = string
  description = "GCP project to enable APIs in"
}

variable "apis" {
  type        = list(string)
  description = "List of API service names to enable"
}
