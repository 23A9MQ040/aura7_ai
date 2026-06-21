# 🚀 AURA Deployment Guide

This guide covers deploying the full AURA stack (Frontend, Backend Microservices, Databases) to production.

## 🐳 Docker Deployment

For local development or single-node production:

1. Clone the repository.
2. Create a \`.env\` file in the root:
   ```env
   DB_PASSWORD=your_secure_password
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_key
   ```
3. Run docker-compose:
   ```bash
   cd infrastructure/docker
   docker-compose up -d --build
   ```

## ☸️ Kubernetes Deployment

For high-availability production clusters (GCP/AWS):

1. Configure `kubectl` to point to your cluster.
2. Apply the namespace:
   ```bash
   kubectl apply -f infrastructure/kubernetes/namespace.yml
   ```
3. Apply configurations and secrets (ensure you create a `secrets.yml` with encoded values):
   ```bash
   kubectl apply -f infrastructure/kubernetes/configmaps/
   ```
4. Deploy the databases (StatefulSets recommended for production):
   ```bash
   # Custom DB manifests required for production
   ```
5. Deploy AURA services:
   ```bash
   kubectl apply -f infrastructure/kubernetes/deployments/
   kubectl apply -f infrastructure/kubernetes/services/
   ```
6. Setup Ingress controller to expose `aura-api-gateway` and `aura-web`.

## 🔄 CI/CD
GitHub Actions pipelines are defined in `.github/workflows/`.
- `ci.yml`: Runs tests, linting, and builds jars/npm packages on PRs and main push.
- `deploy.yml` (Planned): Builds Docker images, pushes to container registry, and updates K8s deployments.
