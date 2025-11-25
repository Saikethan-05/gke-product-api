# GKE Product API – Complete Project Documentation

##  Overview
This project demonstrates how to build, deploy, and scale a **containerized REST API** on **Google Kubernetes Engine (GKE)** with full **CI/CD automation**, **Cloud SQL**, **Monitoring**, **Logging**, and **Security best practices**.

The API manages a `Product` table in PostgreSQL with full CRUD operations.

---

##  Architecture Summary
- **Node.js Express API**
- **PostgreSQL on Google Cloud SQL**
- **Docker containerization**
- **Kubernetes Deployment + Service (LoadBalancer)**
- **Terraform for GKE + Cloud SQL Infra**
- **CI/CD using Google Cloud Build + GitHub**
- **Monitoring & Logging using Cloud Monitoring**
- **API Key Authentication Middleware**

---

##  Project Structure
```
controllers/
  productController.js       -> Handles business logic for CRUD operations

kubernetes/
  deployment.yaml            -> Defines Pods, replicas & container configs
  service.yaml               -> LoadBalancer that exposes API to the Internet
  hpa.yaml                   -> Horizontal Pod Autoscaler (auto-scaling)
  configmap.yaml             -> Non-sensitive config variables
  secret.yaml                -> Encrypted database credentials (base64)
  
middleware/
  auth.js                    -> API Key authentication middleware

models/
  productModel.js            -> Product table schema & DB queries

routes/
  productRoutes.js           -> API endpoints (GET/POST/PUT/DELETE)

infra/
  gke-cluster.tf             -> Terraform for GKE Cluster
  variables.tf               -> Terraform variable definitions
  terraform.tfstate          -> Terraform state file
  terraform.tfstate.backup   -> Backup state file
  .terraform.lock.hcl        -> Provider lock file

Other root files:
  server.js                  -> Express app entry point
  db.js                      -> Cloud SQL PostgreSQL connection
  Dockerfile                 -> Builds the container image
  cloudbuild.yaml            -> CI/CD pipeline config (Cloud Build)
  cloud-sql-proxy.exe        -> Local debugging
  package.json               -> Node dependencies
  package-lock.json          -> Package versions
  .gitignore                 -> Ignored files

```

---

##  Phase 1: Application Development
###  Node.js API
- Implemented CRUD endpoints:
  - `GET /products`
  - `GET /products/:id`
  - `POST /products`
  - `PUT /products/:id`
  - `DELETE /products/:id`

###  PostgreSQL Schema
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  price NUMERIC,
  quantity INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

###  Dockerized Application
Dockerfile optimized for production.

---

##  Phase 2: Infrastructure as Code + Cloud SQL + GKE
###  Terraform automates:
- Cloud SQL PostgreSQL instance
- SQL user + database creation
- GKE cluster + node pool
- Autoscaling enabled

###  Kubernetes Manifests
- Deployment (2 pods, rolling updates, health checks)
- Service (LoadBalancer)
- Secret for DB credentials
- Probes for reliability

---

##  Phase 3: CI/CD Pipeline
###  Google Cloud Build Steps
- Build Docker image
- Push to GCR
- Update GKE deployment automatically
- Rolling update performed with **zero downtime**

Trigger configured to run on every push to `main`.

---

##  Phase 4: Monitoring, Logging & Security
###  Logging (Cloud Logging)
- Structured JSON logs for API events

###  Monitoring (Cloud Monitoring)
- CPU metrics
- Memory metrics

###  Security
- API Key authentication middleware

---

##  Deployment Instructions
1. **Create infrastructure with Terraform**
```
cd infra
terraform init
terraform apply
```

2. **Deploy Kubernetes resources**
```
kubectl apply -f k8s/
```

3. **Get Load Balancer IP**
```
kubectl get svc product-api-service
```

4. **Access API**
```
GET http://<EXTERNAL-IP>/products
```

5. **Push code → CI/CD deploys automatically**

---

##  Testing API Health
```
GET http://<EXTERNAL-IP>/health
```

Response:
```json
{
  "status": "ok",
  "message": "App Is Healthy - Version 3"
}
```

---

##  Key Features Completed
- Full CRUD REST API
- GKE cluster with autoscaling
- Cloud SQL database integration
- Infrastructure as Code (Terraform)
- End-to-end CI/CD pipeline
- Load Balancer public exposure
- API authentication
- Logging & Monitoring

---

##  Author
**SaiKethan Nanupatruni**

---
