
terraform {
  required_version = ">=1.0, <1.1"
  #https://www.terraform.io/upgrade-guides/0-13.html#explicit-provider-source-locations
  required_providers {
    google      = ">3.90.0"
    google-beta = ">3.90.0"
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 3.0"
    }
  }
}
provider "google" {
  alias = "impersonate"

  scopes = [
    "https://www.googleapis.com/auth/cloud-platform",
    "https://www.googleapis.com/auth/userinfo.email",
  ]
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}
