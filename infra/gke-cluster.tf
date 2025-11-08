# GKE (Google Kubernetes Engine) Cluster 
resource "google_container_cluster" "product_gke_cluster" {
  name               = "product-gke-cluster"
  project            = var.gcp_project_id
  location           = var.gcp_zone
  remove_default_node_pool = true  
  initial_node_count       = 1

  network    = "default"
  subnetwork = "default"

  release_channel {
    channel = "REGULAR"
  }

  ip_allocation_policy {}
}

# Node Pool with autoscaling
resource "google_container_node_pool" "primary_nodes" {
  name     = "primary-node-pool"
  cluster  = google_container_cluster.product_gke_cluster.name
  project  = var.gcp_project_id
  location = var.gcp_zone

  # initial node count
  node_count = 2

  # Enable autoscaling
  autoscaling {
    min_node_count = 2
    max_node_count = 5
  }

  node_config {
    machine_type = var.gke_machine_type # e2-medium
    disk_size_gb = 50   
    disk_type    = "pd-balanced" 
    oauth_scopes = ["https://www.googleapis.com/auth/cloud-platform"]

    labels = {
      env = "dev"
    }
  }
}

# Outputs 
output "gke_cluster_name" {
  value = google_container_cluster.product_gke_cluster.name
}

output "gke_cluster_endpoint" {
  value = google_container_cluster.product_gke_cluster.endpoint
}
