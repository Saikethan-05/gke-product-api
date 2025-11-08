terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

# Cloud SQL for PostgreSQL Instance 
resource "google_sql_database_instance" "product_db_instance" {
  name             = "product-db-instance"
  database_version = "POSTGRES_14"
  project          = var.gcp_project_id
  region           = var.gcp_region
   deletion_protection = false

  settings {
    tier        = "db-f1-micro"   # smallest tier for cost optimization
    disk_type   = "PD_SSD"   
    disk_size   = 10              

    backup_configuration {
      enabled            = true
      binary_log_enabled = false
    }

    # Public IP configuration
    ip_configuration {
      ipv4_enabled = true
      ssl_mode     = "ALLOW_UNENCRYPTED_AND_ENCRYPTED"

      authorized_networks {
       
        value = "0.0.0.0/0"
        name  = "all_public"
      }
    }
  }
}

# Database inside Cloud SQL Instance
resource "google_sql_database" "product_db" {
  name     = var.db_name
  instance = google_sql_database_instance.product_db_instance.name
  project  = var.gcp_project_id
}

# Database User
resource "google_sql_user" "product_db_user" {
  name     = var.db_user
  instance = google_sql_database_instance.product_db_instance.name
  project  = var.gcp_project_id
  password = var.db_password
}

# Output (Public IP for your app to connect)
output "cloud_sql_public_ip" {
  description = "The Public IP address of the Cloud SQL instance for connection"
  value       = google_sql_database_instance.product_db_instance.public_ip_address
}
