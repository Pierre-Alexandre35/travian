variable "domain_name" {
  type = string
}


variable "project_id" {
  type = string
}

variable "cloudflare_email" {
  type        = string
  description = "clouflare email address"
}

variable "cloudflare_zone_id" {
  type        = string
  description = "cloudflare zone ID"
  sensitive   = true
}

variable "env" {
  type = string
}

variable "cloudflare_api_token" {
  type        = string
  description = "cloudflare api token"
  sensitive   = true
}
