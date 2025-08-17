variable "project" {
  type = string
}

variable "apis" {
  description = "APIs to enable"
  type        = set(string)
}