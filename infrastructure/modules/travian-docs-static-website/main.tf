
resource "google_storage_bucket_access_control" "public_rule" {
  bucket = google_storage_bucket.bucket.name
  role   = "READER"
  entity = "allUsers"
}



resource "google_storage_bucket" "bucket" {
  project  = var.project_id
  name     = var.domain_name
  location = "US"
  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }
  cors {
    origin          = ["http://image-store.com"]
    method          = ["GET", "HEAD", "PUT", "POST", "DELETE"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}


resource "cloudflare_record" "site_cname" {
  zone_id = var.cloudflare_zone_id
  name    = "gd"
  value   = "c.storage.googleapis.com"
  type    = "CNAME"
  ttl     = 1
  proxied = true
}
