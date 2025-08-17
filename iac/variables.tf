variable "project"       { type = string }
variable "region"        { type = string }
variable "service_name"  { type = string }
variable "repository_id" { type = string }
variable "image_tag"     { type = string }
variable "min_instances" { type = number }
variable "max_instances" { type = number }
variable "allow_unauth"  { type = bool }