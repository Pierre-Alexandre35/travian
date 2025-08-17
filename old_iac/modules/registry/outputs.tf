output "registry_url" {
  description = "Artifact Registry host suffix"
  value       = "${var.region}-docker.pkg.dev/${var.project}/backend-repo"
}