module "travian-docs-static-website" {
  source               = "./modules/travian-docs-static-website"
  domain_name          = var.domain_name
  domain_base_url      = var.domain_base_url
  project_id           = var.project_id
  cloudflare_zone_id   = var.cloudflare_zone_id
  cloudflare_email     = var.cloudflare_email
  env                  = var.env
  cloudflare_api_token = var.cloudflare_api_token
}
