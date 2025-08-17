resource "google_cloudbuild_trigger" "this" {
  project = var.project
  name    = "${var.github_repo}-deploy-trigger"

  github {
    owner = var.github_owner
    name  = var.github_repo
    push {
      branch = var.branch
    }
  }

  filename = var.filename
}