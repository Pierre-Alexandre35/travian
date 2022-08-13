resource "google_storage_bucket" "website_bucket" {
  project  = var.project_id
  name     = var.domain_name
  location = "US"
  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }
}


resource "cloudflare_record" "site_cname" {
  zone_id = var.cloudflare_zone_id
  name    = var.domain_name
  value   = "c.storage.googleapis.com"
  type    = "CNAME"
  ttl     = 1
  proxied = true
}

resource "google_storage_default_object_access_control" "public_rule" {
  bucket = google_storage_bucket.website_bucket.name
  role   = "READER"
  entity = "allUsers"
}
