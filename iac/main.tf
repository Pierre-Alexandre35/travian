resource "google_storage_bucket" "a_bucket" {
  name          = "travian.lol"
  location      = "EUROPE-WEST9"
  project       = var.project_id
  storage_class = "STANDARD"
  uniform_bucket_level_access = true
  versioning {
    enabled = false
  }
}

resource "google_storage_bucket_iam_member" "member" {
  bucket = google_storage_bucket.a_bucket.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}