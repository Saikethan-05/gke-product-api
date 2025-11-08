# variables.tf

variable "gcp_project_id" {
  description = "The ID of the Google Cloud Project"
  type        = string
  default     = "crack-adapter-476105-d3"
}

variable "gcp_region" {
  description = "The GCP region for the Cloud SQL instance"
  type        = string
  default     = "us-central1"
}

variable "db_name" {
  description = "The name of the PostgreSQL database"
  type        = string
  default     = "products_db"
}

variable "db_user" {
  description = "The username for the PostgreSQL database"
  type        = string
  default     = "postgres"
}

variable "db_password" {
  description = "The password for the PostgreSQL database user"
  type        = string
  default     = "Saikethan@0010723" 
  sensitive   = true 
}

# Add a default zone to ensure initialization works
variable "gcp_zone" {
  description = "The GCP zone for zonal resources (like the Cloud SQL instance)"
  type        = string
  default     = "us-central1-a"
}





# GKE (Kubernetes Cluster) Variables 

variable "gke_machine_type" {
  description = "The machine type for each node in the GKE cluster"
  type        = string
  default     = "e2-medium"
}

variable "gke_node_count" {
  description = "Number of nodes to create in the cluster"
  type        = number
  default     = 2
}
