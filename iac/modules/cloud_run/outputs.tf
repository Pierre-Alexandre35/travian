output "endpoint" {
  description = "Cloud Run service URL"
  value       = google_cloud_run_service.service.status[0].url
}
