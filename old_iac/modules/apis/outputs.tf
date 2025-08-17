output "enabled_services" {
  description = "APIs enabled in the project"
  value       = keys(google_project_service.enabled_apis)
}