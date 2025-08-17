terraform {
  required_version = ">= 1.6"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.40"
    }
  }
}

provider "google" {
  project = var.project
  region  = var.region
}

module "apis" {
  source  = "../modules/apis"
  project = var.project
  apis    = var.apis
}


output "enabled_apis" {
  value = sort(tolist(var.apis))
}

