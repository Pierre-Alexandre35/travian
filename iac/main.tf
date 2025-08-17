terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project
  region  = var.region
}

module "api" {
  source                = "./modules/cloud_run"

  project               = var.project
  region                = var.region
  service_name          = var.service_name
  repository_id         = var.repository_id
  image_name            = var.image_name  
  image_tag             = var.image_tag 
  min_instances         = var.min_instances
  max_instances         = var.max_instances
  allow_unauth          = var.allow_unauth
  create_repo           = var.create_repo
  service_account_email = var.service_account_email
  database_url         = var.database_url
  celery_broker_url    = var.celery_broker_url
  secret_key           = var.secret_key
  debug                = var.debug
}

output "api_endpoint" {
  value = module.api.endpoint
}
