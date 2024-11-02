output "gcp_project_id" {
  value = google_project.gcp_prod_project.project_id
  description = "The dynamically generated project ID"
}