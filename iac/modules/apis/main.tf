resource "google_project_service" "enabled_apis" {
  for_each = toset(var.apis)
  project  = var.project
  service  = each.key

  disable_on_destroy = false
}