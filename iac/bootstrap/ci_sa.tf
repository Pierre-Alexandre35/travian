resource "google_service_account" "ci_deployer" {
  account_id   = "ci-deployer"
  display_name = "GitHub CI Deployer"
  project      = var.project
}

resource "google_service_account_iam_member" "ci_wif_impersonation" {
  service_account_id = google_service_account.ci_deployer.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/${module.github_wif.github_pool_id}/*"
}

resource "google_project_iam_member" "ci_can_deploy_run" {
  project = var.project
  role    = "roles/run.admin"
  member  = "serviceAccount:${google_service_account.ci_deployer.email}"
}

resource "google_project_iam_member" "ci_can_push_to_ar" {
  project = var.project
  role    = "roles/artifactregistry.writer"
  member  = "serviceAccount:${google_service_account.ci_deployer.email}"
}

resource "google_project_iam_member" "ci_can_use_sa" {
  project = var.project
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${google_service_account.ci_deployer.email}"
}
