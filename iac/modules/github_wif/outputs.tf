output "github_provider_resource" {
  description = "Full WIF provider resource name to use in GitHub secret"
  value       = google_iam_workload_identity_pool_provider.github.name
}

output "github_pool_id" {
  value = google_iam_workload_identity_pool.github.name
}